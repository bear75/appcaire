import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Sidebar } from '@/components/layout/Sidebar';
import ScheduleHeader from '@/features/schedule/ScheduleHeader';
import ScheduleView from '@/features/schedule/ScheduleView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Schedule');

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default async function SchedulePage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <main className="container mx-auto space-y-6 p-6">
          <ScheduleHeader />
          <ScheduleView />
        </main>
      </div>
    </div>
  );
}
