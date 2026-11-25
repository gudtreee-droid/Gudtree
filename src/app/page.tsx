import React from 'react';
import { getArticleSummaries } from '@/data/db';
import { getArticlesFromDB } from '@/lib/supabaseService';
import { stripArticleForCard } from '@/lib/articleSummary';
import { BLOG_SHELF_TABS } from '@/data/blogShelfTabs';
import GudTreeHomeView from '@/components/gudtree/GudTreeHomeView';
import { Article } from '@/types';

function selectInitialHomeArticles(allArticles: Article[]): Article[] {
  const picked = new Map<string, Article>();
  const addAll = (list: Article[]) => {
    for (const a of list) {
      if (!picked.has(a.slug)) picked.set(a.slug, a);
    }
  };

  // 1. Articles needed by the 9 BlogDiscoveryTabsShelf tabs (top 6 each)
  for (const tab of BLOG_SHELF_TABS) {
    const matched = allArticles.filter((a) => {
      const hay = `${a.title} ${a.category} ${a.excerpt || ''} ${a.tag || ''}`.toLowerCase();
      return tab.keywords.some((kw) => hay.includes(kw));
    });
    if (matched.length >= 6) {
      addAll(matched.slice(0, 6));
    } else {
      const used = new Set(matched.map((m) => m.slug));
      const offsetSlice = allArticles
        .slice(tab.fallbackOffset)
        .concat(allArticles.slice(0, tab.fallbackOffset))
        .filter((a) => !used.has(a.slug));
      addAll([...matched, ...offsetSlice].slice(0, 6));
    }
  }

  // 2. Articles needed by the 7 category showcase sections on home (top 4 each)
  const snacks = allArticles.filter((a) => {
    const c = (a.category || '').toLowerCase();
    return c.includes('snack') || c.includes('label') || c.includes('pantry');
  });
  const snacksSlice = (snacks.length >= 4 ? snacks : allArticles).slice(0, 4);
  addAll(snacksSlice);

  const usedSnackSlugs = new Set(snacksSlice.map((a) => a.slug));
  const health = allArticles.filter(
    (a) =>
      !usedSnackSlugs.has(a.slug) &&
      ((a.category || '').toLowerCase().includes('gut') ||
        (a.category || '').toLowerCase().includes('diabet') ||
        (a.category || '').toLowerCase().includes('pcos') ||
        (a.category || '').toLowerCase().includes('heart'))
  );
  addAll((health.length >= 4 ? health : allArticles.filter((a) => !usedSnackSlugs.has(a.slug))).slice(0, 4));

  for (const kw of ['kid', 'gym', 'drink', 'market', 'women']) {
    addAll(allArticles.filter((a) => (a.category || '').toLowerCase().includes(kw)).slice(0, 4));
  }

  return Array.from(picked.values());
}

export default async function HomePage() {
  const dbArticles = await getArticlesFromDB();
  const rawArticles =
    dbArticles && dbArticles.length > 0 ? dbArticles : getArticleSummaries();
  const slimArticles = selectInitialHomeArticles(rawArticles).map(stripArticleForCard);

  return (
    <div id="main" className="flex flex-col w-full max-w-full overflow-x-clip bg-[#FFF9EC] text-[#102A56]">
      <GudTreeHomeView articles={slimArticles} />
    </div>
  );
}
