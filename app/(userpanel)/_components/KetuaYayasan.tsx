'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface KetuaYayasanData {
  id: number;
  yayasanName: string;
  yayasanDesc: string;
  yayasanImage: string | null;
}

export default function KetuaYayasan() {
  const [data, setData] = useState<KetuaYayasanData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/ketuayayasan');
        const list = res.data.data ?? [];
        if (list.length > 0) setData(list[0]);
      } catch (error) {
        console.error('Error fetching ketua yayasan:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-64 bg-gray-200 animate-pulse rounded-xl" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="w-32 md:w-64 h-1.5 bg-primaryYellow-600" />
          <h1 className="uppercase text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-end">Prakata Ketua Yayasan</h1>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-14 xl:gap-x-24">
          <div className="flex flex-col gap-y-4 flex-1">
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold uppercase text-center md:text-start">{data?.yayasanName ?? 'Dr. Tapi Rondang Ni Bulan, S.E., M.Si'}</h2>
            <p className="text-sm md:text-base xl:text-lg text-justify leading-relaxed">
              {data?.yayasanDesc ??
                'Puji syukur kami panjatkan kepada Allah SWT atas limpahan rahmat dan karunia-Nya. Dengan semangat iman, ilmu, dan amal, Yayasan Pendidikan Harapan terus berkomitmen untuk memberikan pendidikan terbaik, membentuk generasi yang berintegritas dan berakhlak mulia.'}
            </p>
          </div>
          <img
            src={data?.yayasanImage ?? '/ketua-yayasan.jpg'}
            alt={data?.yayasanName ?? 'Ketua Yayasan'}
            className="w-full md:w-[22rem] lg:w-[23rem] xl:w-[32rem] md:h-[22rem] lg:h-[23rem] xl:h-[32rem] rounded-3xl object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
