'use client';

import { Plus, Users } from 'lucide-react';
import { useTranslations } from '@/lib/utils/i18n/translations';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/shared';
import { cn } from '@/lib/utils';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

export function EmployeeHeader() {
  const t = useTranslations('Employees');

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('description')}
      />

      <Card className={cn(CARD_STYLES.base, CARD_STYLES.large, 'bg-gradient-to-br from-purple-50 to-purple-100')}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-purple-900">
            <Users className="size-4 text-purple-600" />
            {t('add_employee')}
          </CardTitle>
          <CardDescription className="text-sm text-purple-600">
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 size-4" />
            {t('add_employee')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
