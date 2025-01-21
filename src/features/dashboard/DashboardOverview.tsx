'use client';

import { useTranslations } from '@/utils/translations';

import { KPICard } from '@/components/KPICard';

export const DashboardOverview = () => {
  const t = useTranslations('DashboardOverview');

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        {t('welcome')}
      </h1>
      <div className="grid gap-4 md:grid-cols-4">
        <KPICard
          title={t('active_employees')}
          value="24"
          trend="+2"
          description={t('since_last_month')}
        />
        <KPICard
          title={t('active_clients')}
          value="156"
          trend="+5"
          description={t('since_last_month')}
        />
        <KPICard
          title={t('schedule_completion')}
          value="98%"
          trend="+3%"
          description={t('completion_rate')}
        />
        <KPICard
          title={t('travel_time')}
          value="15min"
          trend="-5%"
          description={t('average_per_visit')}
        />
      </div>
    </div>
  );
};
