import type { Metadata } from 'next';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = {
  title: 'SD Harapan 1',
};

const data: PendidikanData = {
  backgroundImage: '/hero-tentang.webp',
  namaSekolah: 'SD Harapan 1',
  tingkatan: 'sd',

  akreditasi: 'A',
  deskripsiSejarah: 'SD Harapan 1 berdiri dengan bangga sejak tahun 1967, membangun fondasi pendidikan yang kokoh selama lebih dari setengah abad.',

  namaKepalaSekolah: 'Dr. H. Parlindungan Lubis M.Pd',

  visi: 'Terwujudnya generasi beriman, berilmu, beramal dan tumbuh berkembang sesuai potensi dirinya, berkarakter dan berwawasan lingkungan global',
  misi: [
    'Menanamkan nilai-nilai agama dini melalui penerapan budaya sekolah',
    'Melaksanakan kegiatan pembelajaran yang inovatif, efektif dan partisipatif serta menyenangkan',
    'Melaksanakan kegiatan ekstrakurikuler secara profesional',
    'Mewujudkan siswa berkarakter, mandiri, bernalar kritis, nasionalis, gotong royong, kreatif',
    'Menanamkan sikap kepedulian terhadap lingkungan kepada siswa',
    'Menjalin kerjasama yang harmonis antara warga sekolah dengan individu, lingkungan dan lembaga terkait',
  ],

  programUnggulan: ['Kurikulum Merdeka', 'Bilingual School', 'Sekolah Anak Berbakat', 'Sekolah Adiwijayata', 'Sekolah Penggerak'],

  fasilitas: ['Comfort Classroom (full AC)', 'Musholla', 'Hybrid Library', 'Auditorium', 'Lab Komputer', 'Lapangan Basket', 'Lapangan Futsal', 'Ruang Tahfidz', 'Ruang Gymnastic', 'Klinik', 'Kantin Bersih', 'Toilet Bersih'],

  ekstrakurikuler: ['Tahfidz Quran', 'English Club', 'Panahan', 'Sepatu Roda', 'Berenang', 'Menggambar & Mewarnai', 'Teater', 'Tari', 'Futsal', 'Taekwondo', 'Pramuka'],

  kegiatanSekolah: ['Miniworkshop', 'Gebyar Budaya', 'English Day', 'Kegiatan Islami', 'Field Trip'],

  sosmed: {
    instagram: '@sd_harapan1medan',
    instagramUrl: 'https://www.instagram.com/sd_harapan1medan/',
    // website: 'sdharapan1.sch.id',       // ← uncomment kalau ada
    // websiteUrl: 'https://sdharapan1.sch.id',
  },
};

export default function SD1Page() {
  return <PendidikanTemplate data={data} />;
}
