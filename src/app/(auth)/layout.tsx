import '@/styles/global.css';
import { Sidebar } from '@/components/layout/Sidebar';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pl-64">
        <div className="container py-8">{children}</div>
      </main>
    </div>
  );
}
