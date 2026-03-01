import type { Metadata } from 'next';
import { Award, Cpu, Globe, Instagram } from 'lucide-react';
import ParallaxHeroPendidikan from '@/app/(userpanel)/_components/pendidikan/ParallaxHeroPendidikan';

export const metadata: Metadata = {
  title: 'Universitas Harapan | Yaspendhar',
};

const fakultas = [
  {
    nama: 'Fakultas Ekonomi dan Bisnis',
    prodi: [
      { nama: 'Magister Manajemen', akreditasi: 'B' },
      { nama: 'S1 Akuntansi', akreditasi: 'B' },
      { nama: 'S1 Manajemen', akreditasi: 'B' },
      { nama: 'S1 Manajemen Perkantoran', akreditasi: 'B' },
    ],
  },
  {
    nama: 'Fakultas Teknik',
    prodi: [
      { nama: 'S1 Teknik Informatika', akreditasi: 'B' },
      { nama: 'S1 Sistem Informasi', akreditasi: 'A' },
      { nama: 'S1 Teknik Sipil', akreditasi: 'A' },
      { nama: 'S1 Teknik Elektro', akreditasi: 'A' },
      { nama: 'S1 Teknik Industri', akreditasi: 'B' },
      { nama: 'S1 Teknik Mesin', akreditasi: 'B' },
      { nama: 'D3 Manajemen Informatika', akreditasi: 'B' },
    ],
  },
  {
    nama: 'Fakultas Hukum',
    prodi: [{ nama: 'S1 Hukum', akreditasi: 'B' }],
  },
  {
    nama: 'Fakultas Bahasa & Komunikasi',
    prodi: [
      { nama: 'Sastra Inggris', akreditasi: 'B' },
      { nama: 'D3 Bahasa Jepang', akreditasi: 'B' },
    ],
  },
];

const programUnggulan = ['Program Internasional', 'Program Double Degree', 'Program Riset Unggulan', 'Program Entrepreneurship', 'Program Beasiswa Prestasi', 'Program Pertukaran Mahasiswa'];

const fasilitas = ['Perpustakaan Hybrid', 'Laboratorium Bahasa', 'Laboratorium Komputer', 'Laboratorium Terpadu Teknik', 'Inkubator Bisnis', 'Pusat Kegiatan Mahasiswa'];

