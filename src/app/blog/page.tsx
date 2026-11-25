import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getArticleSummaries, getCategories, getSiteConfig } from '@/data/db';
import { stripArticleForCard } from '@/lib/articleSummary';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';
import GudTreeArchiveClient from '@/components/gudtree/GudTreeArchiveClient';

export function generateMetadata(): Metadata {
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();
  const archiveUrl = `${baseUrl}/blog`;
  const defaultTitle = `Clean Food, Snacking & Nutrition Blog | ${siteConfig.name}`;
  const defaultDescription =
    'Honest food label audits, zero-palm-oil snack reviews, diabetic-friendly munching guides, and desi pantry swaps on GudTree.';

  return {
    title: defaultTitle,
    description: defaultDescription,
    alternates: { canonical: archiveUrl },
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: archiveUrl,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: defaultTitle,
      description: defaultDescription,
    },
  };
}

export default function BlogPage() {
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();

  const pageTitle = `Clean Food & Snacking Blog | ${siteConfig.name}`;
  const pageDescription =
    'Honest food label audits, zero-palm-oil snack reviews, diabetic-friendly munching guides, and desi pantry swaps on GudTree.';
  const pageUrl = `${baseUrl}/blog`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          name: siteConfig.name,
          url: baseUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="gt-container py-16 text-center">
            <div className="sc-display-sm text-[20px] text-[#102A56]">
              Loading {siteConfig.name} Clean Nutrition Library...
            </div>
            <p className="text-[14px] text-[#666666] mt-2">
              Fetching healthy snacking &amp; food audit guides...
            </p>
          </div>
        }
      >
        <GudTreeArchiveClient
          initialArticles={getArticleSummaries().map(stripArticleForCard)}
          initialCategories={getCategories()}
        />
      </Suspense>
    </>
  );
}
