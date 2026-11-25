import { Metadata } from 'next';
import { Article } from '@/types';
import { getSiteConfig } from '@/data/db';
import { getCategorySlug } from '@/data/categories';
import { getBlogUrl } from '@/lib/blogUrl';

import { getSiteBaseUrl } from '@/lib/siteUrl';

export { getSiteBaseUrl };

function normalizeKeywords(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((v): v is string => typeof v === 'string' && v.trim().length > 0);
  }
  if (typeof raw === 'string' && raw.trim().length > 0) {
    return raw.split(',').map((k) => k.trim()).filter(Boolean);
  }
  return [];
}

export function buildArticleMetadata(article: Article | undefined): Metadata {
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();

  if (!article) {
    return {
      title: 'Story Not Found',
      description: 'The requested editorial story could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = getBlogUrl(article);
  const articleUrl = `${baseUrl}${canonicalPath}`;
  const parsedKeywords = normalizeKeywords(article.keywords);
  const keywords =
    parsedKeywords.length > 0
      ? parsedKeywords
      : ([
          article.tag,
          article.category,
          'GudTree',
          'healthy snacks india',
          siteConfig.name,
        ].filter(Boolean) as string[]);

  const resolvedMetaTitle = article.metaTitle || `${article.title} | ${siteConfig.name}`;
  const resolvedMetaDesc = article.metaDescription || article.excerpt;

  const isoPublished = (() => {
    try {
      const parsed = Date.parse(article.publishDate || article.date);
      return !isNaN(parsed) ? new Date(parsed).toISOString() : '2026-11-11T08:00:00.000Z';
    } catch {
      return '2026-11-11T08:00:00.000Z';
    }
  })();

  const isoModified = (() => {
    try {
      const parsed = Date.parse(article.updatedDate || article.publishDate || article.date);
      return !isNaN(parsed) ? new Date(parsed).toISOString() : isoPublished;
    } catch {
      return isoPublished;
    }
  })();

  const absoluteImageUrl = article.image
    ? article.image.startsWith('http')
      ? article.image
      : `${baseUrl}${article.image.startsWith('/') ? '' : '/'}${article.image}`
    : `${baseUrl}/icon.png`;

  const shouldIndex = !article.noIndex;

  return {
    title: { absolute: resolvedMetaTitle },
    description: resolvedMetaDesc,
    keywords,
    authors: [{ name: article.author || `${siteConfig.name} Nutrition Desk` }],
    creator: article.author || siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: articleUrl,
      languages: {
        'en-IN': articleUrl,
        'x-default': articleUrl,
      },
    },
    robots: shouldIndex
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        },
    openGraph: {
      title: resolvedMetaTitle,
      description: resolvedMetaDesc,
      url: articleUrl,
      siteName: siteConfig.name,
      type: 'article',
      publishedTime: isoPublished,
      modifiedTime: isoModified,
      authors: [article.author || `${siteConfig.name} Nutrition Desk`],
      section: article.category,
      tags: [article.tag || article.category],
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedMetaTitle,
      description: resolvedMetaDesc,
      images: [absoluteImageUrl],
      creator: siteConfig.socialLinks?.twitter || '@gudtree',
    },
  };
}

