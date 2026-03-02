import type { Metadata } from 'next';
import StrukturClient from './StrukturClient';

export const metadata: Metadata = {
  title: 'Struktur Organisasi',
};

export default function StrukturPage() {
  return <StrukturClient />;
}
