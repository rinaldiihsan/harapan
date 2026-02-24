'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const faqSchema = z.object({
  faq_title: z.string().min(1, { message: 'Pertanyaan harus diisi' }),
  faq_desc: z.string().min(1, { message: 'Jawaban harus diisi' }),
});

type FaqFormValues = z.infer<typeof faqSchema>;

interface Props {
  data?: {
    id: number;
    faq_title: string;
    faq_desc: string;
  } | null;
  onSuccess: () => void;
}

export default function FaqForm({ data, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = !!data;

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      faq_title: data?.faq_title ?? '',
      faq_desc: data?.faq_desc ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      faq_title: data?.faq_title ?? '',
      faq_desc: data?.faq_desc ?? '',
    });
  }, [data]);

  const onSubmit = async (values: FaqFormValues) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');

      const url = isEdit ? `/api/faq/${data.id}` : '/api/faq';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message ?? 'Gagal menyimpan FAQ');
        return;
      }

      toast.success(isEdit ? 'FAQ berhasil diupdate' : 'FAQ berhasil ditambahkan');
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
          name="faq_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Pertanyaan</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan pertanyaan" className="border-gray-300 focus-visible:ring-primaryGreen-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="faq_desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Jawaban</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan jawaban" rows={5} className="border-gray-300 focus-visible:ring-primaryGreen-600 resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isLoading} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
            {isLoading ? 'Menyimpan...' : isEdit ? 'Update' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
