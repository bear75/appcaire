import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScheduleHeader from '@/features/schedule/ScheduleHeader';
import ScheduleTimeline from '@/features/schedule/ScheduleTimeline';
import ScheduleMetrics from '@/features/schedule/ScheduleMetrics';

export const metadata: Metadata = {
  title: 'Schema | Caire',
  description: 'Hantera och optimera ditt hemtjänstschema',
};

export default function SchedulePage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <ScheduleHeader />
      <ScheduleMetrics />
      
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Tidslinje</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="karta">Karta</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline" className="space-y-4">
          <ScheduleTimeline />
        </TabsContent>
        <TabsContent value="schema">Schema vy kommer snart</TabsContent>
        <TabsContent value="karta">Karta vy kommer snart</TabsContent>
      </Tabs>
    </div>
  );
}
