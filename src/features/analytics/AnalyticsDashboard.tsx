import {
  Car,
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type MetricCardProps = {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  trendUp?: boolean;
};

function MetricCard({ title, value, trend, icon, trendUp }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{value}</p>
              {trend && (
                <div
                  className={`flex items-center text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}
                >
                  {trendUp
                    ? (
                        <TrendingUp className="size-4" />
                      )
                    : (
                        <TrendingDown className="size-4" />
                      )}
                  <span>{trend}</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-primary/10 rounded-full p-2">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AnalyticsDashboard() {
  const t = useTranslations('Analytics');

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title={t('metrics.total_hours')}
          value="156h"
          trend="+2.5%"
          trendUp
          icon={<Clock className="size-4 text-primary" />}
        />
        <MetricCard
          title={t('metrics.active_employees')}
          value="24"
          trend="+2"
          trendUp
          icon={<Users className="size-4 text-primary" />}
        />
        <MetricCard
          title={t('metrics.travel_time')}
          value="12.3h"
          trend="-5.2%"
          trendUp={false}
          icon={<Car className="size-4 text-primary" />}
        />
        <MetricCard
          title={t('metrics.completion_rate')}
          value="98%"
          trend="+1.2%"
          trendUp
          icon={<CheckCircle className="size-4 text-primary" />}
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
          <TabsTrigger value="employees">{t('tabs.employees')}</TabsTrigger>
          <TabsTrigger value="clients">{t('tabs.clients')}</TabsTrigger>
          <TabsTrigger value="routes">{t('tabs.routes')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t('charts.hours_trend')}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add chart component here */}
                <div className="flex h-[350px] items-center justify-center rounded border">
                  {t('charts.coming_soon')}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t('charts.completion_rate')}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add chart component here */}
                <div className="flex h-[350px] items-center justify-center rounded border">
                  {t('charts.coming_soon')}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees">
          {/* Employee-specific analytics */}
        </TabsContent>

        <TabsContent value="clients">
          {/* Client-specific analytics */}
        </TabsContent>

        <TabsContent value="routes">
          {/* Route optimization analytics */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
