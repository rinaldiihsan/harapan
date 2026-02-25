'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NewsForm from './NewsForm';
import axiosAdmin from '@/lib/axiosAdmin'; // <-- import axiosAdmin

interface News {
  id: number;
  news_title: string;
  news_content: string;
  news_images: string[];
  createdAt: string;
}

export default function NewsClient() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [selected, setSelected] = useState<News | null>(null);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      // GET publik — tidak perlu token, cukup axios biasa, tapi axiosAdmin juga aman dipakai
      const res = await axiosAdmin.get('/api/news');
      setNewsList(res.data.data ?? []);
    } catch {
      toast.error('Gagal memuat data berita');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreate = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleEdit = (news: News) => {
    setSelected(news);
    setOpenForm(true);
  };

  const handlePreview = (news: News) => {
    setSelected(news);
    setOpenPreview(true);
  };

  const handleDeleteConfirm = (news: News) => {
    setSelected(news);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      // axiosAdmin otomatis attach token + handle refresh jika 401
      await axiosAdmin.delete(`/api/news/${selected.id}`);

      toast.success('Berita berhasil dihapus');
      setOpenDelete(false);
      fetchNews();
    } catch (error: any) {
      const message = error?.response?.data?.message ?? 'Gagal menghapus berita';
      toast.error(message);
    }
  };

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-black">Berita</h1>
        <Button onClick={handleCreate} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
          <Plus size={16} className="mr-2" />
          Tambah Berita
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black w-12">No</TableHead>
              <TableHead className="text-black">Judul</TableHead>
              <TableHead className="text-black">Gambar</TableHead>
              <TableHead className="text-black">Tanggal</TableHead>
              <TableHead className="text-black text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-black py-10">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : newsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-black py-10">
                  Belum ada data berita
                </TableCell>
              </TableRow>
            ) : (
              newsList.map((news, index) => (
                <TableRow key={news.id}>
                  <TableCell className="text-black">{index + 1}</TableCell>
                  <TableCell className="text-black font-medium max-w-xs truncate">{news.news_title}</TableCell>
                  <TableCell>{news.news_images.length > 0 && <img src={news.news_images[0]} alt={news.news_title} className="h-10 w-16 object-cover rounded" />}</TableCell>
                  <TableCell className="text-black">{new Date(news.createdAt).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handlePreview(news)} className="border-gray-200 text-black hover:bg-gray-50">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(news)} className="border-primaryGreen-300 text-black hover:bg-primaryGreen-100">
                        <Pencil size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteConfirm(news)} className="border-red-200 text-red-600 hover:bg-red-50">
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
            <DialogTitle className="text-black">{selected?.news_title}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              {selected.news_images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {selected.news_images.map((url, i) => (
                    <img key={i} src={url} alt={`gambar-${i + 1}`} className="h-48 w-full object-cover rounded-md border border-gray-200" />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {new Date(selected.createdAt).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="text-black text-sm leading-relaxed whitespace-pre-wrap border-t border-gray-100 pt-4">{selected.news_content}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Form Dialog */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">{selected ? 'Edit Berita' : 'Tambah Berita'}</DialogTitle>
          </DialogHeader>
          <NewsForm
            data={selected}
            onSuccess={() => {
              setOpenForm(false);
              fetchNews();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-black">Hapus Berita</DialogTitle>
          </DialogHeader>
          <p className="text-black text-sm">
            Yakin ingin menghapus berita <span className="font-medium">"{selected?.news_title}"</span>? Tindakan ini tidak dapat dibatalkan.
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
