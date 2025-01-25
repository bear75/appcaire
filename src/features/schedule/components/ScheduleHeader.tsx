'use client';

import { Wand2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/utils/i18n/translations';

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
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
        >
          <Wand2 className={cn('size-4', isOptimizing && 'animate-spin')} />
          {t('optimize')}
        </Button>
      </div>
    </div>
  );
}
