'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GalleryForm from './GalleryForm';
import axiosAdmin from '@/lib/axiosAdmin'; // <-- import axiosAdmin

interface Gallery {
  id: number;
  gallery_title: string;
  gallery_category: string;
  gallery_image: string[];
  createdAt: string;
}

export default function GalleryClient() {
  const [galleryList, setGalleryList] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [selected, setSelected] = useState<Gallery | null>(null);

  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const res = await axiosAdmin.get('/api/gallery');
      setGalleryList(res.data.data ?? []);
    } catch {
      toast.error('Gagal memuat data galeri');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleCreate = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleEdit = (gallery: Gallery) => {
    setSelected(gallery);
    setOpenForm(true);
  };

  const handlePreview = (gallery: Gallery) => {
    setSelected(gallery);
    setOpenPreview(true);
  };

  const handleDeleteConfirm = (gallery: Gallery) => {
    setSelected(gallery);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await axiosAdmin.delete(`/api/gallery/${selected.id}`);

      toast.success('Galeri berhasil dihapus');
      setOpenDelete(false);
      fetchGallery();
    } catch (error: any) {
      const message = error?.response?.data?.message ?? 'Gagal menghapus galeri';
      toast.error(message);
    }
  };

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-black">Galeri</h1>
        <Button onClick={handleCreate} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
          <Plus size={16} className="mr-2" />
          Tambah Galeri
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black w-12">No</TableHead>
              <TableHead className="text-black">Judul</TableHead>
              <TableHead className="text-black">Kategori</TableHead>
              <TableHead className="text-black">Gambar</TableHead>
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
            ) : galleryList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-black py-10">
                  Belum ada data galeri
                </TableCell>
              </TableRow>
            ) : (
              galleryList.map((gallery, index) => (
                <TableRow key={gallery.id}>
                  <TableCell className="text-black">{index + 1}</TableCell>
                  <TableCell className="text-black font-medium max-w-xs truncate">{gallery.gallery_title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primaryGreen-100 text-primaryGreen-800">{gallery.gallery_category}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {gallery.gallery_image[0] && <img src={gallery.gallery_image[0]} alt={gallery.gallery_title} className="h-10 w-16 object-cover rounded" />}
                      {gallery.gallery_image.length > 1 && <span className="text-xs text-gray-500">+{gallery.gallery_image.length - 1}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-black">{new Date(gallery.createdAt).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handlePreview(gallery)} className="border-gray-200 text-black hover:bg-gray-50">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(gallery)} className="border-primaryGreen-300 text-black hover:bg-primaryGreen-100">
                        <Pencil size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteConfirm(gallery)} className="border-red-200 text-red-600 hover:bg-red-50">
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">{selected?.gallery_title}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-primaryGreen-100 text-primaryGreen-800">{selected.gallery_category}</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {selected.gallery_image.map((url, i) => (
                  <img key={i} src={url} alt={`gambar-${i + 1}`} className="w-full h-40 object-cover rounded-md border border-gray-200" />
                ))}
              </div>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">{selected ? 'Edit Galeri' : 'Tambah Galeri'}</DialogTitle>
          </DialogHeader>
          <GalleryForm
            data={selected}
            onSuccess={() => {
              setOpenForm(false);
              fetchGallery();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-black">Hapus Galeri</DialogTitle>
          </DialogHeader>
          <p className="text-black text-sm">
            Yakin ingin menghapus galeri <span className="font-medium">"{selected?.gallery_title}"</span>? Tindakan ini tidak dapat dibatalkan.
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
