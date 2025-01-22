import { CheckCircle, Clock, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, DoughnutChart, LineChart } from '@/components/ui/charts';
import { useTranslations } from '@/utils/translations';

export function AnalyticsDashboard() {
  const t = useTranslations('Analytics');

  // Mock data - replace with real data from your API
  const kpiData = {
    staffUtilization: 75,
    travelTime: 45,
    completionRate: 92,
  };

  const costSavingsData = {
    data: [
      { name: t('months.jan'), value: 12000 },
      { name: t('months.feb'), value: 19000 },
      { name: t('months.mar'), value: 15000 },
      { name: t('months.apr'), value: 25000 },
      { name: t('months.may'), value: 22000 },
      { name: t('months.jun'), value: 30000 },
    ],
    datasets: [
      {
        dataKey: 'value',
        label: t('charts.costSavings'),
        backgroundColor: '#7C3AED',
      },
    ],
  };

  const efficiencyTrendData = {
    data: [
      { name: t('months.jan'), value: 65 },
      { name: t('months.feb'), value: 68 },
      { name: t('months.mar'), value: 70 },
      { name: t('months.apr'), value: 72 },
      { name: t('months.may'), value: 75 },
      { name: t('months.jun'), value: 78 },
    ],
    datasets: [
      {
        dataKey: 'value',
        label: t('charts.efficiency'),
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
      },
    ],
  };

  const taskCategoriesData = {
    data: [
      { name: t('tasks.medical'), value: 30 },
      { name: t('tasks.hygiene'), value: 25 },
      { name: t('tasks.social'), value: 25 },
      { name: t('tasks.other'), value: 20 },
    ],
    datasets: [
      {
        dataKey: 'value',
        backgroundColor: ['#7C3AED', '#3B82F6', '#22C55E', '#EAB308'],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Organization Overview */}
      <Card className="border-none bg-purple-50">
        <CardHeader>
          <CardTitle>{t('organization.title')}</CardTitle>
          <p className="text-sm text-muted-foreground">{t('organization.description')}</p>
        </CardHeader>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('kpi.staffUtilization')}
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiData.staffUtilization}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {t('comparison.increase_2_1')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('kpi.travelTime')}
            </CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiData.travelTime}
              {' '}
              {t('comparison.minutes')}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('comparison.decrease_5')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('kpi.completionRate')}
            </CardTitle>
            <CheckCircle className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiData.completionRate}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {t('comparison.increase_0_5')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t('charts.costSavingsTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={costSavingsData} height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t('charts.efficiencyTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={efficiencyTrendData} height={300} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t('charts.taskCategoriesTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <DoughnutChart data={taskCategoriesData} height={300} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
