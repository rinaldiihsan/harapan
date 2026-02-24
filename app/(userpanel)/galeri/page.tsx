import type { Metadata } from 'next';
import GalleryClient from '../_components/galeri/GalleryClient';

export const metadata: Metadata = {
  title: 'Galeri',
};

export default function GaleriPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Galeri Yaspendhar</h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Dokumentasi kegiatan dan momen berkesan di Yaspendhar</p>
      </div>
      <GalleryClient />
    </div>
  );
}
