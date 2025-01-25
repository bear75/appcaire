'use client';

import { Calendar, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from '@/lib/i18n';

import { ImportWizard } from './components/ImportWizard';
import OrganizationTypeSelector from './components/OrganizationTypeSelector';
import ScheduleView from './components/ScheduleView/index';
import { demoSchedule, existingSchedule, trialSchedule } from './test-data/demo-data';
import type { ProcessedSchedule, ScheduleEntry } from './types';

type OrganizationType = 'trial' | 'active' | 'existing';

function processSchedule(schedule: any): ProcessedSchedule {
  return {
    ...schedule,
    start_date: new Date(schedule.start_date),
    end_date: new Date(schedule.end_date),
    data: {
      entries: schedule.data.entries.map((entry: ScheduleEntry) => ({
        ...entry,
        startDateTime: new Date(entry.startDateTime),
        endDateTime: new Date(entry.endDateTime),
      })),
    },
    created_at: new Date(schedule.created_at),
    updated_at: new Date(schedule.updated_at),
  };
}

function ScheduleContent() {
  const t = useTranslations('Schedule');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasImportedSchedule, setHasImportedSchedule] = useState(false);

  // Get mode from URL parameters with null checks
  const rawMode = searchParams?.get('mode');
  // Convert 'new' to 'active' for backwards compatibility
  const mode = ((rawMode === 'new' ? 'active' : rawMode) as OrganizationType) || 'trial';
  const view = searchParams?.get('view') || 'timeline';
  const compare = searchParams?.get('compare') || '';

  // Update URL if mode is 'new'
  useEffect(() => {
    if (rawMode === 'new') {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('mode', 'active');
      router.replace(`/dashboard/schedule?${params.toString()}`);
    }
  }, [rawMode, router, searchParams]);

  const handleModeChange = (newMode: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('mode', newMode);
    if (!params.has('view')) {
      params.set('view', 'timeline');
    }
    router.push(`/dashboard/schedule?${params.toString()}`);
  };

  // Get the appropriate schedule based on mode
  const getScheduleForMode = () => {
    switch (mode) {
      case 'trial':
        return processSchedule(trialSchedule);
      case 'active':
        return processSchedule(demoSchedule);
      case 'existing':
        return processSchedule(existingSchedule);
      default:
        return processSchedule(demoSchedule);
    }
  };

  const renderContent = () => {
    // For trial mode without imported schedule
    if (mode === 'trial' && !hasImportedSchedule) {
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

    // For new active organization without setup
    if (mode === 'active' && !hasImportedSchedule) {
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
        </Card>
      );
    }

    // For all other cases, show schedule view with appropriate data
    return (
      <ScheduleView
        schedule={getScheduleForMode()}
        mode={mode}
        view={view}
        compare={compare}
      />
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{t('title')}</h1>
          <p className="text-sm text-slate-600">{t('description')}</p>
        </div>
      </div>

      <OrganizationTypeSelector
        value={mode}
        onChange={handleModeChange}
      />

      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}

export default ScheduleContent;
