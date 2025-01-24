import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/utils/translations';

import ScheduleGrid from './ScheduleGrid';
import ScheduleMap from './ScheduleMap';
import ScheduleMetrics from './ScheduleMetrics';
import ScheduleTimeline from './ScheduleTimeline';
import ConstraintManager from './ConstraintManager';
import ScheduleHeader from './ScheduleHeader';

interface ScheduleViewProps {
  showConstraints?: boolean;
}

export default function ScheduleView({ showConstraints = false }: ScheduleViewProps) {
  const t = useTranslations('Schedule');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ScheduleHeader />
        {showConstraints && <ConstraintManager />}
      </div>

      <ScheduleMetrics />

      <Card className="p-0">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-50/50 p-1">
            <TabsTrigger
              value="timeline"
              className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 hover:bg-slate-100 hover:text-slate-900"
            >
              {t('tabs.timeline')}
            </TabsTrigger>
            <TabsTrigger
              value="grid"
              className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 hover:bg-slate-100 hover:text-slate-900"
            >
              {t('tabs.grid')}
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 hover:bg-slate-100 hover:text-slate-900"
            >
              {t('tabs.map')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-6 px-6">
            <ScheduleTimeline />
          </TabsContent>
          <TabsContent value="grid" className="mt-6 px-6">
            <ScheduleGrid />
          </TabsContent>
          <TabsContent value="map" className="mt-6 px-6">
            <ScheduleMap />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
