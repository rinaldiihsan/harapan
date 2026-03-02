import type { Metadata } from 'next';
import { getSchoolContent } from '@/lib/queries/school';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = { title: 'SMA Harapan 3' };
export const revalidate = 60;

// Fallback data sebagai default jika API belum mengembalikan data
const fallbackData = {
  namaKepalaSekolah: 'Suryahadi Marwan M.Pd',
  visi: 'Unggul dalam Iman, Ilmu, Amal, Bermartabat dan Berprestasi, serta Berkepribadian sesuai Profil Pelajar Pancasila.',
  misi: ['Menjadikan SMA Harapan 3 sebagai sekolah para juara yang menguasai ilmu pengetahuan dan teknologi yang tetap berpedoman pada ajaran Islam dan Pancasila sehingga pendidikan agama dan intelektual dapat berjalan beriringan.'],
  programUnggulan: ['Kurikulum Merdeka', 'Bilingual School', 'Sekolah Anak Berbakat', 'Sekolah Adiwijayata', 'Sekolah Penggerak'],
  fasilitas: ['Ruang Kelas Ber-AC', 'Lab Komputer', 'Lab Bahasa', 'Lab IPA', 'Perpustakaan', 'Klinik', 'Kantin', 'Parkir', 'Lapangan Bola', 'Lapangan Basket', 'Masjid Arroza', 'Toilet Bersih'],
  ekstrakurikuler: ['Paskibra', 'Paduan Suara', 'Pramuka dan PMR', 'Basket', 'Sepak Bola / Futsal', 'Panahan'],
  kegiatanSekolah: ['Pesantren Ramadhan', 'Field Trip', 'Studi Wisata', 'Edu Wisata Religi'],
};

export default async function SMA3Page() {
  // Mengambil data dari database
  const content = await getSchoolContent('SMA3');

  const data: PendidikanData = {
    backgroundImage: '/hero-tentang.webp',
    namaSekolah: 'SMA Harapan 3',
    tingkatan: 'sma',
    akreditasi: 'A',
    deskripsiSejarah: 'SMA Harapan 3 berdiri pada tahun 1976, beralamat di Jl. Karya Wisata Ujung / Sidorukun No. 31.',
    sosmed: {
      instagram: '@smaharapan_3',
      instagramUrl: 'https://www.instagram.com/smaharapan_3/',
      website: 'www.smaharapan3.sch.id',
      websiteUrl: 'https://www.smaharapan3.sch.id/',
    },
    // Menggunakan data dari API jika ada, jika tidak gunakan fallback
    namaKepalaSekolah: content?.kepalaSekolah ?? fallbackData.namaKepalaSekolah,
    visi: content?.visi ?? fallbackData.visi,
    misi: content?.misi?.length ? content.misi : fallbackData.misi,
    programUnggulan: content?.programUnggulan?.length ? content.programUnggulan : fallbackData.programUnggulan,
    fasilitas: content?.fasilitas?.length ? content.fasilitas : fallbackData.fasilitas,
    ekstrakurikuler: content?.ekstrakurikuler?.length ? content.ekstrakurikuler : fallbackData.ekstrakurikuler,
    kegiatanSekolah: content?.kegiatanSekolah?.length ? content.kegiatanSekolah : fallbackData.kegiatanSekolah,
  };

  return <PendidikanTemplate data={data} />;
}
