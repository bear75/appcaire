import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AnalyticsDashboard } from '@/features/analytics/AnalyticsDashboard';
import { AnalyticsHeader } from '@/features/analytics/AnalyticsHeader';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Analytics');

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default async function AnalyticsPage() {
  return (
    <main className="container mx-auto space-y-6 p-6">
      <AnalyticsHeader />
      <AnalyticsDashboard />
    </main>
  );
}
