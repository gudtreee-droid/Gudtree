import { MetadataRoute } from 'next';
import { getArticles, getCategories } from '@/data/db';
import { getArticlesFromDB } from '@/lib/supabaseService';
import { getBlogUrl } from '@/lib/blogUrl';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';
import { FOCUS_SLUGS } from '@/data/focusPagesData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteBaseUrl();

  const dbArticles = await getArticlesFromDB().catch(() => null);
  const articles = dbArticles && dbArticles.length > 0 ? dbArticles : getArticles();
  const categories = getCategories();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date('2026-11-25'), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date('2026-11-25'), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/category`, lastModified: new Date('2026-11-25'), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/editorial-policy`, lastModified: new Date('2026-11-25'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/write-for-us`, lastModified: new Date('2026-11-25'), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2026-11-25'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date('2026-11-25'), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2026-11-25'), changeFrequency: 'monthly', priority: 0.4 },
  ];

  const focusPages: MetadataRoute.Sitemap = FOCUS_SLUGS.map((slug) => ({
    url: `${baseUrl}/focus/${slug}`,
    lastModified: new Date('2026-11-25'),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((article) => !article.noIndex)
    .map((article) => {
      const imageUrl = article.image
        ? article.image.startsWith('http')
          ? article.image
          : `${baseUrl}${article.image}`
        : undefined;

      const modDate = new Date(article.updatedDate || article.publishDate || article.date || '2026-11-20');
      const safeModDate = Number.isNaN(modDate.getTime()) ? new Date('2026-11-20') : modDate;

      return {
        url: `${baseUrl}${getBlogUrl(article)}`,
        lastModified: safeModDate,
        changeFrequency: 'weekly',
        priority: 0.85,
        ...(imageUrl ? { images: [imageUrl] } : {}),
      };
    });

  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((cat) => cat.slug !== 'home')
    .map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.75,
    }));

  return [...staticPages, ...focusPages, ...articlePages, ...categoryPages];
}
