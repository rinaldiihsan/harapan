'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/compressImage';
import axiosAdmin from '@/lib/axiosAdmin'; // <-- import axiosAdmin

const gallerySchema = z.object({
  gallery_title: z.string().min(1, { message: 'Judul harus diisi' }),
  gallery_category: z.string().min(1, { message: 'Kategori harus diisi' }),
});

type GalleryFormValues = z.infer<typeof gallerySchema>;

interface ImageSlot {
  id: number;
  file: File | null;
  preview: string | null;
}

interface Props {
  data?: {
    id: number;
    gallery_title: string;
    gallery_category: string;
    gallery_image: string[];
  } | null;
  onSuccess: () => void;
}

export default function GalleryForm({ data, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([{ id: 1, file: null, preview: null }]);
  const isEdit = !!data;

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      gallery_title: data?.gallery_title ?? '',
      gallery_category: data?.gallery_category ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      gallery_title: data?.gallery_title ?? '',
      gallery_category: data?.gallery_category ?? '',
    });
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

  const onSubmit = async (values: GalleryFormValues) => {
    const filledSlots = imageSlots.filter((slot) => slot.file !== null);

    if (!isEdit && filledSlots.length === 0) {
      toast.error('Minimal 1 gambar harus diisi');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append('gallery_title', values.gallery_title);
      formData.append('gallery_category', values.gallery_category);

      const compressedFiles = await Promise.all(
        filledSlots.map(async (slot) => {
          if (!slot.file) return null;
          return await compressImage(slot.file);
        }),
      );

      compressedFiles.forEach((file) => {
        if (file) formData.append('gallery_image', file);
      });

      const url = isEdit ? `/api/gallery/${data.id}` : '/api/gallery';
      const method = isEdit ? 'put' : 'post';

      // axiosAdmin otomatis attach token + handle refresh jika 401
      await axiosAdmin[method](url, formData);

      toast.success(isEdit ? 'Galeri berhasil diupdate' : 'Galeri berhasil ditambahkan');
      onSuccess();
    } catch (error: any) {
      const message = error?.response?.data?.message ?? 'Gagal menyimpan galeri';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="gallery_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Judul Galeri</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul galeri" className="border-gray-300 focus-visible:ring-primaryGreen-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gallery_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Kategori</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Kegiatan, Sosial, Pendidikan" className="border-gray-300 focus-visible:ring-primaryGreen-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Slots */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Gambar {isEdit && '(kosongkan jika tidak ingin mengubah gambar)'}</label>

          {isEdit && data.gallery_image.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-2">
              {data.gallery_image.map((url, i) => (
                <div key={i} className="relative">
                  <img src={url} alt={`existing-${i + 1}`} className="h-20 w-full object-cover rounded border border-gray-200" />
                  <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black/40 text-white rounded-b py-0.5">Saat ini</span>
                </div>
              ))}
            </div>
          )}

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
