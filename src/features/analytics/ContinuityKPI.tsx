'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { t } from '@/utils/translations';

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
      <Card>
        <CardHeader>
          <CardTitle>{t('Analytics.continuity.trendTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={trendData} height={300} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('Analytics.continuity.warningTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('Analytics.continuity.topPerformanceTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
