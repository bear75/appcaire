import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data - replace with actual data from your backend
const mockRoutes = [
  {
    id: 1,
    employee: 'Anna Andersson',
    totalDistance: '12.5 km',
    totalTime: '45 min',
    stops: [
      {
        id: 1,
        client: 'Erik Svensson',
        time: '09:00',
        address: 'Kungsgatan 1',
      },
      {
        id: 2,
        client: 'Maria Larsson',
        time: '10:30',
        address: 'Drottninggatan 5',
      },
    ],
  },
  // Add more routes here
];

export default function ScheduleMap() {
  const t = useTranslations('Schedule.map');

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Route list */}
      <div className="space-y-4">
        <h3 className="font-semibold">{t('routes')}</h3>
        <ScrollArea className="h-[calc(100vh-24rem)]">
          {mockRoutes.map(route => (
            <Card key={route.id} className="mb-4 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{route.employee}</div>
                  <Badge variant="outline">{route.totalDistance}</Badge>
                </div>

                <div className="space-y-2">
                  {route.stops.map((stop, index) => (
                    <div key={stop.id} className="relative pl-6">
                      {index < route.stops.length - 1 && (
                        <div className="absolute left-2 top-4 -mt-2 h-full w-0.5 bg-border" />
                      )}
                      <div className="absolute left-0 top-2 size-4 rounded-full border-2 border-primary bg-background" />
                      <div>
                        <div className="font-medium">{stop.client}</div>
                        <div className="text-sm text-muted-foreground">
                          {stop.time}
                          {' - '}
                          {stop.address}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground">
                  {t('total_time')}
                  {': '}
                  {route.totalTime}
                </div>
              </div>
            </Card>
          ))}
        </ScrollArea>
      </div>

      {/* Map placeholder - replace with actual map implementation */}
      <div className="bg-muted/10 col-span-2 flex min-h-[500px] items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">{t('integration_placeholder')}</p>
      </div>
    </div>
  );
}
