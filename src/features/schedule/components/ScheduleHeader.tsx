import { SplitSquareVertical, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ScheduleHeaderProps {
  hasManualSchedule: boolean;
  hasOptimizedSchedule: boolean;
  isCompareMode: boolean;
  onCompareToggle: () => void;
  enableCompareToggle: boolean;
}

export function ScheduleHeader({
  hasManualSchedule,
  hasOptimizedSchedule,
  isCompareMode,
  onCompareToggle,
  enableCompareToggle,
}: ScheduleHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Schema</h2>
        {hasOptimizedSchedule && !enableCompareToggle && (
          <Badge variant="secondary" className="bg-purple-50 text-purple-600">
            AI-optimerat
          </Badge>
        )}
      </div>
      {enableCompareToggle && hasManualSchedule && hasOptimizedSchedule && (
        <Button
          variant={isCompareMode ? "secondary" : "outline"}
          onClick={onCompareToggle}
          className="gap-2"
        >
          <SplitSquareVertical className="size-4" />
          {isCompareMode ? "Dölj jämförelse" : "Visa jämförelse"}
        </Button>
      )}
    </div>
  );
} 