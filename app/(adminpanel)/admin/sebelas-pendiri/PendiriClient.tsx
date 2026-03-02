'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PendiriForm from './PendiriForm';

interface Pendiri {
  id: number;
  name: string;
  photo: string;
  order: number;
}

export default function PendiriClient() {
  const [list, setList] = useState<Pendiri[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Pendiri | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/founder');
      const data = await res.json();
      setList(data.data ?? []);
    } catch {
      toast.error('Gagal memuat data pendiri');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleEdit = (item: Pendiri) => {
    setSelected(item);
    setOpenForm(true);
  };

  const handleDeleteConfirm = (item: Pendiri) => {
    setSelected(item);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!selected) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/founder/${selected.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message ?? 'Gagal menghapus pendiri');
        return;
      }

      toast.success('Pendiri berhasil dihapus');
      setOpenDelete(false);
      setSelected(null);
      fetchData();
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-black">Sebelas Pendiri Yayasan</h1>
          <p className="text-sm text-gray-500 mt-0.5">{list.length}/11 pendiri terdaftar</p>
        </div>
        <Button onClick={handleCreate} disabled={list.length >= 11} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white disabled:opacity-50">
          <Plus size={16} className="mr-2" />
          Tambah Pendiri
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black w-12">No</TableHead>
              <TableHead className="text-black">Foto</TableHead>
              <TableHead className="text-black">Nama</TableHead>
              <TableHead className="text-black w-24">Urutan</TableHead>
              <TableHead className="text-black text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <div className="h-10 bg-gray-100 animate-pulse rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-black py-10">
                  Belum ada data pendiri
                </TableCell>
              </TableRow>
            ) : (
              list.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-black">{index + 1}</TableCell>
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primaryGreen-700">
                      <Image src={item.photo} alt={item.name} fill sizes="48px" className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="text-black font-medium">{item.name}</TableCell>
                  <TableCell className="text-black">{item.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
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

      {/* Form Dialog */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-black">{selected ? 'Edit Pendiri' : 'Tambah Pendiri'}</DialogTitle>
          </DialogHeader>
          <PendiriForm
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
            <DialogTitle className="text-black">Hapus Pendiri</DialogTitle>
          </DialogHeader>
          <p className="text-black text-sm">
            Yakin ingin menghapus <span className="font-medium">"{selected?.name}"</span>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenDelete(false)} disabled={isDeleting} className="text-black">
              Batal
            </Button>
            <Button onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700 text-white">
              {isDeleting ? 'Menghapus...' : 'Hapus'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
