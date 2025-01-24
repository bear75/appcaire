import { Card } from '@/components/ui/card';
import type { ProcessedSchedule } from '../../types';

interface ComparisonViewProps {
  manualSchedule: ProcessedSchedule;
  optimizedSchedule: ProcessedSchedule | undefined;
}

export function ComparisonView({ manualSchedule, optimizedSchedule }: ComparisonViewProps) {
  if (!optimizedSchedule) {
    return (
      <Card className="p-6">
        <div className="text-center text-slate-600">
          Optimized schedule is being generated...
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Manual Schedule</h3>
        {/* Add comparison metrics and visualization */}
      </Card>
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Optimized Schedule</h3>
        {/* Add comparison metrics and visualization */}
      </Card>
    </div>
  );
} 