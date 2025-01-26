import type { Metadata } from 'next';

import { PageContainer } from '@/components/shared';
import { SettingsHeader } from '@/features/settings/SettingsHeader';
import { SettingsTabs } from '@/features/settings/SettingsTabs';
import { getTranslations } from '@/lib/utils/i18n/translations';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const t = await getTranslations('Settings');
    return {
      title: t('page_title'),
      description: t('page_description'),
    };
  } catch {
    // Fallback metadata if translation fails
    return {
      title: 'Inställningar - Caire',
      description: 'Hantera dina inställningar i Caire.',
    };
  }
}

export default function SettingsPage() {
  return (
    <PageContainer>
      <SettingsHeader />
      <SettingsTabs />
    </PageContainer>
  );
}
