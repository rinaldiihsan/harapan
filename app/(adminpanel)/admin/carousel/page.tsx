import type { Metadata } from 'next';
import CarouselClient from './CarouselClient';

export const metadata: Metadata = {
  title: 'Carousel',
};

export default function CarouselPage() {
  return <CarouselClient />;
}
