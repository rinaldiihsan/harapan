'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  images: string[];
}

interface ApiGalleryItem {
  id: number;
  gallery_title: string;
  gallery_category: string;
  gallery_image: string[];
}

export default function GalleryClient() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const fetchGalleryData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get('/api/gallery');
      const data: ApiGalleryItem[] = res.data.data ?? [];

      // Transform sekali saat fetch, tidak perlu state visibleItems terpisah
      const transformed: GalleryItem[] = data.map((item) => ({
        id: item.id,
        title: item.gallery_title,
        category: item.gallery_category,
        images: item.gallery_image,
      }));

      setGalleryItems(transformed);
    } catch {
      setError('Gagal memuat data galeri');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData]);

  // Gunakan useMemo agar filter tidak diulang setiap render
  const categories = useMemo(() => ['Semua', ...Array.from(new Set(galleryItems.map((item) => item.category)))], [galleryItems]);

  const visibleItems = useMemo(() => (activeCategory === 'Semua' ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)), [activeCategory, galleryItems]);

  const handleCardClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setSelectedImageIndex(0);
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    setSelectedImageIndex((prev) => (prev === 0 ? selectedItem.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!selectedItem) return;
    setSelectedImageIndex((prev) => (prev === selectedItem.images.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={fetchGalleryData} className="px-6 py-2 bg-primaryGreen-700 text-white rounded-lg hover:bg-primaryGreen-800 transition-colors">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Filter Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`text-sm md:text-base px-5 py-2 rounded-full transition-colors ${activeCategory === category ? 'bg-primaryGreen-700 text-white font-medium shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {visibleItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500">Belum ada foto di kategori ini</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleItems.map((item, index) => (
            <div key={item.id} onClick={() => handleCardClick(item)} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="aspect-video relative">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  // 3 item pertama priority karena langsung terlihat
                  priority={index < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs mb-2">{item.category}</span>
                  <h3 className="text-white text-base md:text-lg font-semibold line-clamp-2">{item.title}</h3>
                  {item.images.length > 1 && <p className="text-white/70 text-xs mt-1">{item.images.length} foto</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Preview */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl p-3">
          {selectedItem && (
            <div className="flex flex-col gap-3">
              {/* Main Image */}
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image src={selectedItem.images[selectedImageIndex]} alt={selectedItem.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="inline-block px-2 py-0.5 bg-primaryGreen-700 rounded-full text-white text-xs mb-1">{selectedItem.category}</span>
                  <h3 className="text-white font-semibold text-base">{selectedItem.title}</h3>
                </div>

                {/* Nav arrows jika lebih dari 1 gambar */}
                {selectedItem.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {selectedImageIndex + 1} / {selectedItem.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {selectedItem.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {selectedItem.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-none w-16 h-16 rounded-lg overflow-hidden border-2 transition-all relative ${selectedImageIndex === idx ? 'border-primaryGreen-700' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <Image src={img} alt={`foto ${idx + 1}`} fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
