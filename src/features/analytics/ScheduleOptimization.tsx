'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart } from '@/components/ui/charts';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from '@/utils/translations';

export function ScheduleOptimization() {
  const t = useTranslations('Analytics');

  // Mock data - replace with real data from your API
  const comparisonData = {
    data: [
      { name: t('time.weekdays.monday'), aiSchedule: 480, manualSchedule: 520 },
      { name: t('time.weekdays.tuesday'), aiSchedule: 450, manualSchedule: 510 },
      { name: t('time.weekdays.wednesday'), aiSchedule: 470, manualSchedule: 530 },
      { name: t('time.weekdays.thursday'), aiSchedule: 460, manualSchedule: 515 },
      { name: t('time.weekdays.friday'), aiSchedule: 475, manualSchedule: 525 },
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
      { name: t('time.weeks.week1'), value: 120 },
      { name: t('time.weeks.week2'), value: 100 },
      { name: t('time.weeks.week3'), value: 85 },
      { name: t('time.weeks.week4'), value: 75 },
    ],
    datasets: [{
      dataKey: 'value',
      label: t('schedule.travelTime'),
      borderColor: '#22C55E',
    }],
  };

  const constraints = [
    {
      type: t('constraints.hard'),
      satisfaction: 98,
      description: t('constraints.hardDesc'),
    },
    {
      type: t('constraints.medium'),
      satisfaction: 85,
      description: t('constraints.mediumDesc'),
    },
    {
      type: t('constraints.soft'),
      satisfaction: 75,
      description: t('constraints.softDesc'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* AI vs Manual Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>{t('schedule.comparisonTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={comparisonData} height={300} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Travel Time Reduction */}
        <Card>
          <CardHeader>
            <CardTitle>{t('schedule.travelTimeTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={travelTimeData} height={300} />
          </CardContent>
        </Card>

        {/* Constraint Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>{t('schedule.constraintsTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
