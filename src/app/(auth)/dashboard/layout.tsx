import { Sidebar } from '@/components/layout/Sidebar';

import { metadata } from './metadata';

export { metadata };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pl-64">
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
}

export const dynamic = 'force-dynamic';
