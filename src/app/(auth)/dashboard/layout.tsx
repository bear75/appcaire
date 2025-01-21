import { Sidebar } from '@/templates/Sidebar';

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
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

export const dynamic = 'force-dynamic';
