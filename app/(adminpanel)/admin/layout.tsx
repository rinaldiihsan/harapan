import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/admin/Navbar';
import Sidebar from '@/components/admin/Sidebar';

export const metadata: Metadata = {
  title: {
    template: '%s | Harapan Admin',
    default: 'Harapan Admin',
  },
  description: 'Admin Panel Yayasan Harapan',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">{children}</main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
