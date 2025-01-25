import { Logo } from '@/templates/Logo';

export default function AuthCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mb-8">
        <Logo className="size-8" />
      </div>
      <div className="w-full max-w-[400px] px-4">
        {children}
      </div>
    </div>
  );
}
