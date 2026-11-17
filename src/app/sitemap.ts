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
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/category/clean-snacks`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/category`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/write-for-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  const focusPages: MetadataRoute.Sitemap = FOCUS_SLUGS.map((slug) => ({
    url: `${baseUrl}/focus/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}${getBlogUrl(article)}`,
    lastModified: new Date(article.date || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

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
