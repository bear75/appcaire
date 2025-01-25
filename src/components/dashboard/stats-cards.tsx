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

import { cn } from '@/lib/utils';
import { t } from '@/lib/i18n';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  small: 'hover:scale-[1.03]',
};

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
    <div className={cn(
      CARD_STYLES.base,
      CARD_STYLES.small,
      'h-[100px]',
      efficiency && getEfficiencyColor(efficiency),
    )}>
      <div className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2 px-4">
        <h3 className="text-xs font-medium text-slate-600">{title}</h3>
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
      </div>
      <div className="px-4 pb-2">
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
      </div>
    </div>
  );
}

export function StatsCards() {
  const stats = [
    {
      title: t('Dashboard.stats.total_clients.title'),
      value: '342',
      description: t('Dashboard.stats.total_clients.description'),
      icon: Users,
      change: { value: 2.5, trend: 'up' as const },
      efficiency: 72,
    },
    {
      title: t('Dashboard.stats.total_employees.title'),
      value: '45',
      description: t('Dashboard.stats.total_employees.description'),
      icon: Users,
      change: { value: 1.2, trend: 'up' as const },
      efficiency: 68,
    },
    {
      title: t('Dashboard.stats.vehicles.title'),
      value: '12',
      description: t('Dashboard.stats.vehicles.description'),
      icon: Car,
      efficiency: 75,
    },
    {
      title: t('Dashboard.stats.scheduled_visits.title'),
      value: '128',
      description: t('Dashboard.stats.scheduled_visits.description'),
      icon: Calendar,
      change: { value: 1.8, trend: 'up' as const },
      efficiency: 71,
    },
    {
      title: t('Dashboard.stats.travel_time.title'),
      value: '45 min',
      description: t('Dashboard.stats.travel_time.description'),
      icon: Clock,
      change: { value: 3.2, trend: 'down' as const },
      efficiency: 64,
    },
    {
      title: t('Dashboard.stats.critical_alerts.title'),
      value: '3',
      description: t('Dashboard.stats.critical_alerts.description'),
      icon: AlertTriangle,
      efficiency: 62,
    },
    {
      title: t('Dashboard.stats.optimization.title'),
      value: '68%',
      description: t('Dashboard.stats.optimization.description'),
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
