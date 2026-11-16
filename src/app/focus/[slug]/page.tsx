import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleSummaries } from '@/data/db';
import { getArticlesFromDB } from '@/lib/supabaseService';
import { stripArticleForSummary } from '@/lib/articleSummary';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';
import { FOCUS_SLUGS, getFocusPageConfig } from '@/data/focusPagesData';
import SundayCrumbFocusPage from '@/components/gudtree/SundayCrumbFocusPage';

export const dynamic = 'force-dynamic';

interface FocusRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FOCUS_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FocusRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getFocusPageConfig(slug);
  if (!config) {
    return { title: 'Diet Focus Not Found | GudTree' };
  }

  const baseUrl = getSiteBaseUrl();
  return {
    title: { absolute: config.seoTitle },
    description: config.seoDescription,
    alternates: { canonical: `${baseUrl}/focus/${config.slug}` },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      url: `${baseUrl}/focus/${config.slug}`,
      type: 'website',
      siteName: 'GudTree',
    },
  };
}

export default async function FocusCategoryPage({ params }: FocusRouteProps) {
  const { slug } = await params;
  const config = getFocusPageConfig(slug);

  if (!config) {
    notFound();
  }

  const dbArticles = await getArticlesFromDB();
  const articles =
    dbArticles && dbArticles.length > 0
      ? dbArticles.map(stripArticleForSummary)
      : getArticleSummaries();

  return <SundayCrumbFocusPage config={config} articles={articles} />;
}
