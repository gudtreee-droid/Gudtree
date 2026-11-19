import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { CATEGORIES, getCategorySlug } from '@/data/categories';
import { getArticleSummaries, getCategories, getSiteConfig } from '@/data/db';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';
import GudTreeArchiveClient from '@/components/gudtree/GudTreeArchiveClient';

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    sub?: string;
  }>;
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();
  const rawCat = params.category?.trim();
  const sub = params.sub?.trim();

  if (rawCat && rawCat.toLowerCase() !== 'all') {
    const slug = getCategorySlug(rawCat);
    const catObj = CATEGORIES.find(
      (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.name.toLowerCase() === rawCat.toLowerCase()
    );
    const catName = catObj?.name || rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
    const canonicalUrl = sub
      ? `${baseUrl}/category/${slug}?sub=${encodeURIComponent(sub)}`
      : `${baseUrl}/category/${slug}`;

    const title = `${catName} Articles & Guides | ${siteConfig.name}`;
    const description =
      catObj?.description ||
      `Explore honest ${catName} articles, food label audits, and clean nutrition swaps on ${siteConfig.name}.`;

    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: siteConfig.name,
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title,
        description,
      },
    };
  }

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

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();
  const rawCat = params.category?.trim();
  const sub = params.sub?.trim();

  if (params.category !== undefined) {
    if (!rawCat || rawCat.toLowerCase() === 'all') {
      permanentRedirect('/category');
    }
    const cleanSlug = getCategorySlug(rawCat);
    permanentRedirect(
      sub ? `/category/${cleanSlug}?sub=${encodeURIComponent(sub)}` : `/category/${cleanSlug}`
    );
  }

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
          initialArticles={getArticleSummaries()}
          initialCategories={getCategories()}
        />
      </Suspense>
    </>
  );
}
