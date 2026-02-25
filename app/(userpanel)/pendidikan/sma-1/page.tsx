import type { Metadata } from 'next';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = {
  title: 'SMA Harapan 1',
};

const data: PendidikanData = {
  backgroundImage: '/hero-tentang.webp',
  namaSekolah: 'SMA Harapan 1',
  tingkatan: 'sma',

  akreditasi: 'A',
  deskripsiSejarah: 'SMA Harapan 1 berdiri sejak tahun 1997 dan terus berkomitmen untuk menyediakan pendidikan berkualitas tinggi.',

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

  sosmed: {
    instagram: '@osissmaharapansatu',
    instagramUrl: 'https://www.instagram.com/osissmaharapansatu/',
    website: 'www.smaharapan.sch.id',
    websiteUrl: 'https://www.smaharapan.sch.id/',
  },
};

export default function SMA1Page() {
  return <PendidikanTemplate data={data} />;
}
