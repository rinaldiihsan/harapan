import type { Metadata } from 'next';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = {
  title: 'SMA Harapan 3',
};

const data: PendidikanData = {
  backgroundImage: '/hero-tentang.webp',
  namaSekolah: 'SMA Harapan 3',
  tingkatan: 'sma',

  akreditasi: 'A',
  deskripsiSejarah: 'SMA Harapan 3 berdiri pada tahun 1976, beralamat di Jl. Karya Wisata Ujung / Sidorukun No. 31.',

  namaKepalaSekolah: 'Suryahadi Marwan M.Pd',

  visi: 'Unggul dalam Iman, Ilmu, Amal, Bermartabat dan Berprestasi, serta Berkepribadian sesuai Profil Pelajar Pancasila.',
  misi: ['Menjadikan SMA Harapan 3 sebagai sekolah para juara yang menguasai ilmu pengetahuan dan teknologi yang tetap berpedoman pada ajaran Islam dan Pancasila sehingga pendidikan agama dan intelektual dapat berjalan beriringan.'],

  programUnggulan: ['Kurikulum Merdeka', 'Bilingual School', 'Sekolah Anak Berbakat', 'Sekolah Adiwijayata', 'Sekolah Penggerak'],

  fasilitas: ['Ruang Kelas Ber-AC', 'Lab Komputer', 'Lab Bahasa', 'Lab IPA', 'Perpustakaan', 'Klinik', 'Kantin', 'Parkir', 'Lapangan Bola', 'Lapangan Basket', 'Masjid Arroza', 'Toilet Bersih'],

  ekstrakurikuler: ['Paskibra', 'Paduan Suara', 'Pramuka dan PMR', 'Basket', 'Sepak Bola / Futsal', 'Panahan'],

  kegiatanSekolah: ['Pesantren Ramadhan', 'Field Trip', 'Studi Wisata', 'Edu Wisata Religi'],

  sosmed: {
    instagram: '@smaharapan_3',
    instagramUrl: 'https://www.instagram.com/smaharapan_3/',
    website: 'www.smaharapan3.sch.id',
    websiteUrl: 'https://www.smaharapan3.sch.id/',
  },
};

export default function SMA3Page() {
  return <PendidikanTemplate data={data} />;
}
