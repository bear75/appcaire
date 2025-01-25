import { Download } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/lib/i18n';

import type { ProcessedSchedule } from '../../types';
import { ConstraintManager } from '../ConstraintManager';
import { ScheduleGrid } from '../ScheduleGrid';
import { ScheduleMap } from '../ScheduleMap';
import { ScheduleMetrics } from '../ScheduleMetrics';
import { ScheduleTimeline } from '../ScheduleTimeline';
import { TaskDetailsModal } from '../TaskDetailsModal';

export type ScheduleViewProps = {
  schedule: ProcessedSchedule;
  mode?: 'trial' | 'active' | 'existing';
  view?: string;
  compare?: string;
};

// Helper function to format date for filename
const formatDateForFilename = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Helper function to convert schedule to CSV
const convertToCSV = (schedule: ProcessedSchedule) => {
  const headers = ['Date', 'Employee', 'Client', 'Start Time', 'End Time', 'Type'];
  const rows = schedule.data.entries.map(entry => [
    new Date(entry.startDateTime).toLocaleDateString(),
    entry.employeeId,
    entry.clientId,
    new Date(entry.startDateTime).toLocaleTimeString(),
    new Date(entry.endDateTime).toLocaleTimeString(),
    entry.type || '',
  ]);

  return [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');
};

export function ScheduleView({ schedule, mode = 'active', view = 'timeline', compare = '' }: ScheduleViewProps) {
  const { t } = useTranslation('schedule');
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

  const handleExport = async (format: 'json' | 'csv') => {
    const filename = `schedule_${formatDateForFilename(new Date(schedule.start_date))}_${formatDateForFilename(new Date(schedule.end_date))}`;

    let content: string;
    let type: string;

    if (format === 'json') {
      content = JSON.stringify(schedule, null, 2);
      type = 'application/json';
    } else {
      content = convertToCSV(schedule);
      type = 'text/csv';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <ScheduleMetrics schedule={schedule} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="size-4" />
                {t('actions.export')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                {t('actions.exportJson')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                {t('actions.exportCsv')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ConstraintManager />
      </div>

      {mode === 'trial' && compare === 'true' && (
        <div className="rounded-lg bg-purple-50 p-4">
          <h3 className="mb-2 font-semibold">{t('trial.comparison.title')}</h3>
          <p className="text-sm text-slate-600">{t('trial.comparison.description')}</p>
          {/* Add comparison view components here */}
        </div>
      )}

      {mode === 'active' && compare === 'constraints' && (
        <div className="rounded-lg bg-purple-50 p-4">
          <h3 className="mb-2 font-semibold">{t('active.constraints.title')}</h3>
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
