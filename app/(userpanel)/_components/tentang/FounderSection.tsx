'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Founder {
  id: number;
  name: string;
  photo: string;
  order: number;
}

export default function FounderSection() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const res = await fetch('/api/founder');
        const data = await res.json();
        setFounders(data.data ?? []);
      } catch (error) {
        console.error('Error fetching founders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFounders();
  }, []);

  if (!isLoading && founders.length === 0) return null;

  return (
    <section className="bg-gray-100 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-14 text-black">Sebelas Pendiri Yayasan</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {isLoading
            ? [...Array(11)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-y-3">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                </div>
              ))
            : founders.map((f) => (
                <div key={f.id} className="flex flex-col items-center gap-y-3">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-primaryGreen-700 shadow-lg flex-none">
                    <Image src={f.photo} alt={f.name} fill sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px" className="object-cover" />
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-center text-primaryGreen-700">{f.name}</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
