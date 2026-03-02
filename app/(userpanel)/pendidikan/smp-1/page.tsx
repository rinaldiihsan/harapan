import type { Metadata } from 'next';
import { getSchoolContent } from '@/lib/queries/school';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'SMP Harapan 1' };
export const revalidate = 60;

// Fallback data sebagai default jika API belum mengembalikan data
const fallbackData = {
  namaKepalaSekolah: 'Drs. Idris Ginting, M.M.',
  visi: 'Unggul di bidang iman, ilmu, dan amal.',
  misi: [
    'Menyelenggarakan pembelajaran yang berkualitas, efektif, dan efisien.',
    'Menyelenggarakan kegiatan keagamaan secara rutin dan berkesinambungan.',
    'Menyelenggarakan kegiatan ekstrakurikuler secara terpadu.',
    'Mewujudkan generasi yang dapat diandalkan dan sekolah ramah anak.',
    'Menjalin kerjasama dengan individu dan institusi untuk kemajuan sekolah.',
  ],
  programUnggulan: ['Pembinaan Adab dan Kompetensi Keislaman', 'Kemandirian dan Kreativitas', 'Pembinaan Olimpiade'],
  fasilitas: ['Kelas Ber-AC', 'Perpustakaan Hybrid', 'Lab Komputer', 'Lab (Fisika, Biologi, Kimia)', 'Ruang Prakarya', 'Lapangan Basket dan Futsal', 'Klinik', 'Ruang Entertainment'],
  ekstrakurikuler: ['OSIS', 'Paskibra', 'Pramuka', 'Tahfidz & Tahsin', 'Basket', 'Futsal', 'Badminton', 'Tari', 'Robotic', 'English Club', 'Karate', 'Swara Harsa'],
  kegiatanSekolah: ['Outbound', 'Field Trip', 'Studi Wisata', 'Leadership Tour', 'Outing Class'],
};

export default async function SMP1Page() {
  // Mengambil data dari database
  const content = await getSchoolContent('SMP1');

  const data: PendidikanData = {
    backgroundImage: '/hero-tentang.webp',
    namaSekolah: 'SMP Harapan 1',
    tingkatan: 'smp',
    akreditasi: 'A',
    deskripsiSejarah: 'SMP Harapan 1 Medan telah berdiri sejak tahun 1967 dan terus berkomitmen dalam memberikan pendidikan berkualitas.',
    sosmed: {
      instagram: '@smpharapan1medan',
      instagramUrl: 'https://www.instagram.com/smpharapan1medan/',
      website: 'smpharapan1.sch.id',
      websiteUrl: 'https://smpharapan1.sch.id/',
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
