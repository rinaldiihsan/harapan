'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axiosAdmin from '@/lib/axiosAdmin';

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
      <span className="text-white font-semibold text-lg">Harapan Admin</span>

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
