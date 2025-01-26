import type { Metadata } from 'next';

import { PageContainer } from '@/components/shared';
import ScheduleContent from '@/features/schedule/ScheduleContent';
import { getTranslations } from '@/lib/utils/i18n/translations';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const t = await getTranslations('Schedule');
    return {
      title: t('page_title'),
      description: t('page_description'),
    };
  } catch {
    // Fallback metadata if translation fails
    return {
      title: 'Schema - Caire',
      description: 'Hantera ditt schema i Caire.',
    };
  }
}

export default function SchedulePage() {
  return (
    <PageContainer>
      <ScheduleContent />
    </PageContainer>
  );
}