export function buildArticleJsonLd(article: Article, articleUrl: string) {
  const siteConfig = getSiteConfig();
  const baseUrl = getSiteBaseUrl();
  const catSlug = getCategorySlug(article.category);

  const isoDate = (() => {
    try {
      const parsed = Date.parse(article.publishDate || article.date);
      return !isNaN(parsed) ? new Date(parsed).toISOString() : '2026-11-11T08:00:00.000Z';
    } catch {
      return '2026-11-11T08:00:00.000Z';
    }
  })();

  const isoModified = (() => {
    try {
      const parsed = Date.parse(article.updatedDate || article.publishDate || article.date);
      return !isNaN(parsed) ? new Date(parsed).toISOString() : isoDate;
    } catch {
      return isoDate;
    }
  })();

  const keywordList = [
    ...normalizeKeywords(article.keywords),
    ...normalizeKeywords(article.targetedKeywords),
    article.tag,
    article.category,
    siteConfig.name,
  ]
    .filter((v): v is string => Boolean(v))
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(', ');

  const authorName = article.author?.trim() || 'GudTree Nutrition Desk';
  const isTeamAuthor = /team|desk|lab|editorial/i.test(authorName) && !authorName.includes('&') && !authorName.startsWith('Dr.');
  const reviewerName = article.reviewedBy?.trim() || 'Dr. Radhika Sen, MBBS, DNB';
  const reviewerRole = article.reviewedByRole?.trim() || 'Clinical Nutrition & Metabolic Health Reviewer';

  const citationUrls = Array.isArray(article.sources)
    ? article.sources.map((s) => s.url).filter((u) => /^https?:\/\//i.test(u))
    : [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Article', 'MedicalWebPage'],
        '@id': `${articleUrl}#article`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          name: siteConfig.name,
          url: baseUrl,
        },
        headline: article.metaTitle || article.title,
        description: article.metaDescription || article.excerpt,
        image: [
          article.image?.startsWith('http')
            ? article.image
            : `${baseUrl}${article.image || ''}`,
        ],
        datePublished: isoDate,
        dateModified: isoModified,
        inLanguage: 'en-IN',
        isAccessibleForFree: true,
        publishingPrinciples: `${baseUrl}/editorial-policy`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        articleSection: article.category,
        keywords: keywordList,
        ...(citationUrls.length > 0 ? { citation: citationUrls } : {}),
        author: [
          {
            '@type': isTeamAuthor ? 'Organization' : 'Person',
            name: authorName,
            ...(article.authorRole && !isTeamAuthor ? { jobTitle: article.authorRole } : {}),
            url: `${baseUrl}/editorial-policy`,
          },
        ],
        reviewedBy: {
          '@type': 'Person',
          name: reviewerName,
          jobTitle: reviewerRole,
          url: `${baseUrl}/editorial-policy`,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${baseUrl}/#organization`,
          name: siteConfig.name,
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/gudtree-logo.png`,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${articleUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          {
            '@type': 'ListItem',
            position: 2,
            name: article.category,
            item: `${baseUrl}/category/${catSlug}`,
          },
          { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
        ],
      },
      ...(() => {
        const faqItems: Array<{ q: string; a: string }> = Array.isArray(article.faqs)
          ? article.faqs.filter((f) => f?.q && f?.a)
          : [];

        // Only extract FAQ schema from actual question-format headings (ending with '?')
        if (faqItems.length === 0 && article.content) {
          const qRegex = /<h[23][^>]*>([^<]*\?)<\/h[23]>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
          let match: RegExpExecArray | null;
          while ((match = qRegex.exec(article.content)) !== null) {
            const q = match[1].replace(/<[^>]+>/g, '').trim();
            const a = match[2].replace(/<[^>]+>/g, '').trim();
            if (q && a && q.length > 8 && a.length > 25) {
              faqItems.push({ q, a });
            }
          }
        }

        if (faqItems.length >= 2) {
          return [
            {
              '@type': 'FAQPage',
              '@id': `${articleUrl}#faq`,
              mainEntity: faqItems.slice(0, 6).map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ];
        }

        return [];
      })(),
    ],
  };
}

export function selectArticleRecommendations(allArticles: Article[], article: Article) {
  const normCurrentCat = (article.category || '').toLowerCase();
  const candidates = allArticles.filter(
    (a) => a.slug !== article.slug && !a.excludeFromPopularPosts
  );

  const sameCategory = candidates.filter(
    (a) =>
      a.category?.toLowerCase() === normCurrentCat ||
      a.categories?.some((c) => c.toLowerCase() === normCurrentCat)
  );

  // Return up to 4 contextual recommendations
  const relatedArticles =
    sameCategory.length >= 4
      ? sameCategory.slice(0, 4)
      : [
          ...sameCategory,
          ...candidates.filter((a) => !sameCategory.includes(a)),
        ].slice(0, 4);

  // Smart diverse sidebar articles (curated high-impact audits)
  const sortedByViews = [...candidates].filter(
    (a) => (b_val(a)) > 0
  );

  function b_val(item: Article): number {
    return Number(item.top10VisitCount || item.viewsCount || (item as any).views || 0);
  }

  let topSidebarArticles: Article[];
  if (sortedByViews.length >= 6) {
    topSidebarArticles = sortedByViews.sort((a, b) => b_val(b) - b_val(a)).slice(0, 6);
  } else {
    // Pick diverse top audits across distinct categories based on article slug hash
    let hash = 0;
    for (let i = 0; i < (article.slug || '').length; i++) {
      hash = (hash * 31 + article.slug.charCodeAt(i)) | 0;
    }
    const offset = Math.abs(hash) % Math.max(1, candidates.length - 6);
    topSidebarArticles = [...candidates.slice(offset), ...candidates.slice(0, offset)].slice(0, 6);
  }

  return { relatedArticles, topSidebarArticles };
}

