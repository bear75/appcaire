import { useTranslations } from '@/lib/utils/i18n/translations';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ProcessedSchedule } from '../types';

interface ScheduleMapProps {
  schedule: ProcessedSchedule;
  onTaskSelect: (taskId: string | null) => void;
}

export default function ScheduleMap({ schedule, onTaskSelect }: ScheduleMapProps) {
  const t = useTranslations('Schedule');

  // Group entries by employee
  const employeeRoutes = schedule.data.entries.reduce((acc, entry) => {
    const employeeId = entry.employeeId;
    if (!acc[employeeId]) {
      acc[employeeId] = {
        id: employeeId,
        employee: entry.employeeName,
        totalDistance: '0 km', // To be calculated when map integration is added
        totalTime: '0 min',    // To be calculated when map integration is added
        stops: []
      };
    }
    acc[employeeId].stops.push({
      id: entry.id,
      client: entry.clientName,
      time: entry.startDateTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
      address: entry.location
    });
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">{t('map.title')}</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{t('map.integration_placeholder')}</Badge>
        </div>
      </Card>
    </div>
  );
}
