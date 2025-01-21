'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslations } from '@/utils/translations';

export function ContinuityKPI() {
  const t = useTranslations('Analytics');

  // Mock data - replace with real data from your API
  const continuityTrendData = {
    data: [
      { name: 'Vecka 1', value: 3.5 },
      { name: 'Vecka 2', value: 4.2 },
      { name: 'Vecka 3', value: 3.8 },
      { name: 'Vecka 4', value: 4.5 },
    ],
    datasets: [{
      dataKey: 'value',
      label: t('continuity.averageCaregiversPerClient'),
      borderColor: '#7C3AED',
    }],
  };

  const clientWarnings = [
    {
      client: 'Maria Andersson',
      caregivers: 12,
      period: t('time.period.30days'),
      priority: 'high',
    },
    {
      client: 'Erik Johansson',
      caregivers: 8,
      period: t('time.period.30days'),
      priority: 'medium',
    },
  ];

  const topContinuity = [
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
      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('continuity.trendTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <LineChart data={continuityTrendData} />
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('continuity.warningTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientWarnings.map(warning => (
              <Alert
                key={warning.client}
                variant={warning.priority === 'high' ? 'destructive' : 'default'}
              >
                <AlertTitle>
                  {t('continuity.warningDesc', {
                    client: warning.client,
                    caregivers: warning.caregivers,
                    period: warning.period,
                  })}
                </AlertTitle>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performance */}
      <Card>
        <CardHeader>
          <CardTitle>{t('continuity.topPerformanceTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.client')}</TableHead>
                <TableHead>{t('table.primaryCaregiver')}</TableHead>
                <TableHead>{t('table.consistency')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topContinuity.map(item => (
                <TableRow key={item.client}>
                  <TableCell>{item.client}</TableCell>
                  <TableCell>{item.primaryCaregiver}</TableCell>
                  <TableCell>{item.consistency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
