'use client';

import { useOrganization } from '@clerk/nextjs';
import { Suspense } from 'react';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/shared';
import { ContentSection } from '@/components/layout/ContentSection';
import { ORG_ROLE } from '@/types/Auth';
import { useTranslations } from '@/lib/utils/i18n/translations';

import { AnalyticsDashboard } from './AnalyticsDashboard';
import { AnalyticsHeader } from './AnalyticsHeader';
import { ClientInsights } from './ClientInsights';
import { ContinuityKPI } from './ContinuityKPI';
import { MultiOrgAnalytics } from './MultiOrgAnalytics';
import { ScheduleOptimization } from './ScheduleOptimization';
import { StaffAnalysis } from './StaffAnalysis';

const TAB_STYLES = "rounded-md px-3 py-2.5 text-sm font-medium ring-offset-background transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:shadow-sm hover:-translate-y-0.5 active:translate-y-0";

export function AnalyticsContent() {
  const t = useTranslations('Analytics');
  const { membership } = useOrganization();
  const isSuperAdmin = membership?.role === ORG_ROLE.SUPER_ADMIN;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('description')}
      >
        <AnalyticsHeader />
      </PageHeader>

      {isSuperAdmin && (
        <ContentSection contentClassName="p-0" elevated>
          <MultiOrgAnalytics />
        </ContentSection>
      )}

      <ContentSection contentClassName="p-0" elevated>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 gap-4 bg-slate-50/50 p-1.5 rounded-lg shadow-inner">
            <TabsTrigger value="overview" className={TAB_STYLES}>
              {t('tabs.overview')}
            </TabsTrigger>
            <TabsTrigger value="staff" className={TAB_STYLES}>
              {t('tabs.staff')}
            </TabsTrigger>
            <TabsTrigger value="schedule" className={TAB_STYLES}>
              {t('tabs.schedule')}
            </TabsTrigger>
            <TabsTrigger value="continuity" className={TAB_STYLES}>
              {t('tabs.continuity')}
            </TabsTrigger>
            <TabsTrigger value="clients" className={TAB_STYLES}>
              {t('tabs.clients')}
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="mt-0">
              <Suspense fallback={<Card className="h-96 w-full animate-pulse shadow-md" />}>
                <AnalyticsDashboard />
              </Suspense>
            </TabsContent>

            <TabsContent value="staff" className="mt-0">
              <Suspense fallback={<Card className="h-96 w-full animate-pulse shadow-md" />}>
                <StaffAnalysis />
              </Suspense>
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <Suspense fallback={<Card className="h-96 w-full animate-pulse shadow-md" />}>
                <ScheduleOptimization />
              </Suspense>
            </TabsContent>

            <TabsContent value="continuity" className="mt-0">
              <Suspense fallback={<Card className="h-96 w-full animate-pulse shadow-md" />}>
                <ContinuityKPI />
              </Suspense>
            </TabsContent>

            <TabsContent value="clients" className="mt-0">
              <Suspense fallback={<Card className="h-96 w-full animate-pulse shadow-md" />}>
                <ClientInsights />
              </Suspense>
            </TabsContent>
          </div>
        </Tabs>
      </ContentSection>
    </div>
  );
}
