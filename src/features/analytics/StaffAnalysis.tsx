'use client';

import { Award, BarChart2, PieChart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { BarChart, DoughnutChart } from '@/components/ui/charts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { t } from '@/lib/utils/i18n/translations';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

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
      <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="size-5 text-purple-500" />
            <h3 className="text-lg font-semibold">{t('Analytics.staff.performanceTitle')}</h3>
          </div>
        </div>
        <div className="p-6 pt-2">
          <BarChart data={performanceData} height={300} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <PieChart className="size-5 text-blue-500" />
              <h3 className="text-lg font-semibold">{t('Analytics.staff.skillsTitle')}</h3>
            </div>
          </div>
          <div className="p-6 pt-2">
            <div className="flex justify-center">
              <DoughnutChart data={skillsData} height={300} />
            </div>
          </div>
        </div>

        <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <Award className="size-5 text-green-500" />
              <h3 className="text-lg font-semibold">{t('Analytics.staff.certificationsTitle')}</h3>
            </div>
          </div>
          <div className="p-6 pt-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
