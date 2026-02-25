'use client';

import { useEffect, useRef } from 'react';

interface Props {
  backgroundImage: string;
  subtitle: string;
  title?: string;
}

export default function ParallaxHeroPendidikan({ backgroundImage, subtitle, title = 'Yayasan Pendidikan Harapan' }: Props) {
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
      <div ref={bgRef} className="absolute inset-0 bg-cover bg-center scale-110" style={{ backgroundImage: `url('${backgroundImage}')` }} />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-y-2">
        <h2 className="text-white text-lg lg:text-xl xl:text-2xl font-semibold uppercase">{subtitle}</h2>
        <h1 className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
