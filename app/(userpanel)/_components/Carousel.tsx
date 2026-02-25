'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface CarouselItem {
  id: number;
  carousel_image: string;
  carousel_caption: string;
  carousel_desc: string;
}

export default function HeroCarousel() {
  const [carousels, setCarousels] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const res = await axios.get('/api/carousel');
        const data = res.data.data ?? [];
        const sorted = [...data].sort((a: CarouselItem, b: CarouselItem) => b.id - a.id).slice(0, 3);
        setCarousels(sorted);
      } catch (error) {
        console.error('Error fetching carousel:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarousels();
  }, []);

  if (isLoading) {
    return <div className="w-full h-[40vh] lg:h-[668px] xl:h-[778px] bg-gray-200 animate-pulse" />;
  }

  if (carousels.length === 0) return null;

  return (
    <section className="w-full">
      <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]} className="w-full">
        <CarouselContent>
          {carousels.map((carousel) => (
            <CarouselItem key={carousel.id}>
              <div className="relative w-full h-[40vh] lg:h-[668px] xl:h-[778px] overflow-hidden">
                <img src={carousel.carousel_image} alt={carousel.carousel_caption} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-4 px-4 text-center">
                  <h1 className="text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase max-w-4xl">{carousel.carousel_caption}</h1>
                  <p className="text-white text-sm md:text-lg lg:text-xl font-medium uppercase max-w-3xl">{carousel.carousel_desc}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 border-none text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 border-none text-white" />
      </Carousel>
    </section>
  );
}
