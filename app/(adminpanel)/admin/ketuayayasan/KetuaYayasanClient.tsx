'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import KetuaYayasanForm from './KetuaYayasanForm';
import axiosAdmin from '@/lib/axiosAdmin'; // <-- import axiosAdmin

interface KetuaYayasan {
  id: number;
  yayasanName: string;
  yayasanDesc: string;
  yayasanImage: string | null;
  createdAt: string;
}

export default function KetuaYayasanClient() {
  const [list, setList] = useState<KetuaYayasan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [selected, setSelected] = useState<KetuaYayasan | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosAdmin.get('/api/ketuayayasan');
      setList(res.data.data ?? []);
    } catch {
      toast.error('Gagal memuat data ketua yayasan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleEdit = (item: KetuaYayasan) => {
    setSelected(item);
    setOpenForm(true);
  };

  const handlePreview = (item: KetuaYayasan) => {
    setSelected(item);
    setOpenPreview(true);
  };

  const handleDeleteConfirm = (item: KetuaYayasan) => {
    setSelected(item);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await axiosAdmin.delete(`/api/ketuayayasan/${selected.id}`);

      toast.success('Data berhasil dihapus');
      setOpenDelete(false);
      fetchData();
    } catch (error: any) {
      const message = error?.response?.data?.message ?? 'Gagal menghapus data';
      toast.error(message);
    }
  };

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-black">Ketua Yayasan</h1>
        <Button onClick={handleCreate} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
          <Plus size={16} className="mr-2" />
          Tambah Data
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black w-12">No</TableHead>
              <TableHead className="text-black">Foto</TableHead>
              <TableHead className="text-black">Nama</TableHead>
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
            ) : list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-black py-10">
                  Belum ada data ketua yayasan
                </TableCell>
              </TableRow>
            ) : (
              list.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-black">{index + 1}</TableCell>
                  <TableCell>
                    {item.yayasanImage ? (
                      <img src={item.yayasanImage} alt={item.yayasanName} className="h-12 w-12 object-cover rounded-full border border-gray-200" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-primaryGreen-100 flex items-center justify-center">
                        <span className="text-primaryGreen-700 text-sm font-medium">{item.yayasanName.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-black font-medium">{item.yayasanName}</TableCell>
                  <TableCell className="text-black max-w-xs">
                    <p className="truncate">{item.yayasanDesc}</p>
                  </TableCell>
                  <TableCell className="text-black">{new Date(item.createdAt).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handlePreview(item)} className="border-gray-200 text-black hover:bg-gray-50">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="border-primaryGreen-300 text-black hover:bg-primaryGreen-100">
                        <Pencil size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteConfirm(item)} className="border-red-200 text-red-600 hover:bg-red-50">
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-black">Detail Ketua Yayasan</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {selected.yayasanImage ? (
                  <img src={selected.yayasanImage} alt={selected.yayasanName} className="h-20 w-20 object-cover rounded-full border border-gray-200" />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-primaryGreen-100 flex items-center justify-center">
                    <span className="text-primaryGreen-700 text-2xl font-medium">{selected.yayasanName.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <div>
                  <h3 className="text-black font-semibold text-lg">{selected.yayasanName}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(selected.createdAt).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-black text-sm leading-relaxed whitespace-pre-wrap">{selected.yayasanDesc}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Form Dialog */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-black">{selected ? 'Edit Ketua Yayasan' : 'Tambah Ketua Yayasan'}</DialogTitle>
          </DialogHeader>
          <KetuaYayasanForm
            data={selected}
            onSuccess={() => {
              setOpenForm(false);
              fetchData();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-black">Hapus Data</DialogTitle>
          </DialogHeader>
          <p className="text-black text-sm">
            Yakin ingin menghapus data <span className="font-medium">"{selected?.yayasanName}"</span>? Tindakan ini tidak dapat dibatalkan.
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
