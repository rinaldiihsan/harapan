import type { Metadata } from 'next';
import BeritaDetailClient from '../../_components/berita/BeritaDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Gunakan revalidate bukan no-store agar konsisten dengan route API
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/news/slug/${params.slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return { title: 'Berita' };

    const data = await res.json();
    const news = data.data;

    return {
      title: news?.news_title ?? 'Berita',
      openGraph: {
        title: news?.news_title,
        images: news?.news_images?.[0] ? [{ url: news.news_images[0] }] : [],
      },
    };
  } catch {
    return { title: 'Berita' };
  }
}

export default function BeritaDetailPage({ params }: Props) {
  return <BeritaDetailClient slug={params.slug} />;
}
