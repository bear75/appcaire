'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { t } from '@/lib/i18n';
import { LineChart as LineChartIcon, AlertTriangle, Trophy } from 'lucide-react';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

export function ContinuityKPI() {
  const trendData = {
    data: [
      { name: t('Analytics.time.weeks.week1'), value: 3.5 },
      { name: t('Analytics.time.weeks.week2'), value: 4.1 },
      { name: t('Analytics.time.weeks.week3'), value: 3.8 },
      { name: t('Analytics.time.weeks.week4'), value: 4.2 },
    ],
    datasets: [
      {
        dataKey: 'value',
        label: t('Analytics.continuity.averageCaregiversPerClient'),
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
      },
    ],
  };

  const warnings = [
    {
      client: 'Anna Nilsson',
      caregivers: 8,
      period: t('Analytics.time.period.30days'),
    },
    {
      client: 'Karl Lindgren',
      caregivers: 7,
      period: t('Analytics.time.period.30days'),
    },
  ];

  const topPerformers = [
    {
      client: 'Anna Nilsson',
      primaryCaregiver: 'Lisa Holm',
      consistency: '85%',
    },
    {
      client: 'Karl Lindgren',
      primaryCaregiver: 'Johan Berg',
      consistency: '80%',
    },
    {
      client: 'Eva Larsson',
      primaryCaregiver: 'Maria Svensson',
      consistency: '78%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <LineChartIcon className="size-5 text-purple-500" />
            <h3 className="text-lg font-semibold">{t('Analytics.continuity.trendTitle')}</h3>
          </div>
        </div>
        <div className="p-6 pt-2">
          <LineChart data={trendData} height={300} />
        </div>
      </div>

      <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-yellow-500" />
            <h3 className="text-lg font-semibold">{t('Analytics.continuity.warningTitle')}</h3>
          </div>
        </div>
        <div className="p-6 pt-2">
          <div className="space-y-4">
            {warnings.map((warning, index) => (
              <Alert key={index} variant="warning" className="bg-yellow-50 text-yellow-900">
                <AlertTitle>
                  {t('Analytics.continuity.warningDesc', {
                    client: warning.client,
                    caregivers: warning.caregivers,
                    period: warning.period,
                  })}
                </AlertTitle>
              </Alert>
            ))}
          </div>
        </div>
      </div>

      <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-green-500" />
            <h3 className="text-lg font-semibold">{t('Analytics.continuity.topPerformanceTitle')}</h3>
          </div>
        </div>
        <div className="p-6 pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Analytics.table.client')}</TableHead>
                <TableHead>{t('Analytics.table.primaryCaregiver')}</TableHead>
                <TableHead>{t('Analytics.table.consistency')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPerformers.map((performer, index) => (
                <TableRow key={index}>
                  <TableCell>{performer.client}</TableCell>
                  <TableCell>{performer.primaryCaregiver}</TableCell>
                  <TableCell>{performer.consistency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
