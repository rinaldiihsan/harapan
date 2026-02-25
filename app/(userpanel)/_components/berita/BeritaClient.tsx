'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { CalendarDays, ChevronRight, ChevronLeft } from 'lucide-react';

interface NewsItem {
  id: number;
  news_title: string;
  news_slug: string;
  // news_content tidak ada lagi di list response
  news_images: string[];
  createdAt: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function BeritaClient() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async (currentPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/news?page=${currentPage}&limit=9`);
      // API sudah sort by createdAt desc, tidak perlu sort ulang di frontend
      setNewsList(res.data.data ?? []);
      setMeta(res.data.meta ?? null);
    } catch {
      setError('Gagal memuat data berita');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(page);
  }, [page, fetchNews]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 animate-pulse">
            <div className="aspect-video rounded-2xl bg-gray-200" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-full" />
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
        <button onClick={() => fetchNews(page)} className="px-6 py-2 bg-primaryGreen-700 text-white rounded-lg hover:bg-primaryGreen-800 transition-colors">
          Coba Lagi
        </button>
      </div>
    );
  }

  if (newsList.length === 0) {
    return <div className="text-center py-20 text-gray-500">Belum ada berita yang tersedia</div>;
  }

  return (
    <div className="flex flex-col gap-y-10">
      {/* Grid Berita */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {newsList.map((news) => (
          <Link key={news.id} href={`/berita/${news.news_slug}`} className="group flex flex-col gap-y-3 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
            {/* Thumbnail */}
            <div className="aspect-video overflow-hidden relative">
              {news.news_images.length > 0 ? (
                <Image src={news.news_images[0]} alt={news.news_title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
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

              {/* CTA */}
              <div className="flex items-center gap-x-1 text-sm font-medium text-primaryGreen-700 mt-1 group-hover:gap-x-2 transition-all">
                <span>Baca Selengkapnya</span>
                <ChevronRight size={15} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>

          {[...Array(meta.totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === pageNum ? 'bg-primaryGreen-700 text-white' : 'border border-gray-200 hover:bg-gray-50 text-gray-700'}`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={page === meta.totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Info total */}
      {meta && (
        <p className="text-center text-sm text-gray-400">
          Menampilkan {newsList.length} dari {meta.total} berita
        </p>
      )}
    </div>
  );
}
