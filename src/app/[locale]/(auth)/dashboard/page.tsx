import { useTranslations } from 'next-intl';

import { DashboardOverview } from '@/features/dashboard/DashboardOverview';
import { QuickActions } from '@/features/dashboard/QuickActions';
import { RecentActivity } from '@/features/dashboard/RecentActivity';
import { TitleBar } from '@/features/dashboard/TitleBar';

const DashboardPage = () => {
  const t = useTranslations('Dashboard');

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="space-y-6">
        {/* Overview Cards */}
        <DashboardOverview />

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </>
  );
};

export default DashboardPage;
