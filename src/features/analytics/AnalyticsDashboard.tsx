import { CheckCircle, Clock, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, DoughnutChart, LineChart } from '@/components/ui/charts';

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
      { name: 'Jan', value: 12000 },
      { name: 'Feb', value: 19000 },
      { name: 'Mar', value: 15000 },
      { name: 'Apr', value: 25000 },
      { name: 'Maj', value: 22000 },
      { name: 'Jun', value: 30000 },
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
      { name: 'Jan', value: 65 },
      { name: 'Feb', value: 68 },
      { name: 'Mar', value: 70 },
      { name: 'Apr', value: 72 },
      { name: 'Maj', value: 75 },
      { name: 'Jun', value: 78 },
    ],
    datasets: [
      {
        dataKey: 'value',
        label: t('charts.efficiency'),
        borderColor: '#22C55E',
      },
    ],
  };

  const taskCategoriesData = {
    data: [
      { name: 'Medicinsk', value: 30 },
      { name: 'Hygien', value: 25 },
      { name: 'Socialt', value: 25 },
      { name: 'Övrigt', value: 20 },
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
              min
            </div>
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
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('charts.costSavingsTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={costSavingsData} height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('charts.efficiencyTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={efficiencyTrendData} height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Task Categories */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>{t('charts.taskCategoriesTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <DoughnutChart data={taskCategoriesData} height={300} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
