import type { Metadata } from 'next';

import { PageContainer } from '@/components/shared';
import { SettingsHeader } from '@/features/settings/SettingsHeader';
import { SettingsTabs } from '@/features/settings/SettingsTabs';
import { getTranslations } from '@/utils/translations';

export async function generateMetadata(): Promise<Metadata> {
  const translate = await getTranslations('Settings');

  return {
    title: translate('page_title'),
    description: translate('page_description'),
  };
}

export default function SettingsPage() {
  return (
    <PageContainer>
      <SettingsHeader />
      <SettingsTabs />
    </PageContainer>
  );
}
