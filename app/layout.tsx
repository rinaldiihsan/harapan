import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Yayasan Pendidikan Harapan',
  description:
    'Yayasan Pendidikan Harapan adalah sebuah organisasi yang didedikasikan untuk menyediakan pendidikan berkualitas bagi anak-anak dan remaja di Indonesia. Kami berkomitmen untuk menciptakan lingkungan belajar yang inklusif, inovatif, dan mendukung perkembangan akademis serta karakter siswa kami.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body suppressHydrationWarning>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
