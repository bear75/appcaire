import type { Metadata } from 'next';

import { Overview } from '@/components/dashboard/overview';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { TodaySchedule } from '@/components/dashboard/today-schedule';
import { TrafficLightRecommendations } from '@/components/dashboard/traffic-light';
import { ContentSection } from '@/components/layout/ContentSection';
import { PageContainer, PageHeader } from '@/components/shared';
import { cn } from '@/lib/utils';
import { t } from '@/utils/translations';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

export const metadata: Metadata = {
  title: 'Översikt - Caire',
  description: 'Hantera din hemtjänstsorganisation effektivt med Caire.',
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Översikt"
        description="Hantera din hemtjänstsorganisation effektivt med Caire."
      />
      <div className="space-y-6">
        <ContentSection>
          <StatsCards />
        </ContentSection>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{t('Dashboard.today_schedule.title')}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t('Dashboard.today_schedule.description')}
              </p>
            </div>
            <div className="p-6 pt-2">
              <TodaySchedule />
            </div>
          </div>

          <div className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{t('Dashboard.recommendations.title')}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t('Dashboard.recommendations.description')}
              </p>
            </div>
            <div className="p-6 pt-2">
              <TrafficLightRecommendations />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-7">
          <div className={cn(CARD_STYLES.base, CARD_STYLES.large, 'col-span-4')}>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{t('Dashboard.financial_overview.title')}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t('Dashboard.financial_overview.description')}
              </p>
            </div>
            <div className="p-6 pl-2 pt-2">
              <Overview />
            </div>
          </div>

          <div className={cn(CARD_STYLES.base, CARD_STYLES.large, 'col-span-3')}>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{t('Dashboard.recent_activity.title')}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t('Dashboard.recent_activity.description')}
              </p>
            </div>
            <div className="p-6 pt-2">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
