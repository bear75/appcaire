import type { Metadata } from 'next';

import { PageContainer } from '@/components/shared';
import { AnalyticsContent } from '@/features/analytics/AnalyticsContent';
import { getTranslations } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Analytics');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <AnalyticsContent />
    </PageContainer>
  );
}
