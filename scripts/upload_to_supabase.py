"""
GudTree Supabase Sync Utility
Allows syncing local articles in src/data/articles.json to your GudTree Supabase DB.
"""
import os
import json
import urllib.request
import ssl
import sys

ARTICLES_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'data', 'articles.json')
CATEGORIES_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'data', 'categories.json')
ENV_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env.local')

def get_env_vars():
    env = {}
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    env[k.strip()] = v.strip().strip('"').strip("'")
    return env

def map_article_to_row(art):
    slug = art.get('slug') or art.get('id')
    return {
        "id": slug,
        "slug": slug,
        "title": art.get('title') or 'Untitled Article',
        "category": art.get('category') or 'General',
        "subcategory": art.get('subcategory'),
        "region": art.get('region') or 'Global',
        "content_type": art.get('contentType') or 'News',
        "tag": art.get('tag') or 'General',
        "date_text": art.get('date') or 'Recent',
        "author_name": art.get('author') or 'Admin',
        "author_role": art.get('authorRole') or 'Editor',
        "author_avatar": art.get('authorAvatar'),
        "image_url": art.get('image'),
        "read_time": art.get('readTime') or '4 min read',
        "excerpt": art.get('excerpt') or '',
        "content": art.get('content') or '',
        "placement": art.get('placement') or 'category',
        "homepage_priority": art.get('homepagePriority') or 'Normal',
        "is_breaking": bool(art.get('isBreaking', False)),
        "featured": bool(art.get('featured', False)),
        "trending": bool(art.get('trending', False)),
        "status": art.get('status') or 'Published',
        "publish_date": art.get('publishDate'),
        "publish_time": art.get('publishTime') or '09:00',
        "publish_timezone": art.get('publishTimezone') or 'GST',
        "meta_title": art.get('metaTitle'),
        "meta_description": art.get('metaDescription'),
        "keywords": art.get('keywords'),
        "primary_keyword": art.get('primaryKeyword'),
        "views_count": int(art.get('viewsCount') or 0),
        "likes_count": int(art.get('likesCount') or 0),
        "paragraphs": art.get('paragraphs') or [],
        "sections": art.get('sections') or []
    }

def upload_to_supabase():
    env = get_env_vars()
    supabase_url = env.get('NEXT_PUBLIC_SUPABASE_URL', '').rstrip('/')
    service_key = env.get('SUPABASE_SERVICE_ROLE_KEY') or env.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')

    if not supabase_url or not service_key or 'placeholder' in supabase_url:
        print("❌ Supabase credentials missing or in placeholder mode in .env.local")
        print("💡 Step: Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first!")
        return

    # 1. Sync Categories
    if os.path.exists(CATEGORIES_FILE):
        with open(CATEGORIES_FILE, 'r', encoding='utf-8') as f:
            categories = json.load(f)
        cat_rows = []
        for cat in categories:
            cat_rows.append({
                "name": cat.get('name'),
                "slug": cat.get('slug'),
                "description": cat.get('description', ''),
                "layout": cat.get('layout') or f"{cat.get('slug')}-layout",
                "display_order": cat.get('order', 1),
                "is_visible": cat.get('isVisible', True),
                "subcategories": cat.get('subcategories', [])
            })
        print(f"📦 Syncing {len(cat_rows)} categories to Supabase...")
        try:
            req = urllib.request.Request(
                f"{supabase_url}/rest/v1/categories?on_conflict=slug",
                data=json.dumps(cat_rows).encode('utf-8'),
                headers={
                    "apikey": service_key,
                    "Authorization": f"Bearer {service_key}",
                    "Content-Type": "application/json",
                    "Prefer": "resolution=merge-duplicates"
                },
                method="POST"
            )
            ctx = ssl.create_default_context()
            with urllib.request.urlopen(req, context=ctx) as resp:
                print(f"✅ Categories synced successfully (HTTP {resp.status})")
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8', errors='ignore')
            print(f"⚠️ Categories sync error HTTP {e.code}: {err_body}")

    # 2. Sync Articles
    if not os.path.exists(ARTICLES_FILE):
        print(f"❌ Articles file missing: {ARTICLES_FILE}")
        return

    with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    rows = [map_article_to_row(p) for p in posts]
    print(f"🚀 Preparing to sync {len(rows)} GudTree articles to Supabase ({supabase_url})...")

    # Upload in batches of 10
    batch_size = 10
    for i in range(0, len(rows), batch_size):
        batch = rows[i:i + batch_size]
        try:
            req = urllib.request.Request(
                f"{supabase_url}/rest/v1/articles?on_conflict=slug",
                data=json.dumps(batch).encode('utf-8'),
                headers={
                    "apikey": service_key,
                    "Authorization": f"Bearer {service_key}",
                    "Content-Type": "application/json",
                    "Prefer": "resolution=merge-duplicates"
                },
                method="POST"
            )
            ctx = ssl.create_default_context()
            with urllib.request.urlopen(req, context=ctx) as resp:
                print(f"   ✓ Uploaded batch {i + 1} - {min(i + batch_size, len(rows))} of {len(rows)}")
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8', errors='ignore')
            print(f"   ❌ Batch failed HTTP {e.code}: {err_body}")
            break

    # 3. Sync Site Settings
    SITE_CONFIG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'data', 'siteConfig.json')
    if os.path.exists(SITE_CONFIG_FILE):
        with open(SITE_CONFIG_FILE, 'r', encoding='utf-8') as f:
            cfg = json.load(f)
        site_row = {
            'id': 'global_config',
            'name': cfg.get('name'),
            'short_name': cfg.get('shortName'),
            'tagline': cfg.get('tagline'),
            'description': cfg.get('description'),
            'established_year': cfg.get('establishedYear'),
            'current_date_text': cfg.get('currentDate'),
            'edition': cfg.get('edition'),
            'contact': cfg.get('contact'),
            'social_links': cfg.get('socialLinks'),
            'copyright': cfg.get('copyright'),
            'updated_at': '2026-11-17T07:34:00Z'
        }
        try:
            req = urllib.request.Request(
                f"{supabase_url}/rest/v1/site_settings?on_conflict=id",
                data=json.dumps([site_row]).encode('utf-8'),
                headers={
                    "apikey": service_key,
                    "Authorization": f"Bearer {service_key}",
                    "Content-Type": "application/json",
                    "Prefer": "resolution=merge-duplicates"
                },
                method="POST"
            )
            ctx = ssl.create_default_context()
            with urllib.request.urlopen(req, context=ctx) as resp:
                print(f"✅ Site config synced successfully (HTTP {resp.status})")
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8', errors='ignore')
            print(f"⚠️ Site config sync error HTTP {e.code}: {err_body}")

    print("🎉 Done! All categories, articles, and site config are in Supabase.")

if __name__ == '__main__':
    upload_to_supabase()
