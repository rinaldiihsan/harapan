'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { CalendarDays, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: number;
  news_title: string;
  news_slug: string;
  news_content: string;
  news_images: string[];
  createdAt: string;
}

export default function BeritaClient() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('/api/news');
        const data: NewsItem[] = res.data.data ?? [];
        const sorted = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNewsList(sorted);
      } catch {
        setError('Gagal memuat data berita');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength).trimEnd() + '...';
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 animate-pulse">
            <div className="aspect-video rounded-2xl bg-gray-200" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primaryGreen-700 text-white rounded-lg hover:bg-primaryGreen-800 transition-colors">
          Coba Lagi
        </button>
      </div>
    );
  }

  if (newsList.length === 0) {
    return <div className="text-center py-20 text-gray-500">Belum ada berita yang tersedia</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {newsList.map((news) => (
        <Link key={news.id} href={`/berita/${news.news_slug}`} className="group flex flex-col gap-y-3 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
          {/* Thumbnail */}
          <div className="aspect-video overflow-hidden">
            {news.news_images.length > 0 ? (
              <img src={news.news_images[0]} alt={news.news_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Tidak ada gambar</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-y-2 p-4 pb-5">
            {/* Tanggal */}
            <div className="flex items-center gap-x-1.5 text-xs text-gray-400">
              <CalendarDays size={13} />
              <span>
                {new Date(news.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            {/* Judul */}
            <h2 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-primaryGreen-700 transition-colors">{news.news_title}</h2>

            {/* Excerpt */}
            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{truncateContent(news.news_content)}</p>

            {/* CTA */}
            <div className="flex items-center gap-x-1 text-sm font-medium text-primaryGreen-700 mt-1 group-hover:gap-x-2 transition-all">
              <span>Baca Selengkapnya</span>
              <ChevronRight size={15} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
