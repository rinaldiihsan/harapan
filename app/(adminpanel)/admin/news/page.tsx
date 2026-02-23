import type { Metadata } from 'next';
import NewsClient from './NewsClient';

export const metadata: Metadata = {
  title: 'Berita',
};

export default function NewsPage() {
  return <NewsClient />;
}
