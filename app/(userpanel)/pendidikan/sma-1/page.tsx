import type { Metadata } from 'next';
import { getSchoolContent } from '@/lib/queries/school';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = { title: 'SMA Harapan 1' };
export const revalidate = 60;

// Fallback data sebagai default jika API belum mengembalikan data
const fallbackData = {
  namaKepalaSekolah: 'Suwito S.S',
  visi: 'Unggul di bidang iman, ilmu, dan amal.',
  misi: [
    'Menanamkan nilai-nilai agama dini melalui penerapan budaya sekolah.',
    'Melaksanakan kegiatan pembelajaran yang inovatif, efektif dan partisipatif serta menyenangkan.',
    'Melaksanakan kegiatan ekstrakurikuler secara profesional.',
    'Mewujudkan siswa berkarakter, mandiri, bernalar kritis, nasionalis, gotong royong, kreatif.',
    'Menanamkan sikap kepedulian terhadap lingkungan kepada siswa melalui penerapan wawasan wiyata mandala dan adiwiyata.',
    'Menjalin kerjasama yang harmonis antara warga sekolah dengan individu, lingkungan dan lembaga atau instansi terkait untuk memajukan sekolah.',
  ],
  programUnggulan: ['Pembinaan dan Kompetensi Keislaman', 'Kemandirian dan Kreativitas', 'Pembinaan Olimpiade'],
  fasilitas: [
    'Ruang Ber-AC',
    'Control Room Siswa',
    'Perpustakaan Hybrid',
    'Perpustakaan',
    'Ruang OSIS',
    'Musholla',
    'Auditorium',
    'Lab (Fisika, Biologi, Kimia, Bahasa, Komputer)',
    'Lapangan (Basket, Badminton, Futsal, Voli)',
    'Koperasi',
    'Kantin',
    'Toilet Bersih',
    'Ruang Audio Visual',
  ],
  ekstrakurikuler: ['Paskhas', 'Ansambel Musik', 'PMR 037', 'English Club', 'Bengkel Al-Quran', 'KIR', 'Teater', 'Japanese Club', 'Futsal'],
  kegiatanSekolah: ['Miniworkshop', 'Gebyar Budaya', 'English Day', 'Kegiatan Islami', 'Field Trip'],
};

export default async function SMA1Page() {
  // Mengambil data dari database
  const content = await getSchoolContent('SMA1');

  const data: PendidikanData = {
    backgroundImage: '/hero-tentang.webp',
    namaSekolah: 'SMA Harapan 1',
    tingkatan: 'sma',
    akreditasi: 'A',
    deskripsiSejarah: 'SMA Harapan 1 berdiri sejak tahun 1997 dan terus berkomitmen untuk menyediakan pendidikan berkualitas tinggi.',
    sosmed: {
      instagram: '@osissmaharapansatu',
      instagramUrl: 'https://www.instagram.com/osissmaharapansatu/',
      website: 'www.smaharapan.sch.id',
      websiteUrl: 'https://www.smaharapan.sch.id/',
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
