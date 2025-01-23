'use client';

import { Card } from '@/components/ui/card';
import { useTranslations } from '@/utils/translations';
import { ArrowUp, Clock, Users, Car, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  small: 'hover:scale-[1.02]',
};

export default function ScheduleMetrics() {
  const t = useTranslations('Schedule');

  const metrics = [
    {
      title: t('metrics.ai_driven'),
      value: '92%',
      change: '+5.2%',
      icon: <Wand2 className="size-4 text-purple-600" />,
      increase: true,
    },
    {
      title: t('metrics.total_hours'),
      value: '156.5h',
      change: '+2.1%',
      icon: <Clock className="size-4 text-purple-600" />,
      increase: true,
    },
    {
      title: t('metrics.completion_rate'),
      value: '98.2%',
      change: '+1.2%',
      icon: <Users className="size-4 text-purple-600" />,
      increase: true,
    },
    {
      title: t('metrics.staff_utilization'),
      value: '87.5%',
      change: '+3.4%',
      icon: <Users className="size-4 text-purple-600" />,
      increase: true,
    },
    {
      title: t('metrics.travel_time'),
      value: '22.3 min',
      change: '-5.2%',
      icon: <Car className="size-4 text-purple-600" />,
      increase: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric, index) => (
        <Card key={index} className={cn(CARD_STYLES.base, CARD_STYLES.small)}>
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium text-slate-600">
              {metric.title}
            </h3>
            <div className="flex items-center justify-center size-8 rounded-full bg-purple-50">
              {metric.icon}
            </div>
          </div>
          <div className="p-6 pt-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
              <div className="flex items-center gap-1">
                <ArrowUp 
                  className={cn(
                    "size-4",
                    metric.increase ? "text-green-600" : "text-green-600 rotate-180"
                  )} 
                />
                <p className="text-sm text-green-600">{metric.change}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
