'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { buttonVariants } from '@/components/ui/button';

export function NavbarAuth() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push('/dashboard');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || userId) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/sign-in"
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        Logga in
      </Link>
      <Link
        href="/sign-up"
        className={buttonVariants({ variant: 'default', size: 'sm' })}
      >
        Skapa konto
      </Link>
    </div>
  );
} 