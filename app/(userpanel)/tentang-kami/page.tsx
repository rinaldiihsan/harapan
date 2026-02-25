import type { Metadata } from 'next';
import ParallaxHero from '../_components/tentang/ParallaxHero';
import ImageModal from '../_components/tentang/ImageModal';
import { founder } from '@/utils/founders';

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
                <img src="/profile-yayasan.jpg" alt="Profile Yayasan" className="object-cover w-full h-full" loading="lazy" />
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
                {/* Garis vertikal */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primaryGreen-200" />

                {/* Item 1 */}
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

                {/* Item 2 */}
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

                {/* Item 3 */}
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

                {/* Item 4 */}
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
                <li className="flex gap-x-2">
                  <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full bg-black/50" />
                  Menyelenggarakan pendidikan berkualitas yang mengintegrasikan nilai-nilai keimanan, keilmuan, dan pengamalan.
                </li>
                <li className="flex gap-x-2">
                  <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full bg-black/50" />
                  Mengembangkan potensi peserta didik secara holistik melalui program akademik dan non-akademik yang inovatif.
                </li>
                <li className="flex gap-x-2">
                  <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full bg-black/50" />
                  Membangun kerjasama dengan berbagai pihak untuk meningkatkan mutu pendidikan dan relevansi lulusan.
                </li>
                <li className="flex gap-x-2">
                  <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full bg-black/50" />
                  Menciptakan lingkungan belajar yang kondusif, modern, dan berbasis teknologi.
                </li>
                <li className="flex gap-x-2">
                  <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full bg-black/50" />
                  Menumbuhkan jiwa kepemimpinan dan kewirausahaan pada peserta didik.
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-primaryGreen-700 mb-4 pb-3 border-b border-gray-100">Tujuan</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Menghasilkan lulusan yang unggul dalam prestasi akademik dan non-akademik, serta memiliki karakter berakhlak mulia, mandiri, dan bertanggung jawab. Kami berupaya mengembangkan model pendidikan yang mengintegrasikan ilmu
                pengetahuan, teknologi, dan nilai-nilai keagamaan, sekaligus menjadi pusat unggulan dalam pengembangan metode pembelajaran inovatif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pendiri */}
      <section className="bg-gray-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-14 text-black">Sebelas Pendiri Yayasan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {founder.map((f) => (
              <div key={f.name} className="flex flex-col items-center gap-y-3">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-primaryGreen-700 shadow-lg">
                  <img src={f.photo} alt={f.name} className="object-cover w-full h-full" loading="lazy" />
                </div>
                <p className="text-sm sm:text-base font-semibold text-center text-primaryGreen-700">{f.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Struktur Yayasan */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-black">Struktur Yayasan</h1>
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-stretch">
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="bg-primaryGreen-700 p-4 sm:p-6 rounded-lg shadow-md text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Organisasi Kami</h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  Struktur organisasi Yayasan Pendidikan Harapan Medan dirancang untuk memastikan efisiensi dan efektivitas dalam menjalankan misi pendidikan kami. Dipimpin oleh Dewan Pembina yang berpengalaman, yayasan ini memiliki jajaran
                  pengurus yang kompeten dan berdedikasi.
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
              <div className="w-full aspect-[3/4]">
                <ImageModal imageUrl="/struktur-organisasi.png" altText="Struktur Organisasi Yayasan" />
              </div>
            </div>
          </div>
        </div>
      </section>

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
