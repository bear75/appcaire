import type { Metadata } from 'next';

import { Overview } from '@/components/dashboard/overview';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { TodaySchedule } from '@/components/dashboard/today-schedule';
import { TrafficLightRecommendations } from '@/components/dashboard/traffic-light';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslations } from '@/utils/translations';

export const metadata: Metadata = {
  title: 'Dashboard - Caire',
  description: 'Hantera din hemvårdsorganisation effektivt med Caires dashboard.',
};

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">{t('title')}</h1>
      </div>

      {/* Key KPI Cards */}
      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>{t('today_schedule.title')}</CardTitle>
            <CardDescription>
              {t('today_schedule.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TodaySchedule />
          </CardContent>
        </Card>

        {/* Traffic Light Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>{t('recommendations.title')}</CardTitle>
            <CardDescription>
              {t('recommendations.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficLightRecommendations />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Financial Overview Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t('financial_overview.title')}</CardTitle>
            <CardDescription>
              {t('financial_overview.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        {/* Latest Activities / Alerts */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t('recent_activity.title')}</CardTitle>
            <CardDescription>
              {t('recent_activity.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
