import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { TikTokIcon } from '../TikTokIcon';

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
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/berita', label: 'Berita' },
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
  {
    href: 'https://www.tiktok.com/@yaspendhar',
    icon: <TikTokIcon size={24} color="#047038" />,
    label: 'TikTok',
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
    <footer className="bg-primaryGreen-700 py-14 px-5 flex flex-col gap-y-16 items-center overflow-x-hidden">
      {/* Container utama dibuat agar rata tengah dengan gap yang konsisten */}
      <div className="flex flex-col lg:flex-row w-full max-w-[100rem] justify-center items-start gap-x-12 xl:gap-x-24 gap-y-12">
        {/* Desc */}
        <div className="flex flex-col gap-y-6 w-full lg:w-[25%]">
          <div className="flex flex-row gap-x-3 items-center">
            <img src="/logo.png" alt="Logo" className="w-14 h-14" />
            <h1 className="text-white font-bold text-2xl uppercase">Yaspendhar</h1>
          </div>
          <p className="text-white font-medium text-justify w-full text-sm">
            Yayasan Pendidikan Harapan adalah lembaga pendidikan yang menaungi TK, SD, SMP, SMA, dan Perguruan Tinggi. Didirikan pada 4 Februari 1967 oleh beberapa tokoh, yayasan ini diresmikan oleh Letjen A.J. Mokoginta.
          </p>
          <div className="flex gap-x-4">
            {socialLinks.map((social) => (
              <Link key={social.label} href={social.href} className="p-3 bg-white rounded-full hover:bg-primaryGreen-100 transition-colors">
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Group Menu, Lokasi, Kontak - Kita buat satu flex container */}
        <div className="flex flex-col md:flex-row gap-y-10 gap-x-12 lg:gap-x-16">
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
          <div className="flex flex-col gap-y-4 max-w-[300px]">
            <h2 className="text-white font-bold text-lg">Kunjungi Kami</h2>
            <div className="flex flex-col gap-y-4">
              {locations.map((loc) => (
                <Link key={loc.label} href={loc.href} className="flex flex-col gap-y-1 group">
                  <div className="flex gap-x-2 items-center">
                    <MapPin size={20} color="#fff" />
                    <p className="text-white font-bold text-sm">{loc.label}</p>
                  </div>
                  <p className="text-white/80 text-sm group-hover:text-white transition-colors">{loc.address}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div className="flex flex-col gap-y-6">
            <h2 className="text-white font-bold text-lg">Hubungi Kami</h2>
            <div className="flex flex-col gap-y-6">
              {/* Kontak per Kampus */}
              {[
                { label: 'Kampus 1', phone: '081297974141' },
                { label: 'Kampus 2', phone: '081297974242' },
                { label: 'Kampus 3', phone: '08116087510' },
              ].map((kampus) => (
                <div key={kampus.label} className="flex flex-col gap-y-2">
                  <p className="text-white font-bold text-sm">{kampus.label}</p>
                  <div className="flex gap-x-4">
                    {/* Ikon Telepon */}
                    <a href={`tel:${kampus.phone}`} className="flex items-center gap-x-2 text-white/80 hover:text-white transition-colors">
                      <Phone size={18} />
                      <span className="text-sm">{kampus.phone}</span>
                    </a>
                    {/* Ikon WhatsApp */}
                    <a href={`https://wa.me/62${kampus.phone.substring(1)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2 text-white/80 hover:text-white transition-colors">
                      <MessageCircle size={18} />
                      <span className="text-sm">WhatsApp {kampus.label}</span>
                    </a>
                  </div>
                </div>
              ))}

              {/* Email */}
              <a href="mailto:info@harapan.ac.id" className="flex items-center gap-x-2 text-white/80 hover:text-white transition-colors">
                <Mail size={18} />
                <span className="text-sm">info@harapan.ac.id</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="font-medium text-white text-center text-sm md:text-base">&copy; {copyRight} Yayasan Pendidikan Harapan.</p>
    </footer>
  );
}
