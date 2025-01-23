'use client';

import { Plus, Users2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/utils/translations';

export function ClientHeader() {
  const t = useTranslations('Clients');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Users2 className="size-5 text-purple-600" />
        <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          {t('description')}
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600/10 p-2">
          <Button className="gap-2">
            <Plus className="size-4" />
            {t('add_client')}
          </Button>
        </div>
      </div>
    </div>
  );
}
