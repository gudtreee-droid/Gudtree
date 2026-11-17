import { MetadataRoute } from 'next';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/wp-admin', '/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'Google-Extended',
          'Anthropic-AI',
          'Claude-Web',
          'CCBot',
          'PerplexityBot',
          'Applebot-Extended',
          'Bingbot',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin', '/wp-admin', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
