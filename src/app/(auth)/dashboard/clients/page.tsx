import type { Metadata } from 'next';

import { PageContainer } from '@/components/shared';
import { ClientDirectory } from '@/features/clients/ClientDirectory';
import { ClientHeader } from '@/features/clients/ClientHeader';
import { getTranslations } from '@/lib/utils/i18n/translations';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const t = await getTranslations('Clients');

    return {
      title: t('page_title'),
      description: t('page_description'),
    };
  } catch {
    // Fallback metadata if translation fails
    return {
      title: 'Klienter - Caire',
      description: 'Hantera dina klienter i Caire.',
    };
  }
}

export default function ClientsPage() {
  return (
    <PageContainer>
      <ClientHeader />
      <ClientDirectory />
    </PageContainer>
  );
}
