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

  const absoluteImageUrl = article.image
    ? article.image.startsWith('http')
      ? article.image
      : `${baseUrl}${article.image.startsWith('/') ? '' : '/'}${article.image}`
    : `${baseUrl}/icon.png`;

  return {
    title: { absolute: resolvedMetaTitle },
    description: resolvedMetaDesc,
    keywords,
    authors: [{ name: article.author || siteConfig.name }],
    creator: article.author || siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: articleUrl,
      languages: {
        'en-IN': articleUrl,
        'hi-IN': articleUrl,
        'x-default': articleUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: resolvedMetaTitle,
      description: resolvedMetaDesc,
      url: articleUrl,
      siteName: siteConfig.name,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [article.author],
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
      const parsed = Date.parse(article.date);
      return !isNaN(parsed) ? new Date(parsed).toISOString() : '2026-11-11T08:00:00.000Z';
    } catch {
      return '2026-11-11T08:00:00.000Z';
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
        dateModified: isoDate,
        inLanguage: 'en-IN',
        isAccessibleForFree: true,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        articleSection: article.category,
        keywords: keywordList,
        author: [
          {
            '@type': 'Organization',
            name: `${siteConfig.name} Editorial Team`,
            url: `${baseUrl}/write-for-us`,
          },
        ],
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
        const faqItems: Array<{ q: string; a: string }> = [];

        if (article.sections && article.sections.length > 0) {
          for (const sec of article.sections) {
            if (sec.heading && sec.content) {
              faqItems.push({
                q: sec.heading.trim().endsWith('?')
                  ? sec.heading.trim()
                  : `What should you know about ${sec.heading.trim()}?`,
                a: sec.content.trim(),
              });
            }
          }
        }

        if (faqItems.length === 0 && article.content) {
          const h2pRegex = /<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;
          let match: RegExpExecArray | null;
          while ((match = h2pRegex.exec(article.content)) !== null) {
            const q = match[1].replace(/<[^>]+>/g, '').trim();
            const a = match[2].replace(/<[^>]+>/g, '').trim();
            if (q && a && q.length > 5 && a.length > 20) {
              faqItems.push({
                q: q.endsWith('?') ? q : `What should you know about ${q}?`,
                a,
              });
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
  const normCurrentCat = article.category.toLowerCase();
  const candidates = allArticles.filter(
    (a) => a.slug !== article.slug && !a.excludeFromPopularPosts
  );

  const sameCategory = candidates.filter(
    (a) =>
      a.category?.toLowerCase() === normCurrentCat ||
      a.categories?.some((c) => c.toLowerCase() === normCurrentCat)
  );

  const relatedArticles =
    sameCategory.length >= 3
      ? sameCategory.slice(0, 3)
      : [
          ...sameCategory,
          ...candidates.filter((a) => !sameCategory.includes(a)),
        ].slice(0, 3);

  const topSidebarArticles = [...candidates]
    .sort(
      (a, b) =>
        (b.top10VisitCount || b.viewsCount || 0) -
        (a.top10VisitCount || a.viewsCount || 0)
    )
    .slice(0, 6);

  return { relatedArticles, topSidebarArticles };
}

