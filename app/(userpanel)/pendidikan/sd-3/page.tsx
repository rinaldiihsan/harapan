import type { Metadata } from 'next';
import { getSchoolContent } from '@/lib/queries/school';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = { title: 'SD Harapan 3' };
export const revalidate = 60;

// Fallback data sebagai default jika API belum mengembalikan data
const fallbackData = {
  namaKepalaSekolah: 'Herman S.Pd',
  visi: 'Terwujudnya Sekolah yang Berkualitas dan Bermutu, Berdaya Saing Tinggi Berdasarkan Iman, Ilmu dan Amal.',
  misi: ['Membentuk manusia yang beriman, berakhlak mulia, menguasai ilmu pengetahuan dan teknologi.', "Membudayakan pendidikan Al-Qur'an dan akhlakul karimah.", 'Mendorong peserta didik untuk rutin beribadah.'],
  programUnggulan: ['Program Tahfidz', 'Bilingual School', 'Pendidikan Al-Quran', 'Pembinaan Karakter', 'Pengembangan Bakat'],
  fasilitas: ['Comfort Classroom (full AC)', 'Musholla', 'Hybrid Library', 'Auditorium', 'Lab Komputer', 'Lapangan Basket', 'Lapangan Futsal', 'Ruang Tahfidz', 'Ruang Gymnastic', 'Klinik', 'Kantin Bersih', 'Toilet Bersih'],
  ekstrakurikuler: ['Belajar Tambahan', 'Pramuka/Paskib', 'Mewarnai', 'Melukis', 'Mendongeng', 'Tari', 'Vocal Solo', 'Band', 'Sepak Bola', 'Taekwondo', 'Karate', 'Panahan', 'Bimbingan Olimpiade', 'Dokter Kecil'],
  kegiatanSekolah: ['Miniworkshop', 'Gebyar Budaya', 'English Day', 'Kegiatan Islami', 'Field Trip'],
};

export default async function SD3Page() {
  // Mengambil data dari database
  const content = await getSchoolContent('SD3');

  const data: PendidikanData = {
    backgroundImage: '/hero-tentang.webp',
    namaSekolah: 'SD Harapan 3',
    tingkatan: 'sd',
    akreditasi: 'A',
    deskripsiSejarah: 'SD IT Harapan 3 berdiri pada tahun 1976, beralamat di Jl. Karya Wisata Ujung / Sidorukun No. 31.',
    sosmed: {
      instagram: '@sdharapan3',
      instagramUrl: 'https://www.instagram.com/sdharapan3/',
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
