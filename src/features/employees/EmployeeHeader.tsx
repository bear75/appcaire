import { Plus } from 'lucide-react';
import { useTranslations } from '@/utils/translations';

import { Button } from '@/components/ui/button';

export function EmployeeHeader() {
  const t = useTranslations('Employees');

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button>
          <Plus className="mr-2 size-4" />
          {t('add_employee')}
        </Button>
      </div>
    </div>
  );
}
