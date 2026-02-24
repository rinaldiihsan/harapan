'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/compressImage';

const ketuaSchema = z.object({
  yayasanName: z.string().min(1, { message: 'Nama harus diisi' }),
  yayasanDesc: z.string().min(1, { message: 'Deskripsi harus diisi' }),
});

type KetuaFormValues = z.infer<typeof ketuaSchema>;

interface Props {
  data?: {
    id: number;
    yayasanName: string;
    yayasanDesc: string;
    yayasanImage: string | null;
  } | null;
  onSuccess: () => void;
}

export default function KetuaYayasanForm({ data, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const isEdit = !!data;

  const form = useForm<KetuaFormValues>({
    resolver: zodResolver(ketuaSchema),
    defaultValues: {
      yayasanName: data?.yayasanName ?? '',
      yayasanDesc: data?.yayasanDesc ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      yayasanName: data?.yayasanName ?? '',
      yayasanDesc: data?.yayasanDesc ?? '',
    });
    setFile(null);
    setPreview(null);
  }, [data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  };

  const onSubmit = async (values: KetuaFormValues) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();

      formData.append('yayasanName', values.yayasanName);
      formData.append('yayasanDesc', values.yayasanDesc);

      if (file) {
        const compressed = await compressImage(file);
        formData.append('yayasanImage', compressed);
      }

      const url = isEdit ? `/api/ketuayayasan/${data.id}` : '/api/ketuayayasan';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message ?? 'Gagal menyimpan data');
        return;
      }

      toast.success(isEdit ? 'Data berhasil diupdate' : 'Data berhasil ditambahkan');
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
          name="yayasanName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Nama</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama ketua yayasan" className="border-gray-300 focus-visible:ring-primaryGreen-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yayasanDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Deskripsi</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan deskripsi ketua yayasan" rows={5} className="border-gray-300 focus-visible:ring-primaryGreen-600 resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Foto {isEdit && '(kosongkan jika tidak ingin mengubah foto)'}</label>

          {/* Preview area */}
          <div className="flex items-center gap-4">
            {preview ? (
              <img src={preview} alt="preview" className="h-20 w-20 object-cover rounded-full border border-gray-200" />
            ) : isEdit && data.yayasanImage ? (
              <img src={data.yayasanImage} alt="existing" className="h-20 w-20 object-cover rounded-full border border-gray-200" />
            ) : (
              <div className="h-20 w-20 rounded-full bg-primaryGreen-100 flex items-center justify-center border border-dashed border-primaryGreen-300">
                <span className="text-primaryGreen-700 text-xs text-center px-1">Belum ada foto</span>
              </div>
            )}
            <div className="flex-1">
              <Input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="border-gray-300 focus-visible:ring-primaryGreen-600" onChange={handleFileChange} />
              <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, WEBP. Maks 3MB.</p>
            </div>
          </div>
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
