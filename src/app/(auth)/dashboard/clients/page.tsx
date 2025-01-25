import type { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n';

import { PageContainer } from '@/components/shared';
import { ClientHeader } from '@/features/clients/ClientHeader';
import { ClientDirectory } from '@/features/clients/ClientDirectory';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Clients');
  
  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default function ClientsPage() {
  return (
    <PageContainer>
      <ClientHeader />
      <ClientDirectory />
    </PageContainer>
  );
}
