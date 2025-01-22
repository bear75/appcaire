'use client';

import { useOrganization } from '@clerk/nextjs';
import { Suspense } from 'react';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ORG_ROLE } from '@/types/Auth';
import { useTranslations } from '@/utils/translations';

import { AnalyticsDashboard } from './AnalyticsDashboard';
import { AnalyticsHeader } from './AnalyticsHeader';
import { ClientInsights } from './ClientInsights';
import { ContinuityKPI } from './ContinuityKPI';
import { MultiOrgAnalytics } from './MultiOrgAnalytics';
import { ScheduleOptimization } from './ScheduleOptimization';
import { StaffAnalysis } from './StaffAnalysis';

export function AnalyticsContent() {
  const t = useTranslations('Analytics');
  const { membership } = useOrganization();
  const isSuperAdmin = membership?.role === ORG_ROLE.SUPER_ADMIN;

  return (
    <main className="container mx-auto space-y-6 p-6">
      <AnalyticsHeader />

      {isSuperAdmin && <MultiOrgAnalytics />}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 gap-4 bg-background p-1">
          <TabsTrigger
            value="overview"
            className="rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            {t('tabs.overview')}
          </TabsTrigger>
          <TabsTrigger
            value="staff"
            className="rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            {t('tabs.staff')}
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            {t('tabs.schedule')}
          </TabsTrigger>
          <TabsTrigger
            value="continuity"
            className="rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            {t('tabs.continuity')}
          </TabsTrigger>
          <TabsTrigger
            value="clients"
            className="rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            {t('tabs.clients')}
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview">
            <Suspense fallback={<Card className="h-96 w-full animate-pulse" />}>
              <AnalyticsDashboard />
            </Suspense>
          </TabsContent>

          <TabsContent value="staff">
            <Suspense fallback={<Card className="h-96 w-full animate-pulse" />}>
              <StaffAnalysis />
            </Suspense>
          </TabsContent>

          <TabsContent value="schedule">
            <Suspense fallback={<Card className="h-96 w-full animate-pulse" />}>
              <ScheduleOptimization />
            </Suspense>
          </TabsContent>

          <TabsContent value="continuity">
            <Suspense fallback={<Card className="h-96 w-full animate-pulse" />}>
              <ContinuityKPI />
            </Suspense>
          </TabsContent>

          <TabsContent value="clients">
            <Suspense fallback={<Card className="h-96 w-full animate-pulse" />}>
              <ClientInsights />
            </Suspense>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
