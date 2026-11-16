import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { getArticles, getSiteConfig } from '@/data/db';
import { getArticlesFromDB } from '@/lib/supabaseService';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';
import EditorialTitle from '@/components/gudtree/EditorialTitle';

export const dynamic = 'force-dynamic';

function normalizeCatKey(value?: string): string {
  return (value || '').replace(/[-\s_]/g, '').toLowerCase();
}

export function generateMetadata(): Metadata {
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();
  const canonicalUrl = `${baseUrl}/category`;

  return {
    title: `Topics & Wellness Categories | ${siteConfig.name}`,
    description:
      'Browse all GudTree healthy snacking, nutrition, patient wellness, and clean eating categories.',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `Topics & Wellness Categories | ${siteConfig.name}`,
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
  const allArticles = dbArticles && dbArticles.length > 0 ? dbArticles : getArticles();

  const categoriesWithCounts = CATEGORIES.map((cat) => {
    const norm = normalizeCatKey(cat.slug);
    const matching = allArticles.filter(
      (a) =>
        normalizeCatKey(a.category) === norm ||
        (Array.isArray(a.categories) &&
          a.categories.some((c) => normalizeCatKey(c) === norm))
    );
    return {
      ...cat,
      count: matching.length,
      latestTitle: matching[0]?.title,
    };
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/category#collection`,
        url: `${baseUrl}/category`,
        name: `Editorial Categories | ${siteConfig.name}`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          name: siteConfig.name,
          url: baseUrl,
        },
      },
      {
        '@type': 'ItemList',
        itemListElement: categoriesWithCounts.map((c, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${baseUrl}/category/${c.slug}`,
          name: c.name,
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

      <section className="w-full max-w-full overflow-x-clip bg-[#FFF9EC] text-[#102A56] py-8 sm:py-12">
        <div className="gt-container">
          <header className="mb-8 sm:mb-10 pb-5 border-b border-[#ADC3DE]/60 flex flex-col items-start gap-2.5">
            <span className="gt-badge-caramel">Topic Directory</span>
            <h1 className="gt-font-display text-[32px] sm:text-[42px] leading-[1.08] tracking-[-0.025em] text-[#102A56]">
              Explore All Clean Eating Topics
            </h1>
            <p className="text-[15px] sm:text-[16.5px] leading-[1.55] text-[#334155] max-w-2xl">
              Navigate every healthy snacking, label audit, and patient diet hub across GudTree.
            </p>
          </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesWithCounts.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group p-6 rounded-[24px] bg-[#FFFFFF] border border-[#ADC3DE]/55 hover:border-[#DA440D] hover:shadow-[0_16px_36px_-10px_rgba(16,42,86,0.12)] transition-all flex flex-col justify-between gap-4 no-underline"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="gt-badge-olive">{cat.name}</span>
                  <span className="text-[12px] font-semibold text-[#666666]">
                    {cat.count} {cat.count === 1 ? 'guide' : 'guides'}
                  </span>
                </div>

                {cat.description && (
                  <p className="text-[14px] leading-[1.55] text-[#666666] line-clamp-2">
                    {cat.description}
                  </p>
                )}

                {cat.latestTitle && (
                  <div className="pt-3 border-t border-[#ADC3DE]/40">
                    <span className="block text-[10.5px] font-bold uppercase tracking-wider text-[#DA440D] mb-1">
                      Latest Guide
                    </span>
                    <EditorialTitle
                      title={cat.latestTitle}
                      variant="compact"
                      as="h3"
                      className="text-[#102A56]"
                    />
                  </div>
                )}
              </div>

              <span className="inline-flex items-center gap-1 sc-display-sm text-[15px] text-[#102A56] group-hover:text-[#DA440D] transition-colors">
                <span>Browse {cat.name}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
          </div>
        </div>
      </section>
    </>
  );
}
