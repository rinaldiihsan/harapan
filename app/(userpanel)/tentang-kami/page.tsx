import type { Metadata } from 'next';
import Image from 'next/image';
import ParallaxHero from '../_components/tentang/ParallaxHero';
import ImageModal from '../_components/tentang/ImageModal';
import FounderSection from '../_components/tentang/FounderSection';
import StrukturSection from '../_components/tentang/StrukturSection';

export const metadata: Metadata = {
  title: 'Tentang Kami',
};

export default function TentangKamiPage() {
  return (
    <>
      <ParallaxHero />

      {/* Sejarah */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-black">Sejarah Bercerita</h1>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Gambar */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl shadow-xl h-72 sm:h-96 lg:h-[36rem]">
                <Image src="/profile-yayasan.jpg" alt="Profile Yayasan" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-primaryGreen-700 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Yayasan Pendidikan Harapan</h3>
                  <p className="text-sm text-white/90 mt-1">Beriman, Berilmu, dan Beramal sejak 1967</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="w-full lg:w-1/2">
              <div className="relative flex flex-col gap-y-0">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primaryGreen-200" />

                <div className="relative flex gap-x-6 pb-10">
                  <div className="flex-none w-8 h-8 rounded-full bg-primaryGreen-700 border-4 border-white shadow flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 bg-primaryYellow-700 p-5 rounded-xl shadow-md">
                    <p className="text-xs font-semibold text-black/60 uppercase tracking-wide mb-1">4 Februari 1967</p>
                    <h2 className="text-lg sm:text-xl font-bold text-black mb-2">Cikal Bakal Yayasan</h2>
                    <p className="text-sm sm:text-base text-black leading-relaxed">
                      Sebelas pendiri visioner berkumpul di Kampus Imam Bonjol dengan cita-cita mulia: melahirkan generasi penerus yang Beriman, Berilmu, dan Beramal. Yayasan diresmikan oleh Pangkoanda Sumatera Bapak Letjen A.J Mokoginta
                      selaku Pelindung Yayasan.
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-x-6 pb-10">
                  <div className="flex-none w-8 h-8 rounded-full bg-primaryGreen-700 border-4 border-white shadow flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 bg-primaryGreen-700 p-5 rounded-xl shadow-md">
                    <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-1">26 September 1996</p>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Tonggak Perkembangan</h2>
                    <p className="text-sm sm:text-base text-white leading-relaxed">Peletakan batu pertama kampus baru, wujud nyata dari komitmen untuk memberikan ruang gerak dan kreativitas maksimal bagi peserta didik.</p>
                  </div>
                </div>

                <div className="relative flex gap-x-6 pb-10">
                  <div className="flex-none w-8 h-8 rounded-full bg-primaryGreen-700 border-4 border-white shadow flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 bg-primaryGreen-700 p-5 rounded-xl shadow-md">
                    <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-1">14 Juli 1999</p>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Peresmian Kampus Johor</h2>
                    <p className="text-sm sm:text-base text-white leading-relaxed">Peresmian Kampus Johor oleh Jenderal Achmad Tahir, menandai era baru dalam pendidikan di Medan.</p>
                  </div>
                </div>

                <div className="relative flex gap-x-6">
                  <div className="flex-none w-8 h-8 rounded-full bg-primaryGreen-700 border-4 border-white shadow flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 bg-gray-100 p-5 rounded-xl shadow-md">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Hingga Saat Ini</p>
                    <h2 className="text-lg sm:text-xl font-bold text-primaryGreen-700 mb-2">Perjalanan Berkelanjutan</h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      Yayasan Pendidikan Harapan Medan terus berkomitmen untuk menjaga kualitas pendidikan dan mengembangkan potensi setiap peserta didiknya. Dengan Ridho-Nya yang senantiasa menyertai, yayasan ini terus melangkah maju
                      membentuk generasi penerus bangsa yang unggul dalam iman, ilmu, dan amal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi Tujuan */}
      <section className="bg-gray-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-14 text-black">Visi, Misi, dan Tujuan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div className="bg-primaryGreen-700 p-6 rounded-2xl shadow-md text-white h-full">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 pb-3 border-b border-white/20">Visi</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Menjadi lembaga pendidikan terkemuka yang menghasilkan generasi beriman, berilmu, dan beramal. Kami berkomitmen mempersiapkan peserta didik menghadapi tantangan global dengan tetap berpegang teguh pada nilai-nilai luhur
                bangsa Indonesia. Melalui pendidikan holistik dan berkualitas, kami bertujuan membentuk pemimpin masa depan yang unggul dalam pengetahuan sekaligus kuat dalam karakter.
              </p>
            </div>
            <div className="bg-primaryYellow-700 p-6 rounded-2xl shadow-md h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-3 border-b border-black/10">Misi</h3>
              <ul className="space-y-2 text-sm sm:text-base text-black">
                {[
                  'Menyelenggarakan pendidikan berkualitas yang mengintegrasikan nilai-nilai keimanan, keilmuan, dan pengamalan.',
                  'Mengembangkan potensi peserta didik secara holistik melalui program akademik dan non-akademik yang inovatif.',
                  'Membangun kerjasama dengan berbagai pihak untuk meningkatkan mutu pendidikan dan relevansi lulusan.',
                  'Menciptakan lingkungan belajar yang kondusif, inklusif, dan berwawasan global.',
                ].map((item) => (
                  <li key={item} className="flex gap-x-2">
                    <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full bg-black/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-primaryGreen-700 mb-4 pb-3 border-b border-gray-100">Tujuan</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                {[
                  'Menghasilkan lulusan yang berakhlak mulia, berpengetahuan luas, dan terampil.',
                  'Meningkatkan kualitas pendidikan secara berkelanjutan melalui inovasi dan pengembangan.',
                  'Memberikan kontribusi nyata bagi kemajuan masyarakat dan bangsa Indonesia.',
                  'Mengembangkan institusi pendidikan yang mandiri, akuntabel, dan berdaya saing tinggi.',
                ].map((item) => (
                  <li key={item} className="flex gap-x-2">
                    <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full bg-primaryGreen-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pendiri — fetch dari API */}
      <FounderSection />

      {/* Institusi Pendidikan */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-14 text-black">Institusi Pendidikan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div className="bg-primaryYellow-700 p-6 rounded-2xl shadow-md">
              <h3 className="text-lg sm:text-xl font-bold mb-4 pb-3 border-b border-black/10 text-black">Pra Sekolah & Pendidikan Dasar</h3>
              <ul className="space-y-2 text-sm sm:text-base text-black">
                {['TK HARAPAN 1 (1967)', 'TK HARAPAN 2 (1999)', 'SD HARAPAN 1 (1967)', 'SD HARAPAN 2 (1973)', 'SD HARAPAN 3 (1999)'].map((item) => (
                  <li key={item} className="flex gap-x-2 items-center">
                    <span className="flex-none w-1.5 h-1.5 rounded-full bg-black/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primaryGreen-700 p-6 rounded-2xl shadow-md text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-4 pb-3 border-b border-white/20">Pendidikan Menengah</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                {['SMP HARAPAN 1 (1967)', 'SMP HARAPAN 2 (1975)', 'SMP HARAPAN 3 (2001)', 'SMA HARAPAN 1 (1969)', 'SMA HARAPAN 2 (2004)'].map((item) => (
                  <li key={item} className="flex gap-x-2 items-center">
                    <span className="flex-none w-1.5 h-1.5 rounded-full bg-white/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
              <h3 className="text-lg sm:text-xl font-bold mb-4 pb-3 border-b border-gray-200 text-primaryGreen-700">Perguruan Tinggi</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                {['UNIVERSITAS HARAPAN MEDAN', 'ASM (1974) - STIF (1989) - FEB (2017)', 'ABA (1969) - STBA (1987) - FBK (2017)', 'ATH (1981) - STTH (1989) - FTK (2017)', 'FH (2017)'].map((item) => (
                  <li key={item} className="flex gap-x-2 items-start">
                    <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full bg-primaryGreen-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Yayasan — fetch dari API */}
      <StrukturSection />

      {/* Mars Harapan */}
      <section className="bg-gray-100 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8 gap-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black">Mars Harapan</h2>
            <p className="text-sm sm:text-base text-gray-600">Cipt: Abdullah Siagian</p>
          </div>
          <div className="w-full max-w-3xl mx-auto mb-8">
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/Cwjq0Ky8Fo8?si=FjtcOowsCmzse9lI"
                title="Mars Harapan"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto h-screen flex items-center justify-center">
            <div className="w-full h-full">
              <ImageModal imageUrl="/lirik-lagu.jpg" altText="Lirik Mars Harapan" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
