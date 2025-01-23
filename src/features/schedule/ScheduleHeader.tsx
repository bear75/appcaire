'use client';

import { Wand2 } from 'lucide-react';
import { useState } from 'react';

import { PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/utils/translations';

const BUTTON_STYLES = {
  base: 'transition-all duration-300 ease-out transform-gpu',
  primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md',
  icon: 'size-4 transition-transform',
  loading: 'animate-spin',
};

export default function ScheduleHeader() {
  const t = useTranslations('Schedule');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <PageHeader
      title={t('title')}
      description={t('description')}
    >
      <Button
        onClick={handleOptimize}
        disabled={isOptimizing}
        className={cn(
          BUTTON_STYLES.base,
          BUTTON_STYLES.primary,
          'flex items-center gap-2',
        )}
      >
        <Wand2
          className={cn(
            BUTTON_STYLES.icon,
            isOptimizing && BUTTON_STYLES.loading,
          )}
        />
        {t('optimize')}
      </Button>
    </PageHeader>
  );
}
