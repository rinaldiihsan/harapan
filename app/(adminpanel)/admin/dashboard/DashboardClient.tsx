'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Images, GalleryHorizontal, CircleHelp, UserRound } from 'lucide-react';

interface ActivityItem {
  label: string;
  value: string;
  updatedAt: string | null;
  icon: React.ReactNode;
}

interface DashboardStats {
  news: { count: number; updatedAt: string | null };
  gallery: { count: number; updatedAt: string | null };
  carousel: { count: number; updatedAt: string | null };
  faq: { count: number; updatedAt: string | null };
  ketuaYayasan: { count: number; updatedAt: string | null };
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Selamat Pagi';
  if (hour >= 12 && hour < 15) return 'Selamat Siang';
  if (hour >= 15 && hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
};

const formatLoginTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatRelativeTime = (isoString: string): string => {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays === 1) return 'Kemarin';
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function DashboardClient() {
  const [loginTime, setLoginTime] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    news: { count: 0, updatedAt: null },
    gallery: { count: 0, updatedAt: null },
    carousel: { count: 0, updatedAt: null },
    faq: { count: 0, updatedAt: null },
    ketuaYayasan: { count: 0, updatedAt: null },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('loginTime');
    if (stored) setLoginTime(stored);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);

      const [newsRes, galleryRes, carouselRes, faqRes, ketuaRes] = await Promise.all([fetch('/api/news'), fetch('/api/gallery'), fetch('/api/carousel'), fetch('/api/faq'), fetch('/api/ketuayayasan')]);

      const [newsData, galleryData, carouselData, faqData, ketuaData] = await Promise.all([newsRes.json(), galleryRes.json(), carouselRes.json(), faqRes.json(), ketuaRes.json()]);

      // Ambil updatedAt terbaru dari masing-masing fitur
      const getLatestUpdatedAt = (items: any[]): string | null => {
        if (!items || items.length === 0) return null;
        return items.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0].updatedAt;
      };

      setStats({
        news: {
          count: newsData.data?.length ?? 0,
          updatedAt: getLatestUpdatedAt(newsData.data ?? []),
        },
        gallery: {
          count: galleryData.data?.length ?? 0,
          updatedAt: getLatestUpdatedAt(galleryData.data ?? []),
        },
        carousel: {
          count: carouselData.data?.length ?? 0,
          updatedAt: getLatestUpdatedAt(carouselData.data ?? []),
        },
        faq: {
          count: faqData.data?.length ?? 0,
          updatedAt: getLatestUpdatedAt(faqData.data ?? []),
        },
        ketuaYayasan: {
          count: ketuaData.data?.length ?? 0,
          updatedAt: getLatestUpdatedAt(ketuaData.data ?? []),
        },
      });
    } catch (error) {
      console.error('Gagal memuat statistik:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Berita',
      count: stats.news.count,
      icon: <Newspaper size={20} className="text-primaryGreen-700" />,
    },
    {
      label: 'Galeri',
      count: stats.gallery.count,
      icon: <Images size={20} className="text-primaryGreen-700" />,
    },
    {
      label: 'Carousel',
      count: stats.carousel.count,
      icon: <GalleryHorizontal size={20} className="text-primaryGreen-700" />,
    },
    {
      label: 'FAQ',
      count: stats.faq.count,
      icon: <CircleHelp size={20} className="text-primaryGreen-700" />,
    },
    {
      label: 'Ketua Yayasan',
      count: stats.ketuaYayasan.count,
      icon: <UserRound size={20} className="text-primaryGreen-700" />,
    },
  ];

  const activityItems: ActivityItem[] = [
    {
      label: 'Berita',
      value: `${stats.news.count} data`,
      updatedAt: stats.news.updatedAt,
      icon: <Newspaper size={16} className="text-primaryGreen-700" />,
    },
    {
      label: 'Galeri',
      value: `${stats.gallery.count} data`,
      updatedAt: stats.gallery.updatedAt,
      icon: <Images size={16} className="text-primaryGreen-700" />,
    },
    {
      label: 'Carousel',
      value: `${stats.carousel.count} data`,
      updatedAt: stats.carousel.updatedAt,
      icon: <GalleryHorizontal size={16} className="text-primaryGreen-700" />,
    },
    {
      label: 'FAQ',
      value: `${stats.faq.count} data`,
      updatedAt: stats.faq.updatedAt,
      icon: <CircleHelp size={16} className="text-primaryGreen-700" />,
    },
    {
      label: 'Ketua Yayasan',
      value: `${stats.ketuaYayasan.count} data`,
      updatedAt: stats.ketuaYayasan.updatedAt,
      icon: <UserRound size={16} className="text-primaryGreen-700" />,
    },
  ]
    // Sort by updatedAt terbaru
    .filter((item) => item.updatedAt !== null)
    .sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime());

  return (
    <div className="pt-16 space-y-6">
      {/* Greeting */}
      <div className="bg-white rounded-lg border border-gray-200 px-6 py-5">
        <h1 className="text-xl font-semibold text-black">{getGreeting()}, Admin!</h1>
        {loginTime && <p className="text-sm text-gray-500 mt-1">Login terakhir: {formatLoginTime(loginTime)}</p>}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <Card key={card.label} className="border border-gray-200 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-black">{card.label}</CardTitle>
              <div className="bg-primaryGreen-100 p-1.5 rounded-md">{card.icon}</div>
            </CardHeader>
            <CardContent className="px-4 pb-4">{isLoading ? <div className="h-7 w-12 bg-gray-100 rounded animate-pulse" /> : <p className="text-2xl font-bold text-black">{card.count}</p>}</CardContent>
          </Card>
        ))}
      </div>

      {/* Aktivitas Terbaru */}
      <Card className="border border-gray-200 shadow-none">
        <CardHeader className="px-6 pt-5 pb-3">
          <CardTitle className="text-base font-semibold text-black">Aktivitas Terbaru</CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">Berdasarkan data yang terakhir diperbarui</p>
        </CardHeader>
        <CardContent className="px-6 pb-5">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : activityItems.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada aktivitas</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {activityItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primaryGreen-100 p-1.5 rounded-md">{item.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-black">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.value}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{item.updatedAt ? formatRelativeTime(item.updatedAt) : '-'}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
