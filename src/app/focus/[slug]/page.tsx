import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleSummaries } from '@/data/db';
import { getArticlesFromDB } from '@/lib/supabaseService';
import { stripArticleForCard } from '@/lib/articleSummary';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';
import { FOCUS_SLUGS, getFocusPageConfig } from '@/data/focusPagesData';
import SundayCrumbFocusPage from '@/components/gudtree/SundayCrumbFocusPage';

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

  const baseUrl = getSiteBaseUrl();
  const dbArticles = await getArticlesFromDB();
  const rawArticles =
    dbArticles && dbArticles.length > 0 ? dbArticles : getArticleSummaries();
  const articles = rawArticles.map(stripArticleForCard);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/focus/${config.slug}#webpage`,
        url: `${baseUrl}/focus/${config.slug}`,
        name: config.seoTitle,
        description: config.seoDescription,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          name: 'GudTree',
          url: baseUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/focus/${config.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Health Goals', item: `${baseUrl}/#health-goals` },
          { '@type': 'ListItem', position: 3, name: config.title, item: `${baseUrl}/focus/${config.slug}` },
        ],
      },
      ...(config.faqs && config.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${baseUrl}/focus/${config.slug}#faq`,
              mainEntity: config.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SundayCrumbFocusPage config={config} articles={articles} />
    </>
  );
}
