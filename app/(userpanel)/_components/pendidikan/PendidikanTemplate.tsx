import { Book, Award, Target, Cpu, Users, Globe, Instagram } from 'lucide-react';
import Link from 'next/link';
import ParallaxHeroPendidikan from './ParallaxHeroPendidikan';

export type TingkatanSekolah = 'sd' | 'smp' | 'sma';

export interface SosmedData {
  instagram?: string;
  instagramUrl?: string;
  website?: string;
  websiteUrl?: string;
}

export interface PendidikanData {
  // Hero
  backgroundImage: string;
  namaSekolah: string;
  tingkatan: TingkatanSekolah;

  // Sejarah
  akreditasi: string;
  deskripsiSejarah: string;

  // Kepala Sekolah
  namaKepalaSekolah: string;

  // Visi Misi
  visi: string;
  misi: string[];

  // Program Unggulan
  programUnggulan: string[];

  // Fasilitas
  fasilitas: string[];

  // Ekstrakurikuler (opsional)
  ekstrakurikuler?: string[];

  // Kegiatan Sekolah
  kegiatanSekolah: string[];

  // Sosmed (opsional)
  sosmed?: SosmedData;
}

// Warna per tingkatan
const themeConfig = {
  sd: {
    primary: 'bg-red-600',
    primaryText: 'text-black',
    primaryLight: 'bg-red-100',
    primaryHover: 'hover:bg-red-600',
    primaryBorder: 'border-red-600',
    sectionBg: 'bg-gradient-to-b from-[#FFFCFC] to-[#FFEBE9]',
    badge: 'bg-red-600 text-white',
    cardAccent: 'bg-red-600 text-white',
  },
  smp: {
    primary: 'bg-blue-600',
    primaryText: 'text-black',
    primaryLight: 'bg-blue-100',
    primaryHover: 'hover:bg-blue-600',
    primaryBorder: 'border-blue-600',
    sectionBg: 'bg-gradient-to-b from-[#F0F4FF] to-[#E8EEFF]',
    badge: 'bg-blue-600 text-white',
    cardAccent: 'bg-blue-600 text-white',
  },
  sma: {
    primary: 'bg-primaryGreen-700',
    primaryText: 'text-black',
    primaryLight: 'bg-primaryGreen-200',
    primaryHover: 'hover:bg-primaryGreen-700',
    primaryBorder: 'border-primaryGreen-700',
    sectionBg: 'bg-gradient-to-b from-[#F0FFF4] to-[#E6FFE6]',
    badge: 'bg-primaryGreen-700 text-white',
    cardAccent: 'bg-primaryGreen-700 text-white',
  },
};

interface Props {
  data: PendidikanData;
}

