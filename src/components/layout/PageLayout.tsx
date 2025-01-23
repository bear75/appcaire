'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SPACING } from '@/constants/styles';

interface PageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  actions,
  children,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn('min-h-screen', SPACING.page, className)}>
      <header className={SPACING.header}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            {description && (
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-3">{actions}</div>
          )}
        </div>
      </header>

      <main className="space-y-6">
        {children}
      </main>
    </div>
  );
} 