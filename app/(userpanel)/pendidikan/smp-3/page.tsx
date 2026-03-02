import type { Metadata } from 'next';
import { getSchoolContent } from '@/lib/queries/school';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = { title: 'SMP Harapan 3' };
export const revalidate = 60;

// Fallback data sebagai default jika API belum mengembalikan data
const fallbackData = {
  namaKepalaSekolah: 'Budi Susetyo S.Pd',
  visi: 'Unggul dalam Iman, Ilmu dan Amal.',
  misi: [
    'Melaksanakan pembelajaran dan bimbingan secara efektif sehingga setiap siswa berkembang secara optimal, sesuai dengan potensi yang dimiliki.',
    'Menumbuhkan semangat keunggulan secara intensif kepada seluruh warga sekolah.',
    'Mendorong dan membantu setiap siswa untuk mengenali potensi dirinya, sehingga dapat berkembang secara optimal.',
    'Menumbuhkan dan mendorong keunggulan dalam penerapan ilmu pengetahuan, teknologi dan seni.',
    'Menumbuhkan penghayatan terhadap ajaran agama yang dianut dan budaya bangsa sehingga terbangun siswa yang kompeten dan berakhlak mulia.',
    'Mendorong lulusan yang berkualitas, berprestasi, berakhlak tinggi, dan bertaqwa pada Allah SWT.',
  ],
  programUnggulan: ['Kurikulum Merdeka', 'Bilingual School', 'Sekolah Anak Berbakat', 'Sekolah Adiwijayata', 'Sekolah Penggerak'],
  fasilitas: [
    'Ruang Belajar Ber-AC',
    'Laboratorium IPA (Fisika & Kimia/Biologi)',
    'Laboratorium Bahasa',
    'Laboratorium Komputer',
    'Klinik (Dokter/Perawat)',
    'Lapangan Sepak Bola',
    'Lapangan Basket',
    'Parkir Sepeda Motor',
    'Kantin Higienis',
  ],
  ekstrakurikuler: [
    'Mengaji',
    "Tahfizh Qur'an",
    'Sepak Bola',
    'Basket (Pa/Pi)',
    'Badminton (Pa/Pi)',
    'Paskibra',
    'Pramuka',
    'Ansambel',
    'Club Sains Matematika',
    'Club Sains IPA',
    'Club Sains IPS',
    'English Club',
    'Club Riset Ilmiah Biologi',
  ],
  kegiatanSekolah: ['Sholat Dhuha (Senin-Selasa)', 'Sholat Dzuhur Berjamaah', 'Khatam Al-Quran', 'Hafiz Juz Amma (Juz 30)', 'Hafiz Yasin', 'Hafiz Suroh Pilihan', 'Tahfiz Quran', 'Sholat Jenazah'],
};

export default async function SMP3Page() {
  // Mengambil data dari database
  const content = await getSchoolContent('SMP3');

  const data: PendidikanData = {
    backgroundImage: '/hero-tentang.webp',
    namaSekolah: 'SMP Harapan 3',
    tingkatan: 'smp',
    akreditasi: 'A',
    deskripsiSejarah:
      'Sekolah Menengah Pertama Swasta Harapan 3 berdiri tahun 2001, dan telah menamatkan siswa/i lebih dari 2300 orang. SMP Harapan 3 berlokasi di Jalan Karya Wisata Ujung No. 31, Kelurahan Delitua, Kec. Delitua, Kab. Deli Serdang.',
    sosmed: {
      instagram: '@smpharapantiga',
      instagramUrl: 'https://www.instagram.com/smpharapantiga/',
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
