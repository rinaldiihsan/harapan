'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FaqForm from './FaqForm';
import axiosAdmin from '@/lib/axiosAdmin';

interface Faq {
  id: number;
  faq_title: string;
  faq_desc: string;
  // createdAt dihapus — tidak ada di response API (tidak di-select)
}

export default function FaqClient() {
  const [faqList, setFaqList] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Faq | null>(null);

  const fetchFaq = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axiosAdmin.get('/api/faq');
      setFaqList(res.data.data ?? []);
    } catch {
      toast.error('Gagal memuat data FAQ');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaq();
  }, [fetchFaq]);

  const handleCreate = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleEdit = (faq: Faq) => {
    setSelected(faq);
    setOpenForm(true);
  };

  const handleDeleteConfirm = (faq: Faq) => {
    setSelected(faq);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!selected) return;
    setIsDeleting(true);
    try {
      await axiosAdmin.delete(`/api/faq/${selected.id}`);
      toast.success('FAQ berhasil dihapus');
      setOpenDelete(false);
      setSelected(null);
      fetchFaq();
    } catch (error: any) {
      const message = error?.response?.data?.message ?? 'Gagal menghapus FAQ';
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-black">FAQ</h1>
          <p className="text-sm text-gray-500 mt-0.5">{faqList.length}/6 FAQ tersedia</p>
        </div>
        <Button onClick={handleCreate} disabled={faqList.length >= 6} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white disabled:opacity-50">
          <Plus size={16} className="mr-2" />
          Tambah FAQ
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black w-12">No</TableHead>
              <TableHead className="text-black">Pertanyaan</TableHead>
              <TableHead className="text-black">Jawaban</TableHead>
              <TableHead className="text-black text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <div className="h-10 bg-gray-100 animate-pulse rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : faqList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-black py-10">
                  Belum ada data FAQ
                </TableCell>
              </TableRow>
            ) : (
              faqList.map((faq, index) => (
                <TableRow key={faq.id}>
                  <TableCell className="text-black">{index + 1}</TableCell>
                  <TableCell className="text-black font-medium max-w-xs">{faq.faq_title}</TableCell>
                  <TableCell className="text-black max-w-sm">
                    <p className="truncate">{faq.faq_desc}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(faq)} className="border-primaryGreen-300 text-black hover:bg-primaryGreen-100">
                        <Pencil size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteConfirm(faq)} className="border-red-200 text-red-600 hover:bg-red-50">
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
            <DialogTitle className="text-black">{selected ? 'Edit FAQ' : 'Tambah FAQ'}</DialogTitle>
          </DialogHeader>
          <FaqForm
            data={selected}
            onSuccess={() => {
              setOpenForm(false);
              fetchFaq();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-black">Hapus FAQ</DialogTitle>
          </DialogHeader>
          <p className="text-black text-sm">
            Yakin ingin menghapus FAQ <span className="font-medium">"{selected?.faq_title}"</span>? Tindakan ini tidak dapat dibatalkan.
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
