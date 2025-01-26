'use client';

import { Car } from 'lucide-react';

import { PageHeader } from '@/components/shared';
import { useTranslations } from '@/lib/utils/i18n/translations';

export function VehicleHeader() {
  const t = useTranslations('Vehicles');

  return (
    <PageHeader
      title={t('title')}
      description={t('description')}
      icon={<Car className="size-5 text-purple-600" />}
    />
  );
}
