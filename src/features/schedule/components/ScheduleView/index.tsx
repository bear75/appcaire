import { useState } from 'react';
import { useTranslations } from '@/lib/utils/i18n/translations';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ConstraintManager from '../ConstraintManager';
import ScheduleGrid from '../ScheduleGrid';
import ScheduleMap from '../ScheduleMap';
import ScheduleMetrics from '../ScheduleMetrics';
import ScheduleTimeline from '../ScheduleTimeline';
import TaskDetailsModal from '../TaskDetailsModal';
import type { ProcessedSchedule } from '../../types';

interface ScheduleViewProps {
  schedule: ProcessedSchedule;
}

export default function ScheduleView({ schedule }: ScheduleViewProps) {
  const t = useTranslations('Schedule');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <ScheduleMetrics schedule={schedule} />
        <ConstraintManager />
      </div>

      <Card>
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="bg-background p-1">
            <TabsTrigger value="timeline" className="px-3 py-2 hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
              {t('tabs.timeline')}
            </TabsTrigger>
            <TabsTrigger value="grid" className="px-3 py-2 hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
              {t('tabs.grid')}
            </TabsTrigger>
            <TabsTrigger value="map" className="px-3 py-2 hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
              {t('tabs.map')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <ScheduleTimeline schedule={schedule} onTaskSelect={setSelectedTaskId} />
          </TabsContent>
          <TabsContent value="grid">
            <ScheduleGrid schedule={schedule} onTaskSelect={setSelectedTaskId} />
          </TabsContent>
          <TabsContent value="map">
            <ScheduleMap schedule={schedule} onTaskSelect={setSelectedTaskId} />
          </TabsContent>
        </Tabs>
      </Card>

      {selectedTaskId && (
        <TaskDetailsModal
          open={!!selectedTaskId}
          onOpenChange={() => setSelectedTaskId(null)}
          taskId={selectedTaskId}
        />
      )}
    </div>
  );
}
