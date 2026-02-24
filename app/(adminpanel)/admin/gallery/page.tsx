import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Galeri',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