export default function PendidikanTemplate({ data }: Props) {
  const theme = themeConfig[data.tingkatan];
  const hasEkstrakurikuler = data.ekstrakurikuler && data.ekstrakurikuler.length > 0;
  const hasSosmed = data.sosmed && (data.sosmed.instagram || data.sosmed.website);

  return (
    <>
      <ParallaxHeroPendidikan backgroundImage={data.backgroundImage} subtitle={data.namaSekolah} />

      <section className={`flex flex-col px-4 lg:px-32 py-16 gap-y-16 ${theme.sectionBg}`}>
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-y-16">
          {/* Sejarah & Kepala Sekolah */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg  transition duration-300 hover:-translate-y-1 flex flex-col gap-y-4">
              <Book className={`w-12 h-12 ${theme.primaryText}`} />
              <h2 className={`text-2xl font-semibold ${theme.primaryText}`}>Sejarah</h2>
              <p className="text-gray-700 leading-relaxed">{data.deskripsiSejarah}</p>
              <div className={`${theme.badge} px-4 py-2 rounded-full inline-block self-start`}>
                <span className="font-bold">Akreditasi: {data.akreditasi}</span>
              </div>
            </div>
            <div className={`${theme.cardAccent} p-8 rounded-xl shadow-lg  transition duration-300 hover:-translate-y-1 flex flex-col gap-y-4`}>
              <Users className="w-12 h-12" />
              <h2 className="text-2xl font-semibold">Kepala Sekolah</h2>
              <p className="text-xl font-medium">{data.namaKepalaSekolah}</p>
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="bg-white p-8 rounded-xl shadow-lg  transition duration-300">
            <h2 className={`text-3xl font-semibold mb-8 ${theme.primaryText} text-center`}>Visi dan Misi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-6 ${theme.primary} rounded-xl text-white flex flex-col gap-y-3`}>
                <h3 className="text-2xl font-medium">Visi</h3>
                <p className="italic leading-relaxed">"{data.visi}"</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl flex flex-col gap-y-3">
                <h3 className={`text-2xl font-medium ${theme.primaryText}`}>Misi</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm sm:text-base">
                  {data.misi.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Program Unggulan */}
          <div className={`${theme.primaryLight} p-8 rounded-xl shadow-lg  transition duration-300`}>
            <h2 className={`text-3xl font-semibold mb-6 ${theme.primaryText} text-center flex items-center justify-center gap-x-2`}>
              <Award className="w-8 h-8" />
              Program Unggulan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.programUnggulan.map((program, idx) => (
                <div key={idx} className={`bg-white ${theme.primaryText} px-4 py-3 rounded-lg font-medium  transition duration-300 shadow-md  text-center ${theme.primaryHover} hover:text-white`}>
                  {program}
                </div>
              ))}
            </div>
          </div>

          {/* Fasilitas */}
          <div className={`${theme.primaryLight} p-8 rounded-xl shadow-lg  transition duration-300`}>
            <h2 className={`text-3xl font-semibold mb-6 ${theme.primaryText} text-center flex items-center justify-center gap-x-2`}>
              <Cpu className="w-8 h-8" />
              Fasilitas Sekolah
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
              {data.fasilitas.map((item, idx) => (
                <div key={idx} className={`bg-white p-3 rounded-lg ${theme.primaryText} text-sm text-center ${theme.primaryHover} hover:text-white transition duration-300 shadow-md`}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Ekstrakurikuler & Kegiatan — dinamis */}
          <div className={`grid gap-8 ${hasEkstrakurikuler ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Ekstrakurikuler — hanya tampil kalau ada */}
            {hasEkstrakurikuler && (
              <div className="bg-white p-8 rounded-xl shadow-lg  transition duration-300">
                <h2 className={`text-2xl font-semibold mb-6 ${theme.primaryText} flex items-center gap-x-2`}>
                  <Target className="w-6 h-6" />
                  Ekstrakurikuler
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {data.ekstrakurikuler!.map((item, idx) => (
                    <div key={idx} className={`${theme.primaryLight} p-2 rounded-lg ${theme.primaryText} text-sm text-center ${theme.primaryHover} hover:text-white transition duration-300`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kegiatan Sekolah */}
            <div className="bg-white p-8 rounded-xl shadow-lg  transition duration-300">
              <h2 className={`text-2xl font-semibold mb-6 ${theme.primaryText} flex items-center gap-x-2`}>
                <Users className="w-6 h-6" />
                Kegiatan Sekolah
              </h2>
              <div className="space-y-3">
                {data.kegiatanSekolah.map((item, idx) => (
                  <div key={idx} className={`${theme.primaryLight} px-4 py-3 rounded-lg ${theme.primaryText} font-medium ${theme.primaryHover} hover:text-white transition duration-300 flex items-center gap-x-3`}>
                    <span className={`w-2.5 h-2.5 rounded-full flex-none ${theme.primary}`} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sosmed — hanya tampil kalau ada */}
          {hasSosmed && (
            <div className="bg-white p-8 rounded-xl shadow-lg  transition duration-300">
              <h2 className={`text-3xl font-semibold mb-6 ${theme.primaryText} text-center flex items-center justify-center gap-x-2`}>
                <Globe className="w-8 h-8" />
                Kunjungi Kami Online
              </h2>
              <div className={`grid gap-6 ${data.sosmed?.instagram && data.sosmed?.website ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-1 max-w-xs mx-auto'}`}>
                {/* Instagram */}
                {data.sosmed?.instagram && (
                  <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-6 rounded-xl flex flex-col items-center gap-y-4  transition duration-300">
                    <Instagram className="w-12 h-12" />
                    <h3 className="text-xl font-semibold">Instagram</h3>
                    <Link href={data.sosmed.instagramUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="bg-white text-purple-600 px-5 py-2 rounded-full font-medium text-sm">
                      {data.sosmed.instagram}
                    </Link>
                  </div>
                )}

                {/* Website */}
                {data.sosmed?.website && (
                  <div className={`bg-blue-600 text-white p-6 rounded-xl flex flex-col items-center gap-y-4  transition duration-300`}>
                    <Globe className="w-12 h-12" />
                    <h3 className="text-xl font-semibold">Website</h3>
                    <Link href={data.sosmed.websiteUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium text-sm">
                      {data.sosmed.website}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
