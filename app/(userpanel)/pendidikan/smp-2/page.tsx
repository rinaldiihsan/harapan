import type { Metadata } from 'next';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = {
  title: 'SMP Harapan 2',
};

const data: PendidikanData = {
  backgroundImage: '/hero-tentang.webp',
  namaSekolah: 'SMP Harapan 2',
  tingkatan: 'smp',

  akreditasi: 'A',
  deskripsiSejarah: 'Berdiri pada tahun 1976, SMP Harapan 2 berlokasi di Jalan Imam Bonjol Nomor 35.',

  namaKepalaSekolah: 'Eflin Nuriandi, S.Pd',

  visi: 'Unggul di bidang iman, ilmu dan amal.',
  misi: [
    'Menyelenggarakan pembelajaran yang berkualitas, aktif, kreatif, efektif, menyenangkan, dan berkarakter.',
    'Menyelenggarakan kegiatan keagamaan secara rutin dan berkesinambungan.',
    'Menyelenggarakan kegiatan pengembangan diri/ekstrakurikuler secara intensif.',
    'Menjalin kerjasama dengan individu dan institusi lain untuk memajukan sekolah.',
    'Menyelenggarakan layanan prima.',
  ],

  programUnggulan: [],

  fasilitas: ['Kelas Ber-AC', 'Perpustakaan Hybrid', 'Perpustakaan', 'Lab Komputer', 'Lab (Fisika, Biologi, Kimia)', 'Ruang Prakarya', 'Lapangan (Basket, Futsal, Badminton)', 'Klinik'],

  ekstrakurikuler: ['Pramuka', 'Futsal', 'Pickle Ball', 'Paskibra', 'Basket', 'Olimpiade (Sains, Matematika, IPS)', 'English Club', 'Tahsin Al-Quran'],

  kegiatanSekolah: ['Pameran Kreasi Siswa', 'Study Tour', 'Persami', 'Outbond', 'Field Trip'],

  sosmed: {
    instagram: '@smpharapan_2',
    instagramUrl: 'https://www.instagram.com/smpharapan_2/',
    website: 'smpharapan2.sch.id',
    websiteUrl: 'https://smpharapan2.sch.id/',
  },
};

export default function SMP2Page() {
  return <PendidikanTemplate data={data} />;
}
