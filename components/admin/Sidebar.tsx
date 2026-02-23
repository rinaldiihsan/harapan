'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Newspaper, Images, GalleryHorizontal, CircleHelp, UserRound } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Berita', href: '/admin/news', icon: Newspaper },
  { label: 'Galeri', href: '/admin/gallery', icon: Images },
  { label: 'Carousel', href: '/admin/carousel', icon: GalleryHorizontal },
  { label: 'FAQ', href: '/admin/faq', icon: CircleHelp },
  { label: 'Ketua Yayasan', href: '/admin/ketuayayasan', icon: UserRound },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-16 pt-6">
      <nav className="flex flex-col gap-1 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-primaryGreen-700 text-white' : 'text-black hover:bg-primaryGreen-100'}`}>
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
