'use client';

import { Card } from '@/components/ui/card';
import { useTranslations } from '@/lib/i18n';
import type { ProcessedSchedule } from '../types';

type MetricProps = {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
};

type ScheduleMetricsProps = {
  schedule: ProcessedSchedule;
};

function Metric({ label, value, unit, trend }: MetricProps) {
  return (
    <Card className="p-6 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-bold">
          {value}
          {unit && <span className="ml-1 text-xl">{unit}</span>}
        </div>
        <div className="text-sm text-slate-600">{label}</div>
        {trend !== undefined && (
          <div className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}
            {trend}
            %
          </div>
        )}
      </div>
    </Card>
  );
}

export default function ScheduleMetrics({ schedule }: ScheduleMetricsProps) {
  const t = useTranslations('Schedule');

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <Metric
        label="Antal besök"
        value={92}
        trend={5.2}
      />
      <Metric
        label="Total tid"
        value={156}
        unit="h"
        trend={-1.1}
      />
      <Metric
        label="Slutförda"
        value={78}
        unit="%"
      />
      <Metric
        label="Personal"
        value={12}
      />
      <Metric
        label="Personalutnyttjande"
        value={85}
        unit="%"
        trend={2.3}
      />
    </div>
  );
}
