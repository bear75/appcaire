'use client';

import { useTranslations } from 'next-intl';

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
      { name: 'Anna L.', uppgifter: 8, restid: 45 },
      { name: 'Erik S.', uppgifter: 7, restid: 35 },
      { name: 'Maria H.', uppgifter: 9, restid: 50 },
      { name: 'Johan B.', uppgifter: 6, restid: 30 },
      { name: 'Lisa P.', uppgifter: 8, restid: 40 },
    ],
    datasets: [
      {
        dataKey: 'uppgifter',
        label: 'Uppgifter per dag',
        backgroundColor: '#7C3AED',
      },
      {
        dataKey: 'restid',
        label: 'Restid',
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const skillsData = {
    data: [
      { name: 'Medicinsk vård', value: 30 },
      { name: 'Personlig hygien', value: 25 },
      { name: 'Demensvård', value: 15 },
      { name: 'Första hjälpen', value: 20 },
      { name: 'Säker lyftning', value: 10 },
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
      employee: t('staff.employee', { name: 'Anna Larsson' }),
      certification: t('certifications.medical'),
      expiry: '2025-06-15',
      status: 'valid',
    },
    {
      employee: t('staff.employee', { name: 'Erik Svensson' }),
      certification: t('certifications.firstAid'),
      expiry: '2024-12-01',
      status: 'expiring',
    },
    {
      employee: t('staff.employee', { name: 'Maria Holm' }),
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
