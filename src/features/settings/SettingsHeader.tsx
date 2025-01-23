import { PageHeader } from '@/components/shared';
import { useTranslations } from '@/utils/translations';

export function SettingsHeader() {
  const t = useTranslations('Settings');

  return (
    <PageHeader
      title={t('organization.details.title')}
      description={t('organization.details.description')}
    />
  );
}
