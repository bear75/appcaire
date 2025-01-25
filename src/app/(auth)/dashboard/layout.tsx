import { Sidebar } from '@/components/layout/Sidebar';

export const metadata = {
  title: 'Caire - Dashboard',
  description: 'Hantera din hemtjänst effektivt med Caire.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}

export const dynamic = 'force-dynamic';
