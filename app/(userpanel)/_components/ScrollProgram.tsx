'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface ProgramUnggulan {
  id: number;
  name: string;
  photo: string;
  order: number;
}

export default function ScrollProgram() {
  const [programs, setPrograms] = useState<ProgramUnggulan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get('/api/program-unggulan');
        // API sudah sort by order asc dari DB, tidak perlu sort ulang
        setPrograms(res.data.data ?? []);
      } catch (error) {
        console.error('Error fetching program unggulan:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 text-center">
          <span className="hidden md:block md:w-56 h-1.5 bg-primaryYellow-600" />
          <h1 className="uppercase text-xl md:text-2xl xl:text-3xl font-bold">Program Unggulan Yaspendhar</h1>
          <span className="hidden md:block md:w-56 h-1.5 bg-primaryYellow-600" />
        </div>

        {/* Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-y-3">
                <div className="w-full aspect-square rounded-xl bg-gray-200 animate-pulse" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : programs.length === 0 ? null : (
          <Carousel opts={{ align: 'start', loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {programs.map((program) => (
                <CarouselItem key={program.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <figure className="flex flex-col gap-y-3">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                      <Image src={program.photo} alt={program.name} fill sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover object-center" draggable={false} />
                    </div>
                    <figcaption className="uppercase font-medium text-center text-lg md:text-base">{program.name}</figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
}
