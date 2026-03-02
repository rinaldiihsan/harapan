'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/compressImage';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const schema = z.object({
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  data?: {
    id: number;
    image: string;
    description: string;
  } | null;
  onSuccess: () => void;
}

export default function StrukturForm({ data, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const isEdit = !!data;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: data?.description ?? '',
    },
  });

  useEffect(() => {
    form.reset({ description: data?.description ?? '' });
    setFile(null);
    setPreview(null);
  }, [data]);

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

  const onSubmit = async (values: FormValues) => {
    if (!isEdit && !file) {
      toast.error('Gambar struktur organisasi harus diisi');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();

      if (values.description) formData.append('description', values.description);

      if (file) {
        const compressed = await compressImage(file);
        formData.append('image', compressed);
      }

      // POST kalau belum ada data, PUT kalau sudah ada
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch('/api/struktur-organisasi', {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message ?? 'Gagal menyimpan struktur organisasi');
        return;
      }

      toast.success(isEdit ? 'Struktur organisasi berhasil diupdate' : 'Struktur organisasi berhasil diupload');
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
        {/* Gambar Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Gambar Struktur {isEdit && <span className="text-gray-500 font-normal">(kosongkan jika tidak ingin mengubah)</span>}</label>

          {/* Gambar existing */}
          {isEdit && data.image && !preview && (
            <div className="relative w-full aspect-[3/4] max-h-64 rounded-lg border border-gray-200 overflow-hidden">
              <Image src={data.image} alt="existing" fill sizes="(max-width: 512px) 100vw, 512px" className="object-contain" />
              <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black/40 text-white py-0.5">Gambar saat ini</span>
            </div>
          )}

          {/* Preview gambar baru */}
          {preview && (
            <div className="relative w-full aspect-[3/4] max-h-64 rounded-lg border border-gray-200 overflow-hidden">
              <Image src={preview} alt="preview" fill sizes="(max-width: 512px) 100vw, 512px" className="object-contain" />
              <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black/40 text-white py-0.5">Preview gambar baru</span>
            </div>
          )}

          <Input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="border-gray-300 focus-visible:ring-primaryGreen-600" onChange={handleFileChange} />
          <p className="text-xs text-gray-500">Format: JPG, PNG, WEBP. Maks 3MB. Hanya 1 gambar.</p>
        </div>

        {/* Deskripsi */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Deskripsi <span className="text-gray-500 font-normal">(opsional)</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan deskripsi singkat struktur organisasi" rows={3} className="border-gray-300 focus-visible:ring-primaryGreen-600 resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isLoading} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
            {isLoading ? 'Menyimpan...' : isEdit ? 'Update' : 'Upload'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
