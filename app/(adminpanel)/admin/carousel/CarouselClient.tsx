'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CarouselForm from './CarouselForm';

interface Carousel {
  id: number;
  carousel_image: string;
  carousel_caption: string;
  carousel_desc: string;
  createdAt: string;
}

export default function CarouselClient() {
  const [carouselList, setCarouselList] = useState<Carousel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [selected, setSelected] = useState<Carousel | null>(null);

  const fetchCarousel = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/carousel');
      const data = await res.json();
      setCarouselList(data.data ?? []);
    } catch {
      toast.error('Gagal memuat data carousel');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  const handleCreate = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleEdit = (carousel: Carousel) => {
    setSelected(carousel);
    setOpenForm(true);
  };

  const handlePreview = (carousel: Carousel) => {
    setSelected(carousel);
    setOpenPreview(true);
  };

  const handleDeleteConfirm = (carousel: Carousel) => {
    setSelected(carousel);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/carousel/${selected.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error('Gagal menghapus carousel');
        return;
      }

      toast.success('Carousel berhasil dihapus');
      setOpenDelete(false);
      fetchCarousel();
    } catch {
      toast.error('Terjadi kesalahan');
    }
  };

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-black">Carousel</h1>
        <Button onClick={handleCreate} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
          <Plus size={16} className="mr-2" />
          Tambah Carousel
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black w-12">No</TableHead>
              <TableHead className="text-black">Gambar</TableHead>
              <TableHead className="text-black">Caption</TableHead>
              <TableHead className="text-black">Deskripsi</TableHead>
              <TableHead className="text-black">Tanggal</TableHead>
              <TableHead className="text-black text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-black py-10">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : carouselList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-black py-10">
                  Belum ada data carousel
                </TableCell>
              </TableRow>
            ) : (
              carouselList.map((carousel, index) => (
                <TableRow key={carousel.id}>
                  <TableCell className="text-black">{index + 1}</TableCell>
                  <TableCell>
                    <img src={carousel.carousel_image} alt={carousel.carousel_caption} className="h-12 w-20 object-cover rounded" />
                  </TableCell>
                  <TableCell className="text-black font-medium max-w-xs truncate">{carousel.carousel_caption}</TableCell>
                  <TableCell className="text-black max-w-xs">
                    <p className="truncate">{carousel.carousel_desc}</p>
                  </TableCell>
                  <TableCell className="text-black">{new Date(carousel.createdAt).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handlePreview(carousel)} className="border-gray-200 text-black hover:bg-gray-50">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(carousel)} className="border-primaryGreen-300 text-black hover:bg-primaryGreen-100">
                        <Pencil size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteConfirm(carousel)} className="border-red-200 text-red-600 hover:bg-red-50">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Preview Dialog */}
      <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-black">{selected?.carousel_caption}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <img src={selected.carousel_image} alt={selected.carousel_caption} className="w-full h-64 object-cover rounded-md border border-gray-200" />
              <p className="text-black text-sm leading-relaxed">{selected.carousel_desc}</p>
              <p className="text-xs text-gray-500">
                {new Date(selected.createdAt).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Form Dialog */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-black">{selected ? 'Edit Carousel' : 'Tambah Carousel'}</DialogTitle>
          </DialogHeader>
          <CarouselForm
            data={selected}
            onSuccess={() => {
              setOpenForm(false);
              fetchCarousel();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-black">Hapus Carousel</DialogTitle>
          </DialogHeader>
          <p className="text-black text-sm">
            Yakin ingin menghapus carousel <span className="font-medium">"{selected?.carousel_caption}"</span>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenDelete(false)} className="text-black">
              Batal
            </Button>
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
