'use client';

import { Calendar, Settings, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/utils/translations';

export function DemoScheduleHeader() {
  const t = useTranslations('Schedule');

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Schema</h1>
        <p className="text-muted-foreground">Översikt över verksamhetens schemaläggning</p>
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
          <Button variant="default">Optimera schema</Button>
        </div>
      </div>
    </div>
  );
} 