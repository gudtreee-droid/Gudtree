import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CATEGORIES, getCategorySlug } from '@/data/categories';
import { getCategorySeo } from '@/data/categorySeo';
import { getArticleSummaries, getCategories, getSiteConfig } from '@/data/db';
import { getArticlesFromDB } from '@/lib/supabaseService';
import { stripArticleForSummary } from '@/lib/articleSummary';
import { getBlogUrl } from '@/lib/blogUrl';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';
import GudTreeCategoryPageView from '@/components/gudtree/GudTreeCategoryPageView';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}

function normalizeCatKey(value?: string): string {
  return (value || '').replace(/[-\s_]/g, '').toLowerCase();
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const catSlug = slug.toLowerCase();
  const seo = getCategorySeo(catSlug);
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();
  const canonicalUrl = `${baseUrl}/category/${catSlug}`;

  return {
    title: { absolute: seo.metaTitle },
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}

export default async function CategorySlugPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const sParams = await searchParams;
  const initialSub = sParams?.sub || 'all';
  const catSlug = slug.toLowerCase();
  const seo = getCategorySeo(catSlug);
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();

  const catObj = CATEGORIES.find(
    (c) => normalizeCatKey(c.slug) === normalizeCatKey(catSlug)
  );
  const catName = catObj?.name || catSlug.charAt(0).toUpperCase() + catSlug.slice(1);

  const dbArticles = await getArticlesFromDB();
  const allArticles =
    dbArticles && dbArticles.length > 0
      ? dbArticles.map(stripArticleForSummary)
      : getArticleSummaries();
  const categories = getCategories();
  const normCat = normalizeCatKey(catSlug);

  const categoryArticles = allArticles.filter((a) => {
    if (normalizeCatKey(a.category) === normCat) return true;
    if (getCategorySlug(a.category) === catSlug) return true;
    if (
      Array.isArray(a.categories) &&
      a.categories.some((c) => normalizeCatKey(c) === normCat || getCategorySlug(c) === catSlug)
    ) {
      return true;
    }
    return false;
  });

  const pageUrl = `${baseUrl}/category/${catSlug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        url: pageUrl,
        name: seo.metaTitle,
        description: seo.metaDescription,
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
          { '@type': 'ListItem', position: 2, name: 'Categories', item: `${baseUrl}/category` },
          { '@type': 'ListItem', position: 3, name: catName, item: pageUrl },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: categoryArticles.slice(0, 16).map((art, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${baseUrl}${getBlogUrl(art)}`,
          name: art.title,
        })),
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
          <div className="w-full min-h-screen bg-[#FFFDF9] py-16 text-center text-[#102A56]">
            <p className="text-[16px] font-bold">Loading {catName} clean guides...</p>
          </div>
        }
      >
        <GudTreeCategoryPageView
          currentSlug={catSlug}
          categoryObj={catObj}
          initialArticles={categoryArticles}
          allArticles={allArticles}
          categories={categories}
          initialSub={initialSub}
        />
      </Suspense>
    </>
  );
}
