'use client';

import { Plus, Users } from 'lucide-react';
import { useTranslations } from '@/utils/translations';

import { Button } from '@/components/ui/button';

export function EmployeeHeader() {
  const t = useTranslations('Employees');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-purple-600">
          <Users className="size-5" />
          <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
        </div>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-purple-900">
            {t('add_employee')}
          </h2>
          <p className="text-sm text-purple-600">
            Lägg till ny personal och hantera deras kompetenser
          </p>
        </div>

        <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 size-4" />
          {t('add_employee')}
        </Button>
      </div>
    </div>
  );
}
