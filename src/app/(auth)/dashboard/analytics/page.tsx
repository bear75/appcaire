import type { Metadata } from 'next';
import { getTranslations } from '@/utils/translations';

import { AnalyticsContent } from '@/features/analytics/AnalyticsContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Analytics');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}
