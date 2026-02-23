'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/compressImage';

const newsSchema = z.object({
  news_title: z.string().min(1, { message: 'Judul harus diisi' }),
  news_content: z.string().min(1, { message: 'Konten harus diisi' }),
});

type NewsFormValues = z.infer<typeof newsSchema>;

interface ImageSlot {
  id: number;
  file: File | null;
  preview: string | null;
}

interface Props {
  data?: {
    id: number;
    news_title: string;
    news_content: string;
    news_images: string[];
  } | null;
  onSuccess: () => void;
}

export default function NewsForm({ data, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([{ id: 1, file: null, preview: null }]);
  const isEdit = !!data;

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      news_title: data?.news_title ?? '',
      news_content: data?.news_content ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      news_title: data?.news_title ?? '',
      news_content: data?.news_content ?? '',
    });
    // Reset image slots saat data berubah
    setImageSlots([{ id: 1, file: null, preview: null }]);
  }, [data]);

  const addSlot = () => {
    if (imageSlots.length >= 5) {
      toast.error('Maksimal 5 gambar');
      return;
    }
    setImageSlots((prev) => [...prev, { id: prev[prev.length - 1].id + 1, file: null, preview: null }]);
  };

  const removeSlot = (id: number) => {
    if (imageSlots.length === 1) return;
    setImageSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  const handleFileChange = (id: number, file: File | null) => {
    setImageSlots((prev) =>
      prev.map((slot) => {
        if (slot.id !== id) return slot;
        return {
          ...slot,
          file,
          preview: file ? URL.createObjectURL(file) : null,
        };
      }),
    );
  };

  const onSubmit = async (values: NewsFormValues) => {
    const filledSlots = imageSlots.filter((slot) => slot.file !== null);

    if (!isEdit && filledSlots.length === 0) {
      toast.error('Minimal 1 gambar harus diisi');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();

      formData.append('news_title', values.news_title);
      formData.append('news_content', values.news_content);

      // Compress semua gambar sebelum upload
      const compressedFiles = await Promise.all(
        filledSlots.map(async (slot) => {
          if (!slot.file) return null;
          return await compressImage(slot.file);
        }),
      );

      compressedFiles.forEach((file) => {
        if (file) formData.append('news_images', file);
      });

      const url = isEdit ? `/api/news/${data.id}` : '/api/news';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message ?? 'Gagal menyimpan berita');
        return;
      }

      toast.success(isEdit ? 'Berita berhasil diupdate' : 'Berita berhasil ditambahkan');
      onSuccess();
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="news_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Judul Berita</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul berita" className="border-gray-300 focus-visible:ring-primaryGreen-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="news_content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Konten</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan konten berita" rows={6} className="border-gray-300 focus-visible:ring-primaryGreen-600 resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Slots */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Gambar {isEdit && '(kosongkan jika tidak ingin mengubah gambar)'}</label>

          {/* Existing images saat edit */}
          {isEdit && data.news_images.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-2">
              {data.news_images.map((url, i) => (
                <div key={i} className="relative">
                  <img src={url} alt={`existing-${i + 1}`} className="h-16 w-24 object-cover rounded border border-gray-200" />
                  <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black/40 text-white rounded-b py-0.5">Saat ini</span>
                </div>
              ))}
            </div>
          )}

          {/* Dynamic slots */}
          {imageSlots.map((slot, index) => (
            <div key={slot.id} className="flex items-center gap-2">
              <div className="flex-1 space-y-1">
                <Input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="border-gray-300 focus-visible:ring-primaryGreen-600" onChange={(e) => handleFileChange(slot.id, e.target.files?.[0] ?? null)} />
                {slot.preview && <img src={slot.preview} alt={`preview-${index + 1}`} className="h-16 w-24 object-cover rounded border border-gray-200" />}
              </div>
              {imageSlots.length > 1 && (
                <Button type="button" size="sm" variant="outline" onClick={() => removeSlot(slot.id)} className="border-red-200 text-red-500 hover:bg-red-50 self-start mt-1">
                  <X size={14} />
                </Button>
              )}
            </div>
          ))}

          {imageSlots.length < 5 && (
            <Button type="button" variant="outline" size="sm" onClick={addSlot} className="border-primaryGreen-300 text-black hover:bg-primaryGreen-100 mt-1">
              <Plus size={14} className="mr-1" />
              Tambah Gambar
            </Button>
          )}

          <p className="text-xs text-gray-500">Format: JPG, PNG, WEBP. Maks 3MB per file, maks 5 gambar.</p>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" disabled={isLoading} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
            {isLoading ? 'Menyimpan...' : isEdit ? 'Update' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
