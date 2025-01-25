import { PageHeader } from '@/components/shared';
import { useTranslations } from '@/lib/i18n';

export function SettingsHeader() {
  const t = useTranslations('Settings');

  return (
    <PageHeader
      title={t('organization.details.title')}
      description={t('organization.details.description')}
    />
  );
}
