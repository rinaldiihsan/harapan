import type { Metadata } from 'next';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const metadata: Metadata = {
  title: 'SD Harapan 3',
};

const data: PendidikanData = {
  backgroundImage: '/hero-tentang.webp',
  namaSekolah: 'SD Harapan 3',
  tingkatan: 'sd',

  akreditasi: 'A',
  deskripsiSejarah: 'SD IT Harapan 3 berdiri pada tahun 1976, beralamat di Jl. Karya Wisata Ujung / Sidorukun No. 31.',

  namaKepalaSekolah: 'Herman S.Pd',

  visi: 'Terwujudnya Sekolah yang Berkualitas dan Bermutu, Berdaya Saing Tinggi Berdasarkan Iman, Ilmu dan Amal.',
  misi: ['Membentuk manusia yang beriman, berakhlak mulia, menguasai ilmu pengetahuan dan teknologi.', "Membudayakan pendidikan Al-Qur'an dan akhlakul karimah.", 'Mendorong peserta didik untuk rutin beribadah.'],

  programUnggulan: ['Program Tahfidz', 'Bilingual School', 'Pendidikan Al-Quran', 'Pembinaan Karakter', 'Pengembangan Bakat'],

  fasilitas: ['Comfort Classroom (full AC)', 'Musholla', 'Hybrid Library', 'Auditorium', 'Lab Komputer', 'Lapangan Basket', 'Lapangan Futsal', 'Ruang Tahfidz', 'Ruang Gymnastic', 'Klinik', 'Kantin Bersih', 'Toilet Bersih'],

  ekstrakurikuler: ['Belajar Tambahan', 'Pramuka/Paskib', 'Mewarnai', 'Melukis', 'Mendongeng', 'Tari', 'Vocal Solo', 'Band', 'Sepak Bola', 'Taekwondo', 'Karate', 'Panahan', 'Bimbingan Olimpiade', 'Dokter Kecil'],

  kegiatanSekolah: ['Miniworkshop', 'Gebyar Budaya', 'English Day', 'Kegiatan Islami', 'Field Trip'],

  sosmed: {
    instagram: '@sdharapan3',
    instagramUrl: 'https://www.instagram.com/sdharapan3/',
    // website: 'sdharapan3.sch.id',
    // websiteUrl: 'https://sdharapan3.sch.id',
  },
};

export default function SD3Page() {
  return <PendidikanTemplate data={data} />;
}
