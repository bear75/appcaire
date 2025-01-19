import { Car, CheckCircle, Clock, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';

type MetricCardProps = {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  trendUp?: boolean;
};

function MetricCard({ title, value, trend, icon, trendUp }: MetricCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p
              className={`text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="bg-primary/10 rounded-full p-2">{icon}</div>
      </div>
    </Card>
  );
}

export default function ScheduleMetrics() {
  const t = useTranslations('Schedule.metrics');

  return (
    <>
      <MetricCard
        title={t('total_hours')}
        value="156h"
        trend="+2.5%"
        trendUp
        icon={<Clock className="size-4 text-primary" />}
      />
      <MetricCard
        title={t('active_employees')}
        value="24"
        icon={<Users className="size-4 text-primary" />}
      />
      <MetricCard
        title={t('travel_time')}
        value="12.3h"
        trend="-5.2%"
        trendUp={false}
        icon={<Car className="size-4 text-primary" />}
      />
      <MetricCard
        title={t('completion_rate')}
        value="98%"
        trend="+1.2%"
        trendUp
        icon={<CheckCircle className="size-4 text-primary" />}
      />
    </>
  );
}
