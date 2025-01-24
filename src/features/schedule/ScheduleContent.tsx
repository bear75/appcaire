'use client';

import { Calendar, Plus, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from '@/lib/utils/i18n/translations';

import { ImportWizard } from './components/ImportWizard';
import OrganizationTypeSelector from './components/OrganizationTypeSelector';
import ScheduleView from './components/ScheduleView/index';
import { demoSchedule } from './test-data/demo-data';
import type { ProcessedSchedule, ScheduleEntry } from './types';

type OrganizationType = 'trial' | 'new' | 'existing';

function ScheduleContent() {
  const t = useTranslations('Schedule');
  const [orgType, setOrgType] = useState<OrganizationType>('trial');
  const [hasImportedSchedule, setHasImportedSchedule] = useState(false);

  const handleOrgTypeChange = (value: string) => {
    setOrgType(value as OrganizationType);
  };

  // Convert demo schedule to ProcessedSchedule format
  const processedSchedule: ProcessedSchedule = {
    ...demoSchedule,
    start_date: new Date(demoSchedule.start_date),
    end_date: new Date(demoSchedule.end_date),
    data: {
      entries: demoSchedule.data.entries.map((entry: ScheduleEntry) => ({
        ...entry,
        startDateTime: new Date(entry.startDateTime),
        endDateTime: new Date(entry.endDateTime),
      })),
    },
    created_at: new Date(demoSchedule.created_at),
    updated_at: new Date(demoSchedule.updated_at),
  };

  const renderContent = () => {
    switch (orgType) {
      case 'trial':
        if (!hasImportedSchedule) {
          return (
            <div className="flex flex-col items-center justify-center space-y-4 p-8">
              <h2 className="text-2xl font-semibold">{t('trial.title')}</h2>
              <p className="text-muted-foreground">{t('trial.description')}</p>
              <ImportWizard
                onClose={() => setHasImportedSchedule(true)}
                onImportComplete={() => setHasImportedSchedule(true)}
              />
            </div>
          );
        }
        return <ScheduleView schedule={processedSchedule} />;

      case 'new':
        return (
          <Card className="mx-auto max-w-2xl p-8">
            <div className="text-center">
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                {t('new.title')}
              </h2>
              <p className="mb-8 text-slate-600">
                {t('new.description')}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Button
                variant="outline"
                size="lg"
                className="flex h-auto flex-col gap-3 p-6 hover:border-purple-200 hover:bg-purple-50/30"
              >
                <Users className="size-8 text-purple-600" />
                <div>
                  <div className="font-semibold">{t('new.staff.add')}</div>
                  <div className="text-sm text-slate-600">
                    {t('new.staff.description')}
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="flex h-auto flex-col gap-3 p-6 hover:border-purple-200 hover:bg-purple-50/30"
              >
                <Calendar className="size-8 text-purple-600" />
                <div>
                  <div className="font-semibold">{t('new.clients.add')}</div>
                  <div className="text-sm text-slate-600">
                    {t('new.clients.description')}
                  </div>
                </div>
              </Button>
            </div>

            <div className="mt-6">
              <Button
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
                size="lg"
                disabled
              >
                <Plus className="mr-2 size-4" />
                {t('new.create.button')}
              </Button>
              <p className="mt-2 text-center text-sm text-slate-600">
                {t('new.create.disabled_message')}
              </p>
            </div>
          </Card>
        );

      case 'existing':
        return <ScheduleView schedule={processedSchedule} />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <OrganizationTypeSelector
        value={orgType}
        onChange={handleOrgTypeChange}
      />
      {renderContent()}
    </div>
  );
}

export default ScheduleContent;
