import React from 'react';
import { getArticleSummaries } from '@/data/db';
import { getArticlesFromDB } from '@/lib/supabaseService';
import { stripArticleForSummary } from '@/lib/articleSummary';
import GudTreeHomeView from '@/components/gudtree/GudTreeHomeView';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const dbArticles = await getArticlesFromDB();
  const articles =
    dbArticles && dbArticles.length > 0
      ? dbArticles.map(stripArticleForSummary)
      : getArticleSummaries();

  return (
    <div id="main" className="flex flex-col w-full max-w-full overflow-x-clip bg-[#FFF9EC] text-[#102A56]">
      <GudTreeHomeView articles={articles} />
    </div>
  );
}
