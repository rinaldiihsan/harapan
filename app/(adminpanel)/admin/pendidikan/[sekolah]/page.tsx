import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PendidikanClient from './PendidikanClient';

const VALID_SCHOOLS = ['SD1', 'SD2', 'SD3', 'SMP1', 'SMP2', 'SMP3', 'SMA1', 'SMA3'];

const SCHOOL_LABELS: Record<string, string> = {
  SD1: 'SD Harapan 1',
  SD2: 'SD Harapan 2',
  SD3: 'SD Harapan 3',
  SMP1: 'SMP Harapan 1',
  SMP2: 'SMP Harapan 2',
  SMP3: 'SMP Harapan 3',
  SMA1: 'SMA Harapan 1',
  SMA3: 'SMA Harapan 3',
};

interface Props {
  params: { sekolah: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const label = SCHOOL_LABELS[params.sekolah] ?? params.sekolah;
  return { title: `Konten ${label}` };
}

export function generateStaticParams() {
  return VALID_SCHOOLS.map((sekolah) => ({ sekolah }));
}

export default function PendidikanAdminPage({ params }: Props) {
  if (!VALID_SCHOOLS.includes(params.sekolah)) notFound();

  return <PendidikanClient sekolah={params.sekolah} />;
}
