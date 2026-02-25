'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/compressImage';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const carouselSchema = z.object({
  carousel_caption: z.string().min(1, { message: 'Caption harus diisi' }),
  carousel_desc: z.string().min(1, { message: 'Deskripsi harus diisi' }),
});

type CarouselFormValues = z.infer<typeof carouselSchema>;

interface Props {
  data?: {
    id: number;
    carousel_image: string;
    carousel_caption: string;
    carousel_desc: string;
  } | null;
  onSuccess: () => void;
}

export default function CarouselForm({ data, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const isEdit = !!data;

  const form = useForm<CarouselFormValues>({
    resolver: zodResolver(carouselSchema),
    defaultValues: {
      carousel_caption: data?.carousel_caption ?? '',
      carousel_desc: data?.carousel_desc ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      carousel_caption: data?.carousel_caption ?? '',
      carousel_desc: data?.carousel_desc ?? '',
    });
    setFile(null);
    setPreview(null);
  }, [data]);

  // Revoke object URL saat unmount agar tidak memory leak
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) return;

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      toast.error('Format file tidak didukung. Gunakan JPG, PNG, atau WEBP');
      e.target.value = '';
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      toast.error('Ukuran file terlalu besar. Maksimal 3MB');
      e.target.value = '';
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const onSubmit = async (values: CarouselFormValues) => {
    if (!isEdit && !file) {
      toast.error('Gambar harus diisi');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();

      formData.append('carousel_caption', values.carousel_caption);
      formData.append('carousel_desc', values.carousel_desc);

      if (file) {
        const compressed = await compressImage(file);
        formData.append('carousel_image', compressed);
      }

      const url = isEdit ? `/api/carousel/${data.id}` : '/api/carousel';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message ?? 'Gagal menyimpan carousel');
        return;
      }

      toast.success(isEdit ? 'Carousel berhasil diupdate' : 'Carousel berhasil ditambahkan');
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
          name="carousel_caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Caption</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan caption carousel" className="border-gray-300 focus-visible:ring-primaryGreen-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carousel_desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Deskripsi</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan deskripsi carousel" rows={4} className="border-gray-300 focus-visible:ring-primaryGreen-600 resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Gambar {isEdit && <span className="text-gray-500 font-normal">(kosongkan jika tidak ingin mengubah)</span>}</label>

          {/* Gambar existing saat edit */}
          {isEdit && data.carousel_image && !preview && (
            <div className="relative w-full h-40 rounded border border-gray-200 overflow-hidden">
              <Image src={data.carousel_image} alt="existing" fill sizes="(max-width: 512px) 100vw, 512px" className="object-cover" />
              <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black/40 text-white rounded-b py-0.5">Gambar saat ini</span>
            </div>
          )}

          {/* Preview gambar baru */}
          {preview && (
            <div className="relative w-full h-40 rounded border border-gray-200 overflow-hidden">
              <Image src={preview} alt="preview" fill sizes="(max-width: 512px) 100vw, 512px" className="object-cover" />
              <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black/40 text-white rounded-b py-0.5">Preview gambar baru</span>
            </div>
          )}

          <Input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="border-gray-300 focus-visible:ring-primaryGreen-600" onChange={handleFileChange} />
          <p className="text-xs text-gray-500">Format: JPG, PNG, WEBP. Maks 3MB.</p>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isLoading} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
            {isLoading ? 'Menyimpan...' : isEdit ? 'Update' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
