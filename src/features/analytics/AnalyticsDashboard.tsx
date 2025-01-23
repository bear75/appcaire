'use client';

import { CheckCircle, Clock, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, DoughnutChart } from '@/components/ui/charts';
import { t } from '@/utils/translations';

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
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              {kpi.icon === 'users' && <Users className="size-4 text-muted-foreground" />}
              {kpi.icon === 'clock' && <Clock className="size-4 text-muted-foreground" />}
              {kpi.icon === 'check-circle' && <CheckCircle className="size-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                {kpi.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('Analytics.schedule.comparisonTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={comparisonData} height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('Analytics.schedule.travelTimeTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={travelTimeData} height={300} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('Analytics.staff.skillsTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <DoughnutChart data={skillsData} height={300} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
