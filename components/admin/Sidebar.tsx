'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Newspaper, Images, GalleryHorizontal, CircleHelp, UserRound, Home, Info, GraduationCap, ChevronDown, Users, Network, School } from 'lucide-react';

interface ChildItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: ChildItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Beranda',
    icon: Home,
    children: [
      { label: 'Berita', href: '/admin/news' },
      { label: 'Galeri', href: '/admin/gallery' },
      { label: 'Carousel', href: '/admin/carousel' },
      { label: 'FAQ', href: '/admin/faq' },
      { label: 'Ketua Yayasan', href: '/admin/ketuayayasan' },
      { label: 'Program Unggulan', href: '/admin/program-unggulan' },
    ],
  },
  {
    label: 'Tentang Kami',
    icon: Info,
    children: [
      { label: 'Sebelas Pendiri', href: '/admin/sebelas-pendiri' },
      { label: 'Struktur Organisasi', href: '/admin/struktur-organisasi' },
    ],
  },
  {
    label: 'Pendidikan',
    icon: GraduationCap,
    children: [
      { label: 'SD Harapan 1', href: '/admin/pendidikan/SD1' },
      { label: 'SD Harapan 2', href: '/admin/pendidikan/SD2' },
      { label: 'SD Harapan 3', href: '/admin/pendidikan/SD3' },
      { label: 'SMP Harapan 1', href: '/admin/pendidikan/SMP1' },
      { label: 'SMP Harapan 2', href: '/admin/pendidikan/SMP2' },
      { label: 'SMP Harapan 3', href: '/admin/pendidikan/SMP3' },
      { label: 'SMA Harapan 1', href: '/admin/pendidikan/SMA1' },
      { label: 'SMA Harapan 3', href: '/admin/pendidikan/SMA3' },
    ],
  },
];

function SidebarItem({ item }: { item: MenuItem }) {
  const pathname = usePathname();

  // Cek apakah salah satu child aktif
  const isChildActive = item.children?.some((child) => pathname === child.href) ?? false;
  const isDirectActive = item.href ? pathname === item.href : false;

  // Auto-expand kalau salah satu child sedang aktif
  const [isOpen, setIsOpen] = useState(isChildActive);

  // Update saat navigasi
  useEffect(() => {
    if (isChildActive) setIsOpen(true);
  }, [isChildActive]);

  const Icon = item.icon;

  // Menu tanpa children (Dashboard)
  if (!item.children) {
    return (
      <Link href={item.href!} className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isDirectActive ? 'bg-primaryGreen-700 text-white' : 'text-black hover:bg-primaryGreen-100'}`}>
        <Icon size={18} />
        {item.label}
      </Link>
    );
  }

  // Menu dengan children
  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isChildActive ? 'bg-primaryGreen-50 text-primaryGreen-700' : 'text-black hover:bg-primaryGreen-100'}`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          {item.label}
        </div>
        <ChevronDown size={15} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Children */}
      {isOpen && (
        <div className="mt-1 ml-4 flex flex-col gap-0.5 border-l-2 border-primaryGreen-100 pl-3">
          {item.children.map((child) => {
            const isActive = pathname === child.href;
            return (
              <Link
                key={child.href}
                href={child.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${isActive ? 'bg-primaryGreen-700 text-white font-medium' : 'text-gray-600 hover:bg-primaryGreen-100 hover:text-black'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-none ${isActive ? 'bg-white' : 'bg-gray-400'}`} />
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-16 pt-6 overflow-y-auto">
      <nav className="flex flex-col gap-1 px-3 pb-10">
        {menuItems.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </nav>
    </aside>
  );
}
