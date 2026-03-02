import type { Metadata } from 'next';
import { getSchoolContent } from '@/lib/queries/school';
import PendidikanTemplate from '../../_components/pendidikan/PendidikanTemplate';
import type { PendidikanData } from '../../_components/pendidikan/PendidikanTemplate';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'SD Harapan 1' };
export const revalidate = 60;

const staticData = {
  backgroundImage: '/hero-tentang.webp',
  namaSekolah: 'SD Harapan 1',
  tingkatan: 'sd' as const,
  akreditasi: 'A',
  deskripsiSejarah: 'SD Harapan 1 berdiri dengan bangga sejak tahun 1967, membangun fondasi pendidikan yang kokoh selama lebih dari setengah abad.',
  sosmed: {
    instagram: '@sd_harapan1medan',
    instagramUrl: 'https://www.instagram.com/sd_harapan1medan/',
  },
};

export default async function SD1Page() {
  const content = await getSchoolContent('SD1');

  const data: PendidikanData = {
    ...staticData,
    namaKepalaSekolah: content?.kepalaSekolah ?? 'Dr. H. Parlindungan Lubis M.Pd',
    visi: content?.visi ?? 'Terwujudnya generasi beriman, berilmu, beramal...',
    misi: content?.misi?.length ? content.misi : ['Menanamkan nilai-nilai agama...'],
    programUnggulan: content?.programUnggulan?.length ? content.programUnggulan : ['Kurikulum Merdeka'],
    fasilitas: content?.fasilitas?.length ? content.fasilitas : ['Comfort Classroom (full AC)'],
    ekstrakurikuler: content?.ekstrakurikuler?.length ? content.ekstrakurikuler : ['Tahfidz Quran'],
    kegiatanSekolah: content?.kegiatanSekolah?.length ? content.kegiatanSekolah : ['Miniworkshop'],
  };

  return <PendidikanTemplate data={data} />;
}
