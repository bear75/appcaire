import { useState } from 'react';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import ConstraintManager from '../../ConstraintManager';
import ScheduleGrid from '../../ScheduleGrid';
import ScheduleMap from '../../ScheduleMap';
import ScheduleMetrics from '../../ScheduleMetrics';
import ScheduleTimeline from '../../ScheduleTimeline';
import TaskDetailsModal from '../../TaskDetailsModal';
import type { ProcessedSchedule } from '../../types';

type ScheduleViewProps = {
  schedule: ProcessedSchedule;
};

export function ScheduleView({ schedule }: ScheduleViewProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="col-span-2 p-4">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="space-y-4">
              <ScheduleMetrics schedule={schedule} />
              <ScheduleTimeline
                schedule={schedule}
                onTaskClick={setSelectedTaskId}
              />
              <ScheduleGrid
                schedule={schedule}
                onTaskClick={setSelectedTaskId}
              />
              <ScheduleMap
                schedule={schedule}
                onTaskClick={setSelectedTaskId}
              />
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-4">
          <ConstraintManager schedule={schedule} />
        </Card>
      </div>

      <TaskDetailsModal
        open={!!selectedTaskId}
        onOpenChange={() => setSelectedTaskId(null)}
        taskId={selectedTaskId}
      />
    </div>
  );
}
