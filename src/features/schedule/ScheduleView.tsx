import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ScheduleGrid from './ScheduleGrid';
import ScheduleMap from './ScheduleMap';
import ScheduleMetrics from './ScheduleMetrics';
import ScheduleTimeline from './ScheduleTimeline';

export default function ScheduleView() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ScheduleMetrics />
      </div>

      <Card className="p-0">
        <Tabs defaultValue="timeline" className="w-full">
          <div className="border-b px-6 py-2">
            <TabsList>
              <TabsTrigger value="timeline">Tidslinje</TabsTrigger>
              <TabsTrigger value="grid">Schema</TabsTrigger>
              <TabsTrigger value="map">Karta</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="timeline" className="m-0">
              <ScheduleTimeline />
            </TabsContent>

            <TabsContent value="grid" className="m-0">
              <ScheduleGrid />
            </TabsContent>

            <TabsContent value="map" className="m-0">
              <ScheduleMap />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
