import type { Metadata } from 'next';
import { getTranslations } from '@/utils/translations';

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
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <ClientHeader />
      <ClientDirectory />
    </div>
  );
}
