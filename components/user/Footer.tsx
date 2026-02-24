import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

const copyRight = new Date().getFullYear();

const locations = [
  {
    label: 'Kampus 1',
    href: 'https://maps.app.goo.gl/9JVbxoz5VjTyMWqF8',
    address: 'Jl. Imam Bonjol No.35, J A T I, Kec. Medan Maimun, Kota Medan, Sumatera Utara 20152',
  },
  {
    label: 'Kampus 2',
    href: 'https://maps.app.goo.gl/VrQqzxM6ARB6iDJKA',
    address: 'Jl. Karya Wisata No.31, Deli Tua, Kec. Namorambe, Kabupaten Deli Serdang, Sumatera Utara 20144',
  },
  {
    label: 'Kampus 3',
    href: 'https://maps.app.goo.gl/egxo89q6GUE6Q9cU6',
    address: 'Jl. HM. Joni No.70 C, Teladan Bar., Kec. Medan Kota, Kota Medan, Sumatera Utara 20216',
  },
];

const menuLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang-kami', label: 'Tentang' },
  { href: '/galeri', label: 'Galeri' },
];

const socialLinks = [
  {
    href: 'https://www.instagram.com/yaspendharmedan/',
    icon: <Instagram size={24} color="#047038" />,
    label: 'Instagram',
  },
  {
    href: 'https://www.facebook.com/yaspendharharapanmedan/',
    icon: <Facebook size={24} color="#047038" />,
    label: 'Facebook',
  },
  {
    href: 'https://www.youtube.com/@yaspendhar',
    icon: <Youtube size={24} color="#047038" />,
    label: 'Youtube',
  },
];

const contacts = [
  {
    href: 'mailto:admin@harapan.ac.id',
    icon: <Mail size={24} color="#fff" />,
    label: 'admin@harapan.ac.id',
  },
  {
    href: 'tel:0614554242',
    icon: <Phone size={24} color="#fff" />,
    label: '(061) 4554242',
  },
  {
    href: 'https://wa.me/6281297974242',
    icon: <MessageCircle size={24} color="#fff" />,
    label: '081297974242',
  },
];

export default function Footer() {
  return (
    <footer className="bg-primaryGreen-700 py-14 px-5 flex flex-col gap-y-16 justify-center items-center overflow-x-hidden">
      <div className="flex flex-col lg:flex-row w-full max-w-[100rem] justify-between gap-y-8 lg:gap-y-0 lg:gap-x-48">
        {/* Desc */}
        <div className="flex flex-col gap-y-6 w-full lg:w-[20%]">
          <div className="flex flex-row gap-x-3 items-center">
            <img src="/logo.png" alt="Logo" className="w-14 h-14" />
            <h1 className="text-white font-bold text-2xl uppercase">Yaspendhar</h1>
          </div>
          <p className="text-white font-medium text-justify w-full text-sm">
            Yayasan Pendidikan Harapan adalah lembaga pendidikan yang menaungi TK, SD, SMP, SMA, dan Perguruan Tinggi. Didirikan pada 4 Februari 1967 oleh beberapa tokoh, yayasan ini diresmikan oleh Letjen A.J. Mokoginta.
          </p>
          <div className="flex gap-x-4">
            {socialLinks.map((social) => (
              <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-primaryGreen-100 transition-colors" aria-label={social.label}>
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Menu & Lokasi & Kontak */}
        <div className="flex flex-col lg:flex-row gap-y-10 gap-x-0 lg:gap-y-0 lg:gap-x-16 w-full lg:w-[70%]">
          {/* Plakat */}
          <div className="w-full lg:w-[390px]">
            <img src="/plakat.png" alt="plakat" className="w-full lg:w-[390px] h-auto object-contain" />
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-y-4">
            <h2 className="text-white font-bold text-lg">Menu</h2>
            <div className="flex flex-col gap-y-2">
              {menuLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-white text-sm hover:text-primaryYellow-400 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Lokasi */}
          <div className="flex flex-col gap-y-4 w-full lg:w-2/5">
            <h2 className="text-white font-bold text-lg">Kunjungi Kami</h2>
            <div className="flex flex-col gap-y-4">
              {locations.map((loc) => (
                <Link key={loc.label} href={loc.href} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-y-1 group">
                  <div className="flex gap-x-2 items-center">
                    <MapPin size={20} color="#fff" />
                    <p className="text-white font-bold text-sm">{loc.label}</p>
                  </div>
                  <p className="text-white/80 text-sm text-justify group-hover:text-white transition-colors">{loc.address}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div className="flex flex-col gap-y-6">
            <h2 className="text-white font-bold text-lg">Hubungi Kami</h2>
            <div className="flex flex-col gap-y-4">
              {contacts.map((contact) => (
                <Link key={contact.label} href={contact.href} className="flex gap-x-4 items-center group">
                  {contact.icon}
                  <span className="text-white text-sm group-hover:text-primaryYellow-400 transition-colors">{contact.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="font-medium text-white text-center text-sm md:text-base">&copy; {copyRight} Yayasan Pendidikan Harapan Medan. All Rights Reserved.</p>
    </footer>
  );
}
