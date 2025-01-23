'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { COMMON_CLASSES, SPACING, HOVER_EFFECTS } from '@/constants/styles';

interface ContentSectionProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  elevated?: boolean;
}

export function ContentSection({
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
  elevated = false,
}: ContentSectionProps) {
  return (
    <section 
      className={cn(
        SPACING.section,
        'group perspective-1000',
        className
      )}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between">
          {title && (
            <div>
              <h2 className={COMMON_CLASSES.header}>{title}</h2>
              {description && (
                <p className={COMMON_CLASSES.description}>{description}</p>
              )}
            </div>
          )}
          {actions && (
            <div className="flex items-center gap-3">{actions}</div>
          )}
        </div>
      )}
      <div 
        className={cn(
          'rounded-xl border border-slate-200/50 bg-white',
          'transition-all duration-300 ease-out transform-gpu',
          'hover:border-slate-200 hover:shadow-xl hover:-translate-y-1',
          elevated ? 'shadow-lg' : 'shadow-md hover:scale-[1.01]',
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
} 