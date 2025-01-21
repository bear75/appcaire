'use client';

import { useTranslations } from '@/utils/translations';

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

export function ClientInsights() {
  const t = useTranslations('Analytics');

  // Mock data - replace with real data from your API
  const completionRateData = {
    data: [
      { name: 'Måndag', value: 95 },
      { name: 'Tisdag', value: 98 },
      { name: 'Onsdag', value: 92 },
      { name: 'Torsdag', value: 96 },
      { name: 'Fredag', value: 94 },
    ],
    datasets: [
      {
        dataKey: 'value',
        label: t('clients.completionRate'),
        backgroundColor: '#7C3AED',
      },
    ],
  };

  const timeWindowData = {
    data: [
      { name: 'Vecka 1', value: 88 },
      { name: 'Vecka 2', value: 92 },
      { name: 'Vecka 3', value: 90 },
      { name: 'Vecka 4', value: 94 },
    ],
    datasets: [
      {
        dataKey: 'value',
        label: t('clients.timeWindowAdherence'),
        borderColor: '#22C55E',
      },
    ],
  };

  const specialNeeds = [
    {
      need: t('clients.needs.medical'),
      fulfillment: '95%',
      status: 'success',
    },
    {
      need: t('clients.needs.language'),
      fulfillment: '85%',
      status: 'warning',
    },
    {
      need: t('clients.needs.mobility'),
      fulfillment: '98%',
      status: 'success',
    },
  ];

  const missedVisits = [
    {
      client: t('staff.employee', { name: 'Karl Svensson' }),
      date: '2024-01-18',
      time: '09:00',
      reason: t('clients.reasons.staffIllness'),
    },
    {
      client: t('staff.employee', { name: 'Eva Berg' }),
      date: '2024-01-17',
      time: '14:30',
      reason: t('clients.reasons.clientUnavailable'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Visit Completion Rates */}
        <Card>
          <CardHeader>
            <CardTitle>{t('clients.completionTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={completionRateData} height={300} />
          </CardContent>
        </Card>

        {/* Time Window Adherence */}
        <Card>
          <CardHeader>
            <CardTitle>{t('clients.timeWindowTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={timeWindowData} height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Special Needs Fulfillment */}
      <Card>
        <CardHeader>
          <CardTitle>{t('clients.specialNeedsTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.need')}</TableHead>
                <TableHead>{t('table.fulfillment')}</TableHead>
                <TableHead>{t('table.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specialNeeds.map(need => (
                <TableRow key={`need-${need.need}`}>
                  <TableCell>{need.need}</TableCell>
                  <TableCell>{need.fulfillment}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        need.status === 'success' ? 'default' : 'secondary'
                      }
                      className={
                        need.status === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {t(`status.${need.status}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Missed Visits */}
      <Card>
        <CardHeader>
          <CardTitle>{t('clients.missedVisitsTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.client')}</TableHead>
                <TableHead>{t('table.date')}</TableHead>
                <TableHead>{t('table.time')}</TableHead>
                <TableHead>{t('table.reason')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {missedVisits.map(visit => (
                <TableRow
                  key={`visit-${visit.client}-${visit.date}-${visit.time}`}
                >
                  <TableCell>{visit.client}</TableCell>
                  <TableCell>{visit.date}</TableCell>
                  <TableCell>{visit.time}</TableCell>
                  <TableCell>
                    <span className="text-red-600">{visit.reason}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
