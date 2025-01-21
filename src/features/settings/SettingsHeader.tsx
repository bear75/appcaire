import { useTranslations } from '@/utils/translations';

export function SettingsHeader() {
  const t = useTranslations('Settings');

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-lg text-muted-foreground">{t('description')}</p>
      </div>
    </div>
  );
}
