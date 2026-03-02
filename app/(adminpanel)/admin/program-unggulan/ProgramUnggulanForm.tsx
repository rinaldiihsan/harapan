'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/compressImage';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Gunakan z.string() untuk order lalu parse manual — hindari konflik z.coerce dengan react-hook-form
const schema = z.object({
  name: z.string().min(1, { message: 'Nama program harus diisi' }),
  order: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Urutan harus berupa angka dan tidak boleh negatif',
  }),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  data?: {
    id: number;
    name: string;
    photo: string;
    order: number;
  } | null;
  onSuccess: () => void;
}

export default function ProgramUnggulanForm({ data, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const isEdit = !!data;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name ?? '',
      order: String(data?.order ?? 0),
    },
  });

  useEffect(() => {
    form.reset({
      name: data?.name ?? '',
      order: String(data?.order ?? 0),
    });
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
      toast.error('Foto program harus diisi');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('order', values.order); // sudah string, API parse sendiri

      if (file) {
        const compressed = await compressImage(file);
        formData.append('photo', compressed);
      }

      const url = isEdit ? `/api/program-unggulan/${data.id}` : '/api/program-unggulan';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message ?? 'Gagal menyimpan program unggulan');
        return;
      }

      toast.success(isEdit ? 'Program unggulan berhasil diupdate' : 'Program unggulan berhasil ditambahkan');
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Nama Program</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Kurikulum Merdeka" className="border-gray-300 focus-visible:ring-primaryGreen-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Urutan Tampil</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="0" className="border-gray-300 focus-visible:ring-primaryGreen-600" {...field} />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500">Angka lebih kecil tampil lebih dulu</p>
            </FormItem>
          )}
        />

        {/* Foto Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Foto {isEdit && <span className="text-gray-500 font-normal">(kosongkan jika tidak ingin mengubah)</span>}</label>

          {isEdit && data.photo && !preview && (
            <div className="relative w-32 h-32 rounded-lg border border-gray-200 overflow-hidden">
              <Image src={data.photo} alt="existing" fill sizes="128px" className="object-cover" />
              <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black/40 text-white py-0.5">Foto saat ini</span>
            </div>
          )}

          {preview && (
            <div className="relative w-32 h-32 rounded-lg border border-gray-200 overflow-hidden">
              <Image src={preview} alt="preview" fill sizes="128px" className="object-cover" />
              <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black/40 text-white py-0.5">Preview</span>
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
