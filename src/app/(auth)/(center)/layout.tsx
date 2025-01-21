import { Logo } from '@/templates/Logo';

export default function AuthCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-8">
        <Logo />
      </div>
      {children}
    </div>
  );
}
