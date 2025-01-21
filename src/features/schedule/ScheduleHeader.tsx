import { Calendar, Settings, Users } from 'lucide-react';
import { useTranslations } from '@/utils/translations';

import { Button } from '@/components/ui/button';

export default function ScheduleHeader() {
  const t = useTranslations('Schedule');

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Calendar className="size-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Users className="size-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="size-4" />
          </Button>
          <Button variant="default">{t('optimize_schedule')}</Button>
        </div>
      </div>
    </div>
  );
}
