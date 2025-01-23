'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, DoughnutChart } from '@/components/ui/charts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { t } from '@/utils/translations';

export function StaffAnalysis() {
  const performanceData = {
    data: [
      { name: 'Anna Larsson', tasks: 8, travel: 45 },
      { name: 'Erik Svensson', tasks: 7, travel: 35 },
      { name: 'Maria Holm', tasks: 9, travel: 50 },
      { name: 'Johan Berg', tasks: 6, travel: 30 },
      { name: 'Lisa Pettersson', tasks: 8, travel: 40 },
    ],
    datasets: [
      {
        dataKey: 'tasks',
        label: t('Analytics.staff.tasksPerDay'),
        backgroundColor: '#7C3AED',
      },
      {
        dataKey: 'travel',
        label: t('Analytics.staff.travelTime'),
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const skillsData = {
    data: [
      { name: t('Analytics.staff.personalHygiene'), value: 25 },
      { name: t('Analytics.certifications.medical'), value: 30 },
      { name: t('Analytics.certifications.dementia'), value: 15 },
      { name: t('Analytics.staff.safeLifting'), value: 10 },
      { name: t('Analytics.certifications.firstAid'), value: 20 },
    ],
    datasets: [
      {
        dataKey: 'value',
        backgroundColor: ['#7C3AED', '#3B82F6', '#22C55E', '#94A3B8', '#EAB308'],
      },
    ],
  };

  const certifications = [
    {
      employee: 'Anna Larsson',
      certification: t('Analytics.certifications.medical'),
      status: 'valid',
    },
    {
      employee: 'Erik Svensson',
      certification: t('Analytics.certifications.firstAid'),
      status: 'expiring',
    },
    {
      employee: 'Maria Holm',
      certification: t('Analytics.certifications.dementia'),
      status: 'valid',
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('Analytics.staff.performanceTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={performanceData} height={300} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
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

        <Card>
          <CardHeader>
            <CardTitle>{t('Analytics.staff.certificationsTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personal</TableHead>
                  <TableHead>Certifiering</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifications.map(cert => (
                  <TableRow key={`${cert.employee}-${cert.certification}`}>
                    <TableCell>{cert.employee}</TableCell>
                    <TableCell>{cert.certification}</TableCell>
                    <TableCell>
                      <Badge
                        variant={cert.status === 'valid' ? 'default' : 'secondary'}
                        className={
                          cert.status === 'valid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {cert.status === 'valid' ? 'Giltig' : 'Går snart ut'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
