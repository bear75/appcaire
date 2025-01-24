'use client';

import { CheckCircle, Clock, Users } from 'lucide-react';

import { BarChart, DoughnutChart } from '@/components/ui/charts';
import { cn } from '@/lib/utils';
import { t } from '@/lib/utils/i18n/translations';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  small: 'hover:scale-[1.02]',
  large: 'hover:scale-[1.01]',
};

export function AnalyticsDashboard() {
  const kpiData = [
    {
      title: t('Analytics.staff.performanceTitle'),
      value: '75%',
      description: t('Analytics.comparison.increase_2_1'),
      icon: 'users',
    },
    {
      title: t('Analytics.kpi.travelTime'),
      value: '45 minuter',
      description: t('Analytics.comparison.decrease_5'),
      icon: 'clock',
    },
    {
      title: t('Analytics.clients.completionRate'),
      value: '92%',
      description: t('Analytics.comparison.increase_0_5'),
      icon: 'check-circle',
    },
  ];

  const comparisonData = {
    data: [
      { name: t('Analytics.time.weekdays.monday'), ai: 95, manual: 85 },
      { name: t('Analytics.time.weekdays.tuesday'), ai: 98, manual: 82 },
      { name: t('Analytics.time.weekdays.wednesday'), ai: 92, manual: 78 },
      { name: t('Analytics.time.weekdays.thursday'), ai: 96, manual: 85 },
      { name: t('Analytics.time.weekdays.friday'), ai: 94, manual: 80 },
    ],
    datasets: [
      {
        dataKey: 'ai',
        label: 'AI Schema',
        backgroundColor: '#7C3AED',
      },
      {
        dataKey: 'manual',
        label: 'Manuellt Schema',
        backgroundColor: '#94A3B8',
      },
    ],
  };

  const travelTimeData = {
    data: [
      { name: t('Analytics.time.weeks.week1'), value: 55 },
      { name: t('Analytics.time.weeks.week2'), value: 48 },
      { name: t('Analytics.time.weeks.week3'), value: 42 },
      { name: t('Analytics.time.weeks.week4'), value: 38 },
    ],
    datasets: [
      {
        dataKey: 'value',
        label: t('Analytics.schedule.travelTimeTitle'),
        backgroundColor: '#22C55E',
      },
    ],
  };

  const skillsData = {
    data: [
      { name: t('Analytics.staff.personalHygiene'), value: 35 },
      { name: t('Analytics.certifications.medical'), value: 25 },
      { name: t('Analytics.certifications.dementia'), value: 20 },
      { name: t('Analytics.staff.safeLifting'), value: 20 },
    ],
    datasets: [
      {
        dataKey: 'value',
        backgroundColor: ['#7C3AED', '#3B82F6', '#22C55E', '#94A3B8'],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
          <div key={index} className={cn(CARD_STYLES.base, CARD_STYLES.small)}>
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium">
                {kpi.title}
              </h3>
              {kpi.icon === 'users' && <Users className="size-4 text-muted-foreground" />}
              {kpi.icon === 'clock' && <Clock className="size-4 text-muted-foreground" />}
              {kpi.icon === 'check-circle' && <CheckCircle className="size-4 text-muted-foreground" />}
            </div>
            <div className="p-6 pt-2">
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                {kpi.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold">{t('Analytics.schedule.comparisonTitle')}</h3>
          </div>
          <div className="p-6 pt-2">
            <BarChart data={comparisonData} height={300} />
          </div>
        </div>

        <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold">{t('Analytics.schedule.travelTimeTitle')}</h3>
          </div>
          <div className="p-6 pt-2">
            <BarChart data={travelTimeData} height={300} />
          </div>
        </div>
      </div>

      <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold">{t('Analytics.staff.skillsTitle')}</h3>
        </div>
        <div className="p-6 pt-2">
          <div className="flex justify-center">
            <DoughnutChart data={skillsData} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}
