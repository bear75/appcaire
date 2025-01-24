'use client';

import { Card } from '@/components/ui/card';
import { useTranslations } from '@/utils/translations';
import { ArrowUp, Clock, Users, Car, Wand2 } from 'lucide-react';

interface MetricProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
}

function Metric({ label, value, unit, trend }: MetricProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1">
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-bold">
          {value}
          {unit && <span className="text-xl ml-1">{unit}</span>}
        </div>
        <div className="text-sm text-slate-600">{label}</div>
        {trend !== undefined && (
          <div className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
    </Card>
  );
}

export default function ScheduleMetrics() {
  const t = useTranslations('Schedule.metrics');

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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
        value={98}
        unit="%"
        trend={0.3}
      />
      <Metric 
        label="Personal"
        value={87}
        unit="%"
        trend={-0.2}
      />
      <Metric 
        label="Restid"
        value={22}
        unit="min"
        trend={5.2}
      />
    </div>
  );
}
