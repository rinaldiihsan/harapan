'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxHero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[668px] xl:h-[778px] overflow-hidden">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 bg-cover bg-center scale-110" style={{ backgroundImage: "url('/profile-yayasan.jpg')" }} />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-y-2">
        <h2 className="text-white text-lg lg:text-xl xl:text-2xl font-semibold">Tentang Kami</h2>
        <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold">Yayasan Pendidikan Harapan</h1>
      </div>
    </div>
  );
}
