'use client';

import { useEffect, useState } from 'react';
import ImageModal from './ImageModal';

interface StrukturOrganisasi {
  id: number;
  image: string;
  description: string;
}

export default function StrukturSection() {
  const [data, setData] = useState<StrukturOrganisasi | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        const res = await fetch('/api/struktur-organisasi');
        const json = await res.json();
        setData(json.data ?? null);
      } catch (error) {
        console.error('Error fetching struktur:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStruktur();
  }, []);

  // Fallback ke gambar static kalau belum ada di DB
  const imageUrl = data?.image ?? '/struktur-organisasi.png';

  return (
    <section className="bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-black">Struktur Yayasan</h1>
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-stretch">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="bg-primaryGreen-700 p-4 sm:p-6 rounded-lg shadow-md text-white">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Organisasi Kami</h2>
              <p className="text-sm sm:text-base leading-relaxed">
                {data?.description ||
                  'Struktur organisasi Yayasan Pendidikan Harapan Medan dirancang untuk memastikan efisiensi dan efektivitas dalam menjalankan misi pendidikan kami. Dipimpin oleh Dewan Pembina yang berpengalaman, yayasan ini memiliki jajaran pengurus yang kompeten dan berdedikasi.'}
              </p>
            </div>
            <div className="bg-primaryYellow-700 p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4">Komponen Utama</h2>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-black">
                <li>Dewan Pembina: Memberikan arahan strategis</li>
                <li>Dewan Pengawas: Memastikan akuntabilitas dan transparansi</li>
                <li>Dewan Pengurus: Menjalankan operasional yayasan</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primaryGreen-700 mb-3 sm:mb-4">Komitmen Kami</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Setiap bagian dalam struktur organisasi kami memiliki peran dan tanggung jawab yang jelas, mulai dari pengembangan kurikulum, manajemen sumber daya, hingga hubungan masyarakat.
              </p>
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto">
            {isLoading ? (
              <div className="w-full aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
            ) : (
              <div className="w-full aspect-[3/4]">
                <ImageModal imageUrl={imageUrl} altText="Struktur Organisasi Yayasan" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
