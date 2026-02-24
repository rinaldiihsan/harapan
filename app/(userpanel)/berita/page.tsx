import type { Metadata } from 'next';
import BeritaClient from '../_components/berita/BeritaClient';

export const metadata: Metadata = {
  title: 'Berita',
};

export default function BeritaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Berita Yaspendhar</h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Informasi terkini seputar kegiatan dan prestasi Yayasan Pendidikan Harapan</p>
      </div>
      <BeritaClient />
    </div>
  );
}
