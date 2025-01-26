import type { Metadata } from 'next';

import { PageContainer } from '@/components/shared';
import { VehicleDirectory } from '@/features/vehicles/VehicleDirectory';
import { VehicleHeader } from '@/features/vehicles/VehicleHeader';
import { getTranslations } from '@/lib/utils/i18n/translations';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Vehicles');

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default function VehiclesPage() {
  return (
    <PageContainer>
      <VehicleHeader />
      <VehicleDirectory />
    </PageContainer>
  );
}
