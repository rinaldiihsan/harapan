import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="pt-16">
      <h1 className="text-xl font-semibold text-black mb-6">Dashboard</h1>
      <p className="text-black">Selamat datang di Harapan Admin.</p>
    </div>
  );
}
