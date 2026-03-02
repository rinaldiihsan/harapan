'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StrukturForm from './StrukturForm';

interface StrukturOrganisasi {
  id: number;
  image: string;
  description: string;
}

export default function StrukturClient() {
  const [data, setData] = useState<StrukturOrganisasi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/struktur-organisasi');
      const json = await res.json();
      setData(json.data ?? null);
    } catch {
      toast.error('Gagal memuat data struktur organisasi');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-black">Struktur Organisasi</h1>
        <Button onClick={() => setOpenForm(true)} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
          <Pencil size={16} className="mr-2" />
          {data ? 'Edit Struktur' : 'Upload Struktur'}
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="w-full max-w-md mx-auto aspect-[3/4] bg-gray-100 animate-pulse rounded-lg" />
            <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3 mx-auto" />
          </div>
        ) : !data ? (
          <div className="text-center py-20 text-gray-500">
            <p className="mb-3">Belum ada data struktur organisasi</p>
            <Button onClick={() => setOpenForm(true)} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
              Upload Sekarang
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {/* Preview gambar */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-lg border border-gray-200 overflow-hidden shadow-md">
              <Image src={data.image} alt="Struktur Organisasi" fill priority sizes="(max-width: 768px) 100vw, 448px" className="object-contain" />
            </div>

            {/* Deskripsi */}
            {data.description && <p className="text-sm text-gray-600 text-center max-w-lg leading-relaxed">{data.description}</p>}
          </div>
        )}
      </div>

      {/* Form Dialog */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-black">{data ? 'Edit Struktur Organisasi' : 'Upload Struktur Organisasi'}</DialogTitle>
          </DialogHeader>
          <StrukturForm
            data={data}
            onSuccess={() => {
              setOpenForm(false);
              fetchData();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
