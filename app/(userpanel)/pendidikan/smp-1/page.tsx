import type { Metadata } from 'next';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = {
  title: 'SMP Harapan 1',
};

const data: PendidikanData = {
  backgroundImage: '/hero-tentang.webp',
  namaSekolah: 'SMP Harapan 1',
  tingkatan: 'smp',

  akreditasi: 'A',
  deskripsiSejarah: 'SMP Harapan 1 Medan telah berdiri sejak tahun 1967 dan terus berkomitmen dalam memberikan pendidikan berkualitas.',

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

  sosmed: {
    instagram: '@smpharapan1medan',
    instagramUrl: 'https://www.instagram.com/smpharapan1medan/',
    website: 'smpharapan1.sch.id',
    websiteUrl: 'https://smpharapan1.sch.id/',
  },
};

export default function SMP1Page() {
  return <PendidikanTemplate data={data} />;
}
