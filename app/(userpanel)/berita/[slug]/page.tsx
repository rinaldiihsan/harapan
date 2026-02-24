import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BeritaDetailClient from '../../_components/berita/BeritaDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/news/slug/${params.slug}`, { cache: 'no-store' });
    const data = await res.json();
    return {
      title: data.data?.news_title ?? 'Berita',
    };
  } catch {
    return { title: 'Berita' };
  }
}

export default function BeritaDetailPage({ params }: Props) {
  return <BeritaDetailClient slug={params.slug} />;
}
