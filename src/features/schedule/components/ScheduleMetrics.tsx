import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricProps {
  value: string | number;
  unit?: string;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function Metric({ value, unit, label, trend }: MetricProps) {
  return (
    <Card className="flex min-h-[120px] flex-col justify-between p-6">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight text-slate-900">{value}</span>
        {unit && <span className="text-xl text-slate-600">{unit}</span>}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        {trend && (
          <span
            className={cn(
              'text-sm font-medium',
              trend.isPositive ? 'text-emerald-600' : 'text-red-600'
            )}
          >
            {trend.isPositive ? '+' : '-'}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </Card>
  );
}

export default function ScheduleMetrics() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
      <Metric
        value={92}
        label="Antal besök"
        trend={{ value: 5.2, isPositive: true }}
      />
      <Metric
        value={156}
        unit="h"
        label="Total tid"
        trend={{ value: 1.1, isPositive: false }}
      />
      <Metric
        value={98}
        unit="%"
        label="Slutförda"
        trend={{ value: 0.3, isPositive: true }}
      />
      <Metric
        value={87}
        unit="%"
        label="Personal"
        trend={{ value: 0.2, isPositive: false }}
      />
      <Metric
        value={22}
        unit="min"
        label="Restid"
        trend={{ value: 5.2, isPositive: true }}
      />
    </div>
  );
} 