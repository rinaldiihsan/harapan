'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Copy, Facebook, Instagram, ChevronLeft, Share2, ChevronLeft as Prev, ChevronRight as Next } from 'lucide-react';

interface NewsItem {
  id: number;
  news_title: string;
  news_slug: string;
  news_content: string;
  news_images: string[];
  createdAt: string;
  // updatedAt dihapus — tidak ada di response API slug
}

interface Props {
  slug: string;
}

export default function BeritaDetailClient({ slug }: Props) {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openLightbox, setOpenLightbox] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`/api/news/slug/${slug}`);
        setNews(res.data.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setNotFoundState(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [slug]);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    toast.success('Link berhasil disalin!');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank');
  };

  const handleShareInstagram = () => {
    navigator.clipboard.writeText(pageUrl);
    toast.success('Link disalin! Buka Instagram dan bagikan melalui Stories atau DM.');
  };

  const handlePrevImage = () => {
    if (!news) return;
    setSelectedImageIndex((prev) => (prev === 0 ? news.news_images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!news) return;
    setSelectedImageIndex((prev) => (prev === news.news_images.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="aspect-video bg-gray-200 rounded-2xl" />
          <div className="flex flex-col gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFoundState || !news) return notFound();

  const ShareButtons = () => (
    <div className="flex items-center gap-x-2">
      <span className="text-sm text-gray-500 flex items-center gap-x-1">
        <Share2 size={14} />
        Bagikan:
      </span>
      <button onClick={handleCopyLink} title="Salin link" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
        <Copy size={16} />
      </button>
      <button onClick={handleShareFacebook} title="Bagikan ke Facebook" className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors">
        <Facebook size={16} />
      </button>
      <button onClick={handleShareInstagram} title="Bagikan ke Instagram" className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors">
        <Instagram size={16} />
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back */}
      <Link href="/berita" className="inline-flex items-center gap-x-1 text-sm text-primaryGreen-700 hover:text-primaryGreen-800 font-medium mb-8 transition-colors">
        <ChevronLeft size={18} />
        Kembali ke list berita
      </Link>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">{news.news_title}</h1>

      {/* Meta */}
      <div className="flex items-center justify-between flex-wrap gap-y-3 mb-8">
        <p className="text-sm text-gray-500">
          {new Date(news.createdAt).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <ShareButtons />
      </div>

      {/* Image Section */}
      {news.news_images.length > 0 && (
        <div className="mb-10">
          {/* Main Image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-md cursor-zoom-in mb-3" onClick={() => setOpenLightbox(true)}>
            <Image src={news.news_images[selectedImageIndex]} alt={news.news_title} fill priority sizes="(max-width: 768px) 100vw, 896px" className="object-cover transition-all duration-300" />
            {news.news_images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                {selectedImageIndex + 1} / {news.news_images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {news.news_images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {news.news_images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-none w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === idx ? 'border-primaryGreen-700 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <div className="relative w-full h-full">
                    <Image src={img} alt={`foto ${idx + 1}`} fill className="object-cover" sizes="80px" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-base max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{news.news_content}</div>

      {/* Share Bottom — tanpa updatedAt karena tidak ada di response */}
      <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-end">
        <ShareButtons />
      </div>

      {/* Lightbox */}
      <Dialog open={openLightbox} onOpenChange={setOpenLightbox}>
        <DialogContent className="max-w-4xl p-2 bg-black/95 border-none">
          <div className="relative flex items-center justify-center">
            <div className="relative max-h-[85vh] w-full">
              <Image src={news.news_images[selectedImageIndex]} alt={news.news_title} width={1200} height={800} className="max-h-[85vh] w-auto mx-auto object-contain rounded-lg" />
            </div>

            {news.news_images.length > 1 && (
              <>
                <button onClick={handlePrevImage} className="absolute left-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                  <Prev size={22} />
                </button>
                <button onClick={handleNextImage} className="absolute right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                  <Next size={22} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs px-3 py-1 rounded-full">
                  {selectedImageIndex + 1} / {news.news_images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
