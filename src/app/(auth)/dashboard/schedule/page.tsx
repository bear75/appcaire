import type { Metadata } from 'next';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScheduleHeader from '@/features/schedule/ScheduleHeader';
import ScheduleMetrics from '@/features/schedule/ScheduleMetrics';
import ScheduleTimeline from '@/features/schedule/ScheduleTimeline';

export const metadata: Metadata = {
  title: 'Schema | Caire',
  description: 'Hantera och optimera ditt hemtjänstschema',
};

export default function SchedulePage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <ScheduleHeader />
      <ScheduleMetrics />

      <Tabs defaultValue="tidslinje" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 gap-4 bg-background p-1">
          <TabsTrigger
            value="tidslinje"
            className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            Tidslinje
          </TabsTrigger>
          <TabsTrigger
            value="schema"
            className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            Schema
          </TabsTrigger>
          <TabsTrigger
            value="karta"
            className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
          >
            Karta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tidslinje" className="space-y-4">
          <ScheduleTimeline />
        </TabsContent>
        <TabsContent value="schema">Schema vy kommer snart</TabsContent>
        <TabsContent value="karta">Karta vy kommer snart</TabsContent>
      </Tabs>
    </div>
  );
}
