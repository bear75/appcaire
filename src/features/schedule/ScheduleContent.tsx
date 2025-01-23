'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScheduleHeader from '@/features/schedule/ScheduleHeader';
import ScheduleMetrics from '@/features/schedule/ScheduleMetrics';
import ScheduleTimeline from '@/features/schedule/ScheduleTimeline';
import { useTranslations } from '@/utils/translations';

export function ScheduleContent() {
  const t = useTranslations('Schedule');

  return (
    <>
      <ScheduleHeader />
      <ScheduleMetrics />

      <Tabs defaultValue="tidslinje" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 gap-4 bg-background p-1">
          <TabsTrigger
            value="tidslinje"
            className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            {t('timeline.title')}
          </TabsTrigger>
          <TabsTrigger
            value="schema"
            className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            {t('grid.title')}
          </TabsTrigger>
          <TabsTrigger
            value="karta"
            className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            {t('map.routes')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tidslinje" className="space-y-4">
          <ScheduleTimeline />
        </TabsContent>
        <TabsContent value="schema">{t('map.integration_placeholder')}</TabsContent>
        <TabsContent value="karta">{t('map.integration_placeholder')}</TabsContent>
      </Tabs>
    </>
  );
} 