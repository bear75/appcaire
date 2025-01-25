'use client';

import { BarChart2, LineChart as LineChartIcon, ListChecks } from 'lucide-react';
import { BarChart, LineChart } from '@/components/ui/charts';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { t } from '@/lib/utils/i18n/translations';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

export function ScheduleOptimization() {
  // Mock data - replace with real data from your API
  const comparisonData = {
    data: [
      { name: t('Analytics.time.weekdays.monday'), aiSchedule: 480, manualSchedule: 520 },
      { name: t('Analytics.time.weekdays.tuesday'), aiSchedule: 450, manualSchedule: 510 },
      { name: t('Analytics.time.weekdays.wednesday'), aiSchedule: 470, manualSchedule: 530 },
      { name: t('Analytics.time.weekdays.thursday'), aiSchedule: 460, manualSchedule: 515 },
      { name: t('Analytics.time.weekdays.friday'), aiSchedule: 475, manualSchedule: 525 },
    ],
    datasets: [
      {
        dataKey: 'aiSchedule',
        label: 'AI Schema',
        backgroundColor: '#7C3AED',
      },
      {
        dataKey: 'manualSchedule',
        label: 'Manuellt Schema',
        backgroundColor: '#94A3B8',
      },
    ],
  };

  const travelTimeData = {
    data: [
      { name: t('Analytics.time.weeks.week1'), value: 120 },
      { name: t('Analytics.time.weeks.week2'), value: 100 },
      { name: t('Analytics.time.weeks.week3'), value: 85 },
      { name: t('Analytics.time.weeks.week4'), value: 75 },
    ],
    datasets: [{
      dataKey: 'value',
      label: t('Analytics.schedule.travelTime'),
      borderColor: '#22C55E',
    }],
  };

  const constraints = [
    {
      type: t('Analytics.constraints.hard'),
      satisfaction: 98,
      description: t('Analytics.constraints.hardDesc'),
    },
    {
      type: t('Analytics.constraints.medium'),
      satisfaction: 85,
      description: t('Analytics.constraints.mediumDesc'),
    },
    {
      type: t('Analytics.constraints.soft'),
      satisfaction: 75,
      description: t('Analytics.constraints.softDesc'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="size-5 text-purple-500" />
            <h3 className="text-lg font-semibold">{t('Analytics.schedule.comparisonTitle')}</h3>
          </div>
        </div>
        <div className="p-6 pt-2">
          <BarChart data={comparisonData} height={300} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <LineChartIcon className="size-5 text-green-500" />
              <h3 className="text-lg font-semibold">{t('Analytics.schedule.travelTimeTitle')}</h3>
            </div>
          </div>
          <div className="p-6 pt-2">
            <LineChart data={travelTimeData} height={300} />
          </div>
        </div>

        <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <ListChecks className="size-5 text-blue-500" />
              <h3 className="text-lg font-semibold">{t('Analytics.schedule.constraintsTitle')}</h3>
            </div>
          </div>
          <div className="p-6 pt-2 space-y-6">
            {constraints.map(constraint => (
              <div key={`constraint-${constraint.type}`} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{constraint.type}</span>
                  <span className="text-sm text-muted-foreground">
                    {constraint.satisfaction}%
                  </span>
                </div>
                <Progress value={constraint.satisfaction} />
                <p className="text-sm text-muted-foreground">
                  {constraint.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
