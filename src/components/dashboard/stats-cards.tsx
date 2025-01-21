'use client';

import {
  AlertTriangle,
  ArrowDownIcon,
  ArrowUpIcon,
  Calendar,
  Car,
  Clock,
  Percent,
  Users,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/libs/utils';
import { useTranslations } from '@/utils/translations';

type StatsCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  efficiency?: number;
};

function StatsCard({ title, value, description, icon: Icon, change, efficiency }: StatsCardProps) {
  // Get color based on efficiency threshold
  const getEfficiencyColor = (value: number) => {
    if (value < 65) {
      return 'bg-red-50 border-red-200';
    }
    if (value < 70) {
      return 'bg-yellow-50 border-yellow-200';
    }
    return 'bg-green-50 border-green-200';
  };

  return (
    <Card className={cn(
      'h-[100px]', // Make cards smaller
      efficiency && getEfficiencyColor(efficiency),
    )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2">
        <CardTitle className="text-xs font-medium text-slate-600">{title}</CardTitle>
        <Icon className={cn(
          'h-3 w-3',
          efficiency
            ? (
                efficiency < 65
                  ? 'text-red-500'
                  : efficiency < 70
                    ? 'text-yellow-500'
                    : 'text-green-500'
              )
            : 'text-slate-400',
        )}
        />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-lg font-bold text-slate-900">{value}</div>
        <div className="flex items-center text-[10px] text-slate-500">
          {change
            ? (
                <>
                  {change.trend === 'up'
                    ? (
                        <ArrowUpIcon className="mr-1 size-3 text-green-500" />
                      )
                    : (
                        <ArrowDownIcon className="mr-1 size-3 text-red-500" />
                      )}
                  <span
                    className={cn(
                      'font-medium',
                      change.trend === 'up' ? 'text-green-500' : 'text-red-500',
                    )}
                  >
                    {Math.abs(change.value)}
                    %
                  </span>
                  <span className="ml-1">{description}</span>
                </>
              )
            : (
                <span>{description}</span>
              )}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const t = useTranslations('Dashboard');

  const stats = [
    {
      title: t('stats.total_clients.title'),
      value: '342',
      description: t('stats.total_clients.description'),
      icon: Users,
      change: { value: 2.5, trend: 'up' as const },
      efficiency: 72,
    },
    {
      title: t('stats.total_employees.title'),
      value: '45',
      description: t('stats.total_employees.description'),
      icon: Users,
      change: { value: 1.2, trend: 'up' as const },
      efficiency: 68,
    },
    {
      title: t('stats.vehicles.title'),
      value: '12',
      description: t('stats.vehicles.description'),
      icon: Car,
      efficiency: 75,
    },
    {
      title: t('stats.scheduled_visits.title'),
      value: '128',
      description: t('stats.scheduled_visits.description'),
      icon: Calendar,
      change: { value: 1.8, trend: 'up' as const },
      efficiency: 71,
    },
    {
      title: t('stats.travel_time.title'),
      value: '45 min',
      description: t('stats.travel_time.description'),
      icon: Clock,
      change: { value: 3.2, trend: 'down' as const },
      efficiency: 64,
    },
    {
      title: t('stats.critical_alerts.title'),
      value: '3',
      description: t('stats.critical_alerts.description'),
      icon: AlertTriangle,
      efficiency: 62,
    },
    {
      title: t('stats.optimization.title'),
      value: '68%',
      description: t('stats.optimization.description'),
      icon: Percent,
      change: { value: 4.5, trend: 'up' as const },
      efficiency: 68,
    },
  ];

  return (
    <div className="grid grid-cols-7 gap-4">
      {stats.map(stat => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
