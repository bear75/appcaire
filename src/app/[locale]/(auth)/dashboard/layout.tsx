import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const t = useTranslations('DashboardLayout');

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 pl-64">
        <div className="shadow-md">
          <div className="flex items-center justify-end px-6 py-4">
            <DashboardHeader
              menu={[
                {
                  href: '/dashboard',
                  label: t('home'),
                },
                // PRO: Link to the /dashboard/todos page
                {
                  href: '/dashboard/organization-profile/organization-members',
                  label: t('members'),
                },
                {
                  href: '/dashboard/organization-profile',
                  label: t('settings'),
                },
                // PRO: Link to the /dashboard/billing page
              ]}
            />
          </div>
        </div>

        <div className="min-h-[calc(100vh-72px)] bg-muted">
          <div className="p-6">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
