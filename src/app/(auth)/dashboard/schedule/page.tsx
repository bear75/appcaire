import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared';
import ScheduleContent from '@/features/schedule/ScheduleContent';
import { getTranslations } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Schedule');
  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default function SchedulePage() {
  return (
    <PageContainer>
      <ScheduleContent />
    </PageContainer>
  );
}
