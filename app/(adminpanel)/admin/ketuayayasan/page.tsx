import type { Metadata } from 'next';
import KetuaYayasanClient from './KetuaYayasanClient';

export const metadata: Metadata = {
  title: 'Ketua Yayasan',
};

export default function KetuaYayasanPage() {
  return <KetuaYayasanClient />;
}
