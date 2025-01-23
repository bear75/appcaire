'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart } from '@/components/ui/charts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { t } from '@/utils/translations';

export function ClientInsights() {
  const completionData = {
    data: [
      { name: t('Analytics.time.weekdays.monday'), value: 95 },
      { name: t('Analytics.time.weekdays.tuesday'), value: 98 },
      { name: t('Analytics.time.weekdays.wednesday'), value: 92 },
      { name: t('Analytics.time.weekdays.thursday'), value: 95 },
      { name: t('Analytics.time.weekdays.friday'), value: 90 },
    ],
    datasets: [
      {
        dataKey: 'value',
        label: t('Analytics.clients.completionRate'),
        backgroundColor: '#7C3AED',
      },
    ],
  };

  const specialNeeds = [
    {
      need: 'Särskilda behov',
      fulfilled: '95%',
      status: 'success',
    },
    {
      need: 'Tidsfönster följsamhet',
      fulfilled: '85%',
      status: 'warning',
    },
    {
      need: 'Missade besök',
      fulfilled: '98%',
      status: 'success',
    },
  ];

  const missedVisits = [
    {
      client: 'Karl Svensson',
      date: '2024-01-18',
      time: '09:00',
      reason: t('Analytics.clients.reasons.staffIllness'),
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('Analytics.clients.completionRate')}</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={completionData} height={300} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('Analytics.clients.specialNeedsTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Analytics.table.need')}</TableHead>
                <TableHead>{t('Analytics.table.fulfillment')}</TableHead>
                <TableHead>{t('Analytics.table.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specialNeeds.map((need, index) => (
                <TableRow key={index}>
                  <TableCell>{need.need}</TableCell>
                  <TableCell>{need.fulfilled}</TableCell>
                  <TableCell>
                    <Badge
                      variant={need.status === 'success' ? 'default' : 'secondary'}
                      className={
                        need.status === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {t(`Analytics.status.${need.status}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('Analytics.clients.missedVisitsTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Analytics.table.client')}</TableHead>
                <TableHead>{t('Analytics.table.date')}</TableHead>
                <TableHead>{t('Analytics.table.time')}</TableHead>
                <TableHead>{t('Analytics.table.reason')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {missedVisits.map((visit, index) => (
                <TableRow key={index}>
                  <TableCell>{visit.client}</TableCell>
                  <TableCell>{visit.date}</TableCell>
                  <TableCell>{visit.time}</TableCell>
                  <TableCell>{visit.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
