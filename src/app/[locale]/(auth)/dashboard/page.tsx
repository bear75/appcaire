'use client';

import { DashboardOverview } from '@/features/dashboard/DashboardOverview';
import { QuickActions } from '@/features/dashboard/QuickActions';
import { RecentActivity } from '@/features/dashboard/RecentActivity';

export default function DashboardPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto space-y-8 p-8">
        <DashboardOverview />
        <div className="grid gap-8 md:grid-cols-2">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </main>
  );
}
