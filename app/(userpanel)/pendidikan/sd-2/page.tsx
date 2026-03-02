import type { Metadata } from 'next';
import { getSchoolContent } from '@/lib/queries/school';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'SD Harapan 2' };
export const revalidate = 60;

// Fallback data sebagai default jika API belum mengembalikan data
const fallbackData = {
  namaKepalaSekolah: 'Hj. Lely Rahmadani, S.Si',
  visi: 'Unggul di Bidang Pengetahuan Umum dan Agama',
  misi: [
    'Membentuk peserta didik yang cerdas dan terampil di bidang akademik dan non-akademik',
    "Menyelenggarakan pendidikan yang cinta Al-Qur'an dan berakhlakul karimah",
    "Membudayakan pendidikan Al-Qur'an dengan 5 M (Membaca, menghafal, mengulang, memahami, dan mengamalkan)",
    'Membentuk peserta didik yang rutin beribadah dan peduli dengan sesama',
  ],
  programUnggulan: ['Program Tahfidz', 'Bilingual School', 'Pendidikan Al-Quran', 'Pembinaan Karakter', 'Pengembangan Bakat'],
  fasilitas: ['Comfort Classroom (full AC)', 'Musholla', 'Hybrid Library', 'Auditorium', 'Lab Komputer', 'Lapangan Basket', 'Lapangan Futsal', 'Ruang Tahfidz', 'Ruang Gymnastic', 'Klinik', 'Kantin Bersih', 'Toilet Bersih'],
  ekstrakurikuler: [],
  kegiatanSekolah: ['Pesantren Ramadhan', 'Field Trip', 'Studi Wisata', 'Edu Wisata Religi'],
};

export default async function SD2Page() {
  // Mengambil data dari database
  const content = await getSchoolContent('SD2');

  const data: PendidikanData = {
    backgroundImage: '/hero-tentang.webp',
    namaSekolah: 'SD Harapan 2',
    tingkatan: 'sd',
    akreditasi: 'A',
    deskripsiSejarah: 'SD IT Harapan 2 berdiri pada tahun 1976, beralamat di Jl. Imam Bonjol Nomor 35.',
    sosmed: {
      instagram: '@sditharapan2medan_',
      instagramUrl: 'https://www.instagram.com/sditharapan2medan_/',
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
