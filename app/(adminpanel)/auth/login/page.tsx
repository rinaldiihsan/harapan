'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginForm) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message ?? 'Login gagal');
        return;
      }

      // Simpan accessToken di localStorage
      localStorage.setItem('accessToken', data.accessToken);

      toast.success('Login berhasil');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error('Terjadi kesalahan, coba lagi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primaryGreen-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-primaryGreen-300 shadow-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-semibold text-black">Harapan Admin Panel</CardTitle>
          <CardDescription className="text-black">Masuk untuk mengelola konten website</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@email.com" className="border-primaryGreen-300 focus-visible:ring-primaryGreen-600" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" className="border-primaryGreen-300 focus-visible:ring-primaryGreen-600" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full bg-primaryGreen-700 hover:bg-primaryGreen-800 text-white mt-2">
                {isLoading ? 'Memproses...' : 'Masuk'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
