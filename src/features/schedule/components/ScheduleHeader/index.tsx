import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';

interface ScheduleHeaderProps {
  hasManualSchedule: boolean;
  hasOptimizedSchedule: boolean;
  isCompareMode: boolean;
  onCompareToggle: () => void;
}

export function ScheduleHeader({
  hasManualSchedule,
  hasOptimizedSchedule,
  isCompareMode,
  onCompareToggle
}: ScheduleHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <DateRangePicker />
      </div>
      
      {hasManualSchedule && (
        <div className="flex items-center space-x-2">
          {hasOptimizedSchedule && (
            <Button
              variant={isCompareMode ? "default" : "outline"}
              onClick={onCompareToggle}
            >
              {isCompareMode ? "Exit Comparison" : "Compare with AI"}
            </Button>
          )}
          
          {!hasOptimizedSchedule && (
            <Button variant="default">
              Optimize with AI
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 