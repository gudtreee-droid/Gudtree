"""
GudTree Supabase Sync Utility
Allows syncing local articles in src/data/articles.json to your GudTree Supabase DB.
"""
import os
import json
import urllib.request
import ssl
import time

ARTICLES_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'data', 'articles.json')
ENV_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env.local')

def get_env_vars():
    env = {}
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    env[k.strip()] = v.strip()
    return env

def upload_to_supabase(batch_size=100):
    env = get_env_vars()
    supabase_url = env.get('NEXT_PUBLIC_SUPABASE_URL')
    service_key = env.get('SUPABASE_SERVICE_ROLE_KEY') or env.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')

    if not supabase_url or not service_key or 'placeholder' in supabase_url:
        print("❌ Supabase URL or Key missing or in placeholder mode for GudTree.")
        print("💡 Configure your GudTree Supabase credentials in .env.local first.")
        return

    if not os.path.exists(ARTICLES_FILE):
        print(f"❌ Articles file missing: {ARTICLES_FILE}")
        return

    with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    print(f"🚀 Preparing to sync {len(posts)} GudTree articles to Supabase ({supabase_url})...")
    # sync logic follows...

if __name__ == '__main__':
    upload_to_supabase()
