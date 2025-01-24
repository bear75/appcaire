'use client';

import { useState } from 'react';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Schedule as UISchedule } from '@/types';

import { convertToDate } from '../../../../utils/date';
import ConstraintManager from '../../ConstraintManager';
import { demoSchedule } from '../../demo-data';
import ScheduleGrid from '../../ScheduleGrid';
import ScheduleMap from '../../ScheduleMap';
import ScheduleTimeline from '../../ScheduleTimeline';
import TaskDetailsModal from '../../TaskDetailsModal';
import type { Schedule } from '../../types';

type ExampleScheduleViewProps = {
  schedule?: Schedule;
};

function convertSchedule(schedule: Schedule): UISchedule {
  return {
    id: schedule.id,
    organization_id: schedule.organization_id,
    type: schedule.type,
    status: schedule.status,
    start_date: convertToDate(schedule.start_date),
    end_date: convertToDate(schedule.end_date),
    metadata: schedule.metadata,
    created_at: convertToDate(schedule.created_at),
    updated_at: convertToDate(schedule.updated_at),
    data: {
      ...schedule.data,
      entries: schedule.data.entries.map(entry => ({
        id: `${entry.employeeId}-${entry.clientId}-${entry.startDateTime}`,
        employeeId: entry.employeeId,
        clientId: entry.clientId,
        startDateTime: convertToDate(entry.startDateTime),
        endDateTime: convertToDate(entry.endDateTime),
        category: entry.category || 'default',
        location: {
          lat: 59.3293,
          lng: 18.0686,
          address: 'Stockholm, Sweden',
        },
      })),
    },
  };
}

export default function ExampleScheduleView({ schedule = demoSchedule }: ExampleScheduleViewProps) {
  const [selectedView, setSelectedView] = useState('timeline');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const uiSchedule = convertSchedule(schedule);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <ConstraintManager schedule={uiSchedule} />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="col-span-1 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">AI-Optimering</span>
              <span className="text-xs text-green-600">↑ +2.5%</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">92%</div>
          </div>
        </Card>

        <Card className="col-span-1 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Totala Timmar</span>
              <span className="text-xs text-purple-600">i</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">156.5h</div>
          </div>
        </Card>

        <Card className="col-span-1 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Slutföringsgrad</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">98.2%</div>
          </div>
        </Card>

        <Card className="col-span-1 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Personalutnyttjande</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">87.5%</div>
          </div>
        </Card>

        <Card className="col-span-1 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Restid</span>
              <span className="text-xs text-green-600">↓ -5.2%</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">22.3 min</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="timeline" value={selectedView} onValueChange={setSelectedView} className="space-y-4">
        <TabsList className="bg-background p-1">
          <TabsTrigger
            value="timeline"
            className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            Tidslinje
          </TabsTrigger>
          <TabsTrigger
            value="grid"
            className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            Schema
          </TabsTrigger>
          <TabsTrigger
            value="map"
            className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            Karta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <ScheduleTimeline schedule={uiSchedule} onTaskClick={setSelectedTask} />
        </TabsContent>
        <TabsContent value="grid">
          <ScheduleGrid schedule={uiSchedule} onTaskClick={setSelectedTask} />
        </TabsContent>
        <TabsContent value="map">
          <ScheduleMap schedule={uiSchedule} onTaskClick={setSelectedTask} />
        </TabsContent>
      </Tabs>

      <TaskDetailsModal isOpen={!!selectedTask} taskId={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}
