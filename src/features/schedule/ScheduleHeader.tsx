'use client';

import { Wand2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/utils/translations';

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
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
      <p className="text-sm text-muted-foreground">{t('description')}</p>
      <div className="mt-4 flex justify-end">
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
