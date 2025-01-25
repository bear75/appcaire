'use client';

import { useAuth } from '@clerk/nextjs';
import { Sidebar } from '@/components/layout/Sidebar';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isLoaded, userId } = useAuth();

  // Don't show sidebar for unauthenticated users
  if (!isLoaded || !userId) {
    return children;
  }

  return children;
}
