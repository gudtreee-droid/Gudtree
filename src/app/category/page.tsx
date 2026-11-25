import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CATEGORIES } from '@/data/categories';
import { getArticleSummaries, getCategories, getSiteConfig } from '@/data/db';
import { getArticlesFromDB } from '@/lib/supabaseService';
import { stripArticleForCard } from '@/lib/articleSummary';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';
import GudTreeCategoryPageView from '@/components/gudtree/GudTreeCategoryPageView';

export function generateMetadata(): Metadata {
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();
  const canonicalUrl = `${baseUrl}/category`;

  return {
    title: `All Clean Snacking & Nutrition Topics | ${siteConfig.name}`,
    description:
      'Browse all GudTree healthy snacking, nutrition, patient wellness, and clean eating categories.',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `All Clean Snacking & Nutrition Topics | ${siteConfig.name}`,
      description: 'Complete directory of GudTree clean eating & snacking guides.',
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}

export default async function CategoriesIndexPage() {
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();
  const dbArticles = await getArticlesFromDB();
  const rawArticles =
    dbArticles && dbArticles.length > 0 ? dbArticles : getArticleSummaries();
  const allArticles = rawArticles.map(stripArticleForCard);
  const categories = getCategories();

  const defaultCategory = categories[0] || CATEGORIES[0];

  const categoryArticles = allArticles.filter(
    (a) => a.category === defaultCategory.name
  );

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#FFFDF9] py-16 text-center text-[#102A56]">
          <p className="text-[16px] font-bold">Loading clean categories...</p>
        </div>
      }
    >
      <GudTreeCategoryPageView
        currentSlug={defaultCategory.slug}
        categoryObj={defaultCategory}
        initialArticles={categoryArticles}
        allArticles={allArticles}
        categories={categories}
      />
    </Suspense>
  );
}
