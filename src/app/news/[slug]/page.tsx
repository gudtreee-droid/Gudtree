import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import { getArticles, getArticleBySlug, getSiteConfig } from '@/data/db';
import { getArticlesFromDB } from '@/lib/supabaseService';
import { getCategorySlug } from '@/data/categories';
import GudTreeArticleView from '@/components/gudtree/GudTreeArticleView';
import {
  getSiteBaseUrl,
  buildArticleMetadata,
  buildArticleJsonLd,
  selectArticleRecommendations,
} from '@/lib/articlePageHelpers';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const dbArticles = await getArticlesFromDB();
  const articles = dbArticles && dbArticles.length > 0 ? dbArticles : getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbArticles = await getArticlesFromDB();
  const article =
    dbArticles?.find((a) => a.slug === slug || a.id === slug) || getArticleBySlug(slug);
  return buildArticleMetadata(article);
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dbArticles = await getArticlesFromDB();
  const article =
    dbArticles?.find((a) => a.slug === slug || a.id === slug) || getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const catSlug = getCategorySlug(article.category);
  if (catSlug !== 'news') {
    permanentRedirect(`/${catSlug}/${article.slug}`);
  }

  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();
  const allArticles = dbArticles && dbArticles.length > 0 ? dbArticles : getArticles();
  const { relatedArticles, topSidebarArticles } = selectArticleRecommendations(
    allArticles,
    article
  );
  const currentIdx = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIdx > 0 ? allArticles[currentIdx - 1] : null;
  const nextArticle =
    currentIdx >= 0 && currentIdx < allArticles.length - 1
      ? allArticles[currentIdx + 1]
      : null;

  const shouldShowFeaturedImage =
    article.showFeaturedImage !== false &&
    article.showFeaturedImage !== 'No' &&
    article.showFeaturedImage !== 'no';
  const shouldShowPopularPosts = !article.disablePopularPostsDisplay;
  const articleUrl = `${baseUrl}/news/${article.slug}`;
  const jsonLd = buildArticleJsonLd(article, articleUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GudTreeArticleView
        article={article}
        relatedArticles={relatedArticles}
        topSidebarArticles={topSidebarArticles}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
        showFeaturedImage={shouldShowFeaturedImage}
        shouldShowPopularPosts={shouldShowPopularPosts}
        siteName={siteConfig.name}
      />
    </>
  );
}