export default function UnharPage() {
  return (
    <>
      <ParallaxHeroPendidikan backgroundImage="/hero-tentang.webp" subtitle="Universitas Harapan" title="Yayasan Pendidikan Harapan" />

      <section className="flex flex-col px-4 lg:px-32 py-16 gap-y-16 bg-gradient-to-b from-[#F8FFFB] to-[#DCFBE7]">
        {/* Sejarah & Rektor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-2">
            <h2 className="text-2xl font-semibold mb-4 text-primaryGreen-700">Sejarah</h2>
            <p className="text-gray-700 text-justify leading-relaxed">
              Universitas Harapan Medan, yang beralamat di Jalan Imam Bonjol No. 35 (Kampus 1) dan Jalan H.M. Joni Nomor 70 C (Kampus 2), didirikan melalui Yayasan Pendidikan Harapan pada tahun 1969. Awalnya dimulai dengan Akademi Bahasa
              Asing, institusi ini bertransformasi menjadi Universitas Harapan pada tahun 2017, menggabungkan beberapa lembaga pendidikan tinggi dan menawarkan empat fakultas: Fakultas Bahasa dan Komunikasi, Fakultas Ekonomi Bisnis,
              Fakultas Teknik dan Komputer, serta Fakultas Hukum. Dengan lokasi strategis di pusat aktivitas perkantoran, universitas ini terus berkontribusi dalam pengembangan pendidikan berkualitas dan penelitian yang peka terhadap
              kebutuhan masyarakat.
            </p>
          </div>
          <div className="bg-primaryGreen-700 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-2 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Rektor</h2>
            <p className="text-xl font-medium">Prof. Drs. Sriadhi, S.T., M.Pd., M.Kom., Ph.D</p>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-3xl font-semibold mb-6 text-primaryGreen-700 text-center">Visi dan Misi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-primaryGreen-700 rounded-lg text-white">
              <h3 className="text-2xl font-medium mb-4">Visi</h3>
              <p className="italic leading-relaxed">"Menjadi Universitas yang Unggul dalam Bidang Sosial, Sains dan Teknologi"</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-medium mb-4 text-primaryGreen-700">Misi</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm leading-relaxed">
                <li>Menyelenggarakan sistem pendidikan yang berkualitas untuk membentuk lulusan yang berkarakter, kompeten, dan berperan aktif sesuai kebutuhan stakeholder;</li>
                <li>Menyelenggarakan penelitian dan pengabdian masyarakat pada bidang ilmu sosial, sains dan teknologi yang berbasis kepekaan terhadap kebutuhan masyarakat;</li>
                <li>Membangun kerjasama dalam menciptakan sivitas akademika yang berkarya dan berkontribusi kepada masyarakat berlandaskan etika dan estetika.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Program Studi */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-8 text-primaryGreen-700 text-center">Program Studi</h2>
          <div className="flex flex-col gap-12">
            {fakultas.map((f) => (
              <div key={f.nama}>
                <div className="relative mb-6">
                  <h3 className="text-2xl font-semibold text-primaryGreen-700 pb-2">{f.nama}</h3>
                  <div className="absolute bottom-0 left-0 w-32 h-1 bg-primaryGreen-700" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {f.prodi.map((p) => (
                    <div key={p.nama} className="bg-white border border-gray-200 p-6 rounded-lg hover:border-primaryGreen-700 transition-all duration-300">
                      <h4 className="font-semibold text-gray-800 mb-2">{p.nama}</h4>
                      <p className="text-sm text-gray-500">Akreditasi: {p.akreditasi}</p>
                      <p className="text-sm text-gray-500">Terakreditasi BAN-PT</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Unggulan */}
        <div className="bg-primaryYellow-700/10 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-3xl font-semibold mb-6 text-primaryYellow-700 text-center flex items-center justify-center gap-x-2">
            <Award className="w-8 h-8" />
            Program Unggulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programUnggulan.map((program) => (
              <div key={program} className="bg-white text-primaryYellow-700 px-4 py-3 rounded-lg font-medium hover:scale-105 transition duration-300 shadow-md hover:shadow-lg text-center">
                {program}
              </div>
            ))}
          </div>
        </div>

        {/* Fasilitas Kampus */}
        <div className="bg-primaryGreen-700/10 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-3xl font-semibold mb-6 text-primaryGreen-700 text-center flex items-center justify-center gap-x-2">
            <Cpu className="w-8 h-8" />
            Fasilitas Kampus
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fasilitas.map((item) => (
              <div key={item} className="bg-white p-3 rounded-lg text-primaryGreen-700 text-sm text-center hover:bg-primaryGreen-700 hover:text-white transition duration-300 shadow-md hover:shadow-lg">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Kunjungi Kami Online */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-3xl font-semibold mb-6 text-primaryGreen-700 text-center flex items-center justify-center gap-x-2">
            <Globe className="w-8 h-8" />
            Kunjungi Kami Online
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primaryGreen-700 text-white p-6 rounded-lg flex flex-col items-center justify-center">
              <Globe className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Website Resmi</h3>
              <a
                href="https://www.unhar.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primaryGreen-700 px-4 py-2 rounded-full hover:bg-primaryYellow-600 hover:text-white transition duration-300 text-sm font-medium"
              >
                www.unhar.ac.id
              </a>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-6 rounded-lg flex flex-col items-center justify-center">
              <Instagram className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instagram</h3>
              <a
                href="https://www.instagram.com/universitasharapanmedan/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-primaryYellow-600 hover:text-white transition duration-300 text-sm font-medium"
              >
                @universitasharapanmedan
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
