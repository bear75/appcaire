import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

export interface ScheduleViewProps {
  schedule: ProcessedSchedule;
  mode?: 'trial' | 'active' | 'existing';
  view?: string;
  compare?: string;
}

function ScheduleView({ schedule, mode = 'active', view = 'timeline', compare = '' }: ScheduleViewProps) {
  const t = useTranslations('Schedule');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleViewChange = (newView: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('view', newView);
    // Preserve mode and compare parameters
    if (!params.has('mode')) {
      params.set('mode', mode);
    }
    if (compare && !params.has('compare')) {
      params.set('compare', compare);
    }
    router.push(`/dashboard/schedule?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <ScheduleMetrics schedule={schedule} />
        <ConstraintManager />
      </div>

      {mode === 'trial' && compare === 'true' && (
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">{t('trial.comparison.title')}</h3>
          <p className="text-sm text-slate-600">{t('trial.comparison.description')}</p>
          {/* Add comparison view components here */}
        </div>
      )}
      
      {mode === 'active' && compare === 'constraints' && (
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">{t('active.constraints.title')}</h3>
          <p className="text-sm text-slate-600">{t('active.constraints.description')}</p>
          {/* Add constraint comparison components here */}
        </div>
      )}

      <Card>
        <Tabs value={view} onValueChange={handleViewChange} className="w-full">
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

export default ScheduleView;
