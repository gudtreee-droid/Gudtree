import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envText = fs.readFileSync('.env.local', 'utf8');
const env = {};
envText.split('\n').forEach(l => {
  const m = l.match(/^([^#=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(url, key);

async function run() {
  console.log('=== GUDTREE TRAFFIC & REACH AUDIT ===\n');

  // 1. Overall Site Analytics
  const { data: analyticsRecord, error: aErr } = await supabase
    .from('site_settings')
    .select('contact, updated_at')
    .eq('id', 'site_analytics')
    .single();

  if (aErr) {
    console.error('Analytics record fetch error:', aErr.message);
  } else {
    const contact = analyticsRecord?.contact || {};
    console.log('--- 1. OVERALL SITE REACH ---');
    console.log('Total Recorded Visits:', contact.totalVisits || 0);
    console.log('Unique Visitors Tracked:', contact.uniqueVisitors || 0);
    console.log('Last Tracking Ping:', analyticsRecord?.updated_at);
    console.log('\n--- 2. DAILY VISITS TIMELINE (PAST 7-8 DAYS) ---');
    const daily = contact.dailyVisits || {};
    Object.keys(daily).sort().forEach(date => {
      console.log(`- ${date}: ${daily[date]} visits`);
    });
  }

  // 2. Articles in Supabase Database
  const { data: dbArticles, error: artErr } = await supabase
    .from('articles')
    .select('slug, title, category, views_count, likes_count, created_at')
    .order('views_count', { ascending: false });

  if (artErr) {
    console.error('Articles fetch error:', artErr.message);
  } else {
    console.log('\n--- 3. DATABASE ARTICLES STATUS ---');
    console.log('Total Articles in Supabase:', dbArticles.length);
    const withViews = dbArticles.filter(a => Number(a.views_count) > 0);
    console.log('Articles with Recorded Views (>0):', withViews.length);
    console.log('Total Views Sum in DB:', dbArticles.reduce((acc, a) => acc + (Number(a.views_count) || 0), 0));
    
    console.log('\n--- 4. ARTICLES WITH ACTIVE VIEWS ---');
    if (withViews.length === 0) {
      console.log('No articles with > 0 views recorded in database yet.');
    } else {
      withViews.forEach((a, i) => {
        console.log(`${i + 1}. [${a.views_count} views] "${a.title}" | Category: ${a.category} (${a.slug})`);
      });
    }

    // Category breakdown in DB
    const catMap = {};
    dbArticles.forEach(a => {
      const c = a.category || 'Uncategorized';
      if (!catMap[c]) catMap[c] = { count: 0, views: 0 };
      catMap[c].count++;
      catMap[c].views += Number(a.views_count) || 0;
    });

    console.log('\n--- 5. CATEGORY BREAKDOWN (ARTICLES & VIEWS) ---');
    Object.keys(catMap).sort((a,b) => catMap[b].count - catMap[a].count).forEach(c => {
      console.log(`- ${c}: ${catMap[c].count} articles | ${catMap[c].views} total views`);
    });
  }

  // 3. Local articles.json
  const localArticles = JSON.parse(fs.readFileSync('src/data/articles.json', 'utf8'));
  console.log('\n--- 6. LOCAL DATASET ARTICLES.JSON ---');
  console.log('Total Articles in articles.json:', localArticles.length);
  const localCategories = {};
  localArticles.forEach(a => {
    const c = a.category || 'Uncategorized';
    localCategories[c] = (localCategories[c] || 0) + 1;
  });
  console.log('Categories distribution in articles.json:');
  Object.keys(localCategories).sort((a,b) => localCategories[b] - localCategories[a]).forEach(c => {
    console.log(`- ${c}: ${localCategories[c]} articles`);
  });

  // 4. Tracking Infrastructure
  console.log('\n--- 7. TRACKING & ANALYTICS INTEGRATIONS ---');
  console.log('Google Tag Manager (GTM):', env.NEXT_PUBLIC_GTM_ID ? `Active (${env.NEXT_PUBLIC_GTM_ID})` : 'Not Set');
  console.log('Microsoft Clarity:', env.NEXT_PUBLIC_CLARITY_PROJECT_ID ? `Active (${env.NEXT_PUBLIC_CLARITY_PROJECT_ID})` : 'Not Set');
  console.log('Plerdy Code:', 'Active (suid: 83360)');
  console.log('Supabase Real-Time Tracker:', url ? `Active (${url})` : 'Not Set');
}

run().catch(console.error);
