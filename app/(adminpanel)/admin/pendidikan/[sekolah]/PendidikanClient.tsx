'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { UseFieldArrayReturn, UseFormReturn, FieldArrayPath } from 'react-hook-form';

const SCHOOL_LABELS: Record<string, string> = {
  SD1: 'SD Harapan 1',
  SD2: 'SD Harapan 2',
  SD3: 'SD Harapan 3',
  SMP1: 'SMP Harapan 1',
  SMP2: 'SMP Harapan 2',
  SMP3: 'SMP Harapan 3',
  SMA1: 'SMA Harapan 1',
  SMA3: 'SMA Harapan 3',
};

const schema = z.object({
  kepalaSekolah: z.string().optional(),
  visi: z.string().optional(),
  misi: z.array(z.object({ value: z.string().min(1, 'Misi tidak boleh kosong') })),
  programUnggulan: z.array(z.object({ value: z.string().min(1, 'Program tidak boleh kosong') })),
  fasilitas: z.array(z.object({ value: z.string().min(1, 'Fasilitas tidak boleh kosong') })),
  ekstrakurikuler: z.array(z.object({ value: z.string().min(1, 'Ekstrakurikuler tidak boleh kosong') })),
  kegiatanSekolah: z.array(z.object({ value: z.string().min(1, 'Kegiatan tidak boleh kosong') })),
});

type FormValues = z.infer<typeof schema>;

const toFieldArray = (arr: string[] = []) => arr.map((value) => ({ value }));
const fromFieldArray = (arr: { value: string }[]) => arr.map((item) => item.value);

interface Props {
  sekolah: string;
}

export default function PendidikanClient({ sekolah }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const label = SCHOOL_LABELS[sekolah] ?? sekolah;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      kepalaSekolah: '',
      visi: '',
      misi: [],
      programUnggulan: [],
      fasilitas: [],
      ekstrakurikuler: [],
      kegiatanSekolah: [],
    },
  });

  const misiField = useFieldArray({ control: form.control, name: 'misi' });
  const programField = useFieldArray({
    control: form.control,
    name: 'programUnggulan',
  });
  const fasilitasField = useFieldArray({
    control: form.control,
    name: 'fasilitas',
  });
  const ekstraField = useFieldArray({
    control: form.control,
    name: 'ekstrakurikuler',
  });
  const kegiatanField = useFieldArray({
    control: form.control,
    name: 'kegiatanSekolah',
  });

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/pendidikan?sekolah=${sekolah}`);
      const json = await res.json();
      const data = json.data;

      if (data) {
        form.reset({
          kepalaSekolah: data.kepalaSekolah ?? '',
          visi: data.visi ?? '',
          misi: toFieldArray(data.misi),
          programUnggulan: toFieldArray(data.programUnggulan),
          fasilitas: toFieldArray(data.fasilitas),
          ekstrakurikuler: toFieldArray(data.ekstrakurikuler),
          kegiatanSekolah: toFieldArray(data.kegiatanSekolah),
        });
      }
    } catch {
      toast.error('Gagal memuat data');
    } finally {
      setIsLoading(false);
    }
  }, [sekolah, form]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (values: FormValues) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('accessToken');

      const res = await fetch(`/api/pendidikan?sekolah=${sekolah}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          kepalaSekolah: values.kepalaSekolah,
          visi: values.visi,
          misi: fromFieldArray(values.misi),
          programUnggulan: fromFieldArray(values.programUnggulan),
          fasilitas: fromFieldArray(values.fasilitas),
          ekstrakurikuler: fromFieldArray(values.ekstrakurikuler),
          kegiatanSekolah: fromFieldArray(values.kegiatanSekolah),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message ?? 'Gagal menyimpan');
        return;
      }

      toast.success('Konten berhasil disimpan');
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 flex flex-col gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-black">{label}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola konten halaman pendidikan</p>
        </div>

        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSaving} className="bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white">
          <Save size={16} className="mr-2" />
          {isSaving ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Kepala Sekolah */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-black mb-4">Kepala Sekolah</h2>

            <FormField
              control={form.control}
              name="kepalaSekolah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Nama Kepala Sekolah</FormLabel>

                  <FormControl>
                    <Input placeholder="Contoh: Drs. Ahmad Fauzi, M.Pd" className="border-gray-300 focus-visible:ring-primaryGreen-600" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Visi */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-black mb-4">Visi</h2>

            <FormField
              control={form.control}
              name="visi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Pernyataan Visi</FormLabel>

                  <FormControl>
                    <Textarea placeholder="Masukkan visi sekolah" rows={3} className="border-gray-300 focus-visible:ring-primaryGreen-600 resize-none" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ArraySection label="Misi" placeholder="Masukkan poin misi" fieldArray={misiField} name="misi" form={form} />

          <ArraySection label="Program Unggulan" placeholder="Contoh: Kurikulum Merdeka" fieldArray={programField} name="programUnggulan" form={form} />

          <ArraySection label="Fasilitas" placeholder="Contoh: Laboratorium Komputer" fieldArray={fasilitasField} name="fasilitas" form={form} />

          <ArraySection label="Ekstrakurikuler" placeholder="Contoh: Pramuka" fieldArray={ekstraField} name="ekstrakurikuler" form={form} />

          <ArraySection label="Kegiatan Sekolah" placeholder="Contoh: Pentas Seni Tahunan" fieldArray={kegiatanField} name="kegiatanSekolah" form={form} />
        </form>
      </Form>
    </div>
  );
}

interface ArraySectionProps<TFieldName extends FieldArrayPath<FormValues>> {
  label: string;
  placeholder: string;
  fieldArray: UseFieldArrayReturn<FormValues, TFieldName, 'id'>;
  name: TFieldName;
  form: UseFormReturn<FormValues>;
}

function ArraySection<TFieldName extends FieldArrayPath<FormValues>>({ label, placeholder, fieldArray, name, form }: ArraySectionProps<TFieldName>) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-black">{label}</h2>

        <Button type="button" size="sm" variant="outline" onClick={() => fieldArray.append({ value: '' } as any)} className="border-primaryGreen-300 text-black hover:bg-primaryGreen-100">
          <Plus size={14} className="mr-1" />
          Tambah
        </Button>
      </div>

      {fieldArray.fields.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">Belum ada data. Klik "Tambah" untuk menambahkan.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {fieldArray.fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <span className="mt-2.5 text-sm text-gray-400 w-5 text-right">{index + 1}.</span>

              <FormField
                control={form.control}
                name={`${name}.${index}.value` as any}
                render={({ field: inputField }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={placeholder} className="border-gray-300 focus-visible:ring-primaryGreen-600" {...inputField} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="button" size="sm" variant="outline" onClick={() => fieldArray.remove(index)} className="mt-0.5 border-red-200 text-red-500 hover:bg-red-50">
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
