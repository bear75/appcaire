'use client';

import { useTranslations } from '@/utils/translations';

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

export function StaffAnalysis() {
  const t = useTranslations('Analytics');

  // Mock data - replace with real data from your API
  const performanceData = {
    data: [
      { name: 'Anna L.', tasks: 8, travel: 45 },
      { name: 'Erik S.', tasks: 7, travel: 35 },
      { name: 'Maria H.', tasks: 9, travel: 50 },
      { name: 'Johan B.', tasks: 6, travel: 30 },
      { name: 'Lisa P.', tasks: 8, travel: 40 },
    ],
    datasets: [
      {
        dataKey: 'tasks',
        label: t('staff.tasksPerDay'),
        backgroundColor: '#7C3AED',
      },
      {
        dataKey: 'travel',
        label: t('staff.travelTime'),
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const skillsData = {
    data: [
      { name: t('certifications.medical'), value: 30 },
      { name: t('staff.personalHygiene'), value: 25 },
      { name: t('certifications.dementia'), value: 15 },
      { name: t('certifications.firstAid'), value: 20 },
      { name: t('staff.safeLifting'), value: 10 },
    ],
    datasets: [
      {
        dataKey: 'value',
        backgroundColor: [
          '#7C3AED',
          '#3B82F6',
          '#22C55E',
          '#EAB308',
          '#94A3B8',
        ],
      },
    ],
  };

  const certifications = [
    {
      employee: 'Anna Larsson',
      certification: t('certifications.medical'),
      expiry: '2025-06-15',
      status: 'valid',
    },
    {
      employee: 'Erik Svensson',
      certification: t('certifications.firstAid'),
      expiry: '2024-12-01',
      status: 'expiring',
    },
    {
      employee: 'Maria Holm',
      certification: t('certifications.dementia'),
      expiry: '2025-03-20',
      status: 'valid',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Employee Performance */}
      <Card>
        <CardHeader>
          <CardTitle>{t('staff.performanceTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={performanceData} height={300} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Skills Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t('staff.skillsTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <DoughnutChart data={skillsData} height={300} />
            </div>
          </CardContent>
        </Card>

        {/* Certification Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>{t('staff.certificationsTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table.employee')}</TableHead>
                  <TableHead>{t('table.certification')}</TableHead>
                  <TableHead>{t('table.expiry')}</TableHead>
                  <TableHead>{t('table.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifications.map(cert => (
                  <TableRow key={`cert-${cert.employee}-${cert.certification}`}>
                    <TableCell>{cert.employee}</TableCell>
                    <TableCell>{cert.certification}</TableCell>
                    <TableCell>{cert.expiry}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          cert.status === 'valid' ? 'default' : 'secondary'
                        }
                        className={
                          cert.status === 'valid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {t(`status.${cert.status}`)}
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
