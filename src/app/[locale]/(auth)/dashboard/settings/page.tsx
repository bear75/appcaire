import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SettingsHeader } from '@/features/settings/SettingsHeader';
import { SettingsTabs } from '@/features/settings/SettingsTabs';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Settings');

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default function SettingsPage() {
  return (
    <main className="container mx-auto space-y-6 p-6">
      <SettingsHeader />
      <SettingsTabs />
    </main>
  );
}
