import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ClientHeader } from '@/features/clients/ClientHeader';
import { ClientList } from '@/features/clients/ClientList';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Clients');

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default async function ClientsPage() {
  return (
    <main className="container mx-auto space-y-6 p-6">
      <ClientHeader />
      <ClientList />
    </main>
  );
}
