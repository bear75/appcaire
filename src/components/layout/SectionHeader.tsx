'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { COMMON_CLASSES } from '@/constants/styles';

interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div>
        <h2 className={cn('text-xl font-semibold text-slate-900')}>{title}</h2>
        {description && (
          <p className={COMMON_CLASSES.description}>{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">{actions}</div>
      )}
    </div>
  );
} 