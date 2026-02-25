'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axiosAdmin from '@/lib/axiosAdmin';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosAdmin.delete('/api/auth/logout');
    } catch {
      toast.error('Gagal logout. Silakan coba lagi.');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('loginTime');
      window.location.href = '/auth/login';
    }
  };

  return (
    <nav className="h-16 bg-primaryGreen-700 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-row items-center gap-2">
        <Image src="/logo.png" alt="Logo Harapan" width={50} height={50} className="w-12 h-12" />
        <h1 className="text-white font-semibold text-lg">Harapan Admin</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none">
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarFallback className="bg-primaryGreen-500 text-white text-sm font-medium">AD</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-black">Akun Saya</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:text-red-600">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
