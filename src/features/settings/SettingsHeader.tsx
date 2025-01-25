import { PageHeader } from '@/components/shared/PageHeader';
import { useTranslations } from '@/lib/utils/i18n/translations';

export function SettingsHeader() {
  const t = useTranslations('Settings');

  return <PageHeader title={t('title')} description={t('description')} />;
}
