import type { Metadata } from 'next';
import PendiriClient from './PendiriClient';

export const metadata: Metadata = {
  title: 'Sebelas Pendiri Yayasan',
};

export default function PendiriPage() {
  return <PendiriClient />;
}
