import { Card } from '@/components/ui/card';
import type { Schedule } from '../../types';

interface SingleScheduleViewProps {
  schedule: Schedule;
}

export function SingleScheduleView({ schedule }: SingleScheduleViewProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {schedule.type === 'MANUAL' ? 'Current Schedule' : 'AI-Optimized Schedule'}
          </h3>
          <span className="text-sm text-slate-500">
            {new Date(schedule.start_date).toLocaleDateString()} - {new Date(schedule.end_date).toLocaleDateString()}
          </span>
        </div>

        <div className="border rounded-lg p-4">
          {schedule.data.entries.map((entry, index) => (
            <div key={index} className="py-2 border-b last:border-0">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">Employee: {entry.employeeId}</span>
                  <span className="mx-2">•</span>
                  <span>Client: {entry.clientId}</span>
                </div>
                <div className="text-sm text-slate-500">
                  {new Date(entry.startDateTime).toLocaleTimeString()} - {new Date(entry.endDateTime).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 