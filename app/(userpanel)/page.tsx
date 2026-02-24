import type { Metadata } from 'next';
import HeroCarousel from './_components/Carousel';
import ProfilYayasan from './_components/ProfilYayasan';
import KetuaYayasan from './_components/KetuaYayasan';
import ScrollProgram from './_components/ScrollProgram';
import Accordion from './_components/Accordion';

export const metadata: Metadata = {
  title: 'Beranda | Yayasan Pendidikan Harapan',
};

export default function BerandaPage() {
  return (
    <>
      <HeroCarousel />
      <ProfilYayasan />
      <KetuaYayasan />
      <ScrollProgram />
      <Accordion />
    </>
  );
}
