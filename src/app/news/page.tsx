import { permanentRedirect } from 'next/navigation';

interface NewsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === 'string') qs.set(k, v);
  }
  const queryString = qs.toString();
  permanentRedirect(queryString ? `/blog?${queryString}` : '/blog');
}
