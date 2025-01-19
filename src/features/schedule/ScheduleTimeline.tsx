import { useTranslations } from 'next-intl';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data - replace with actual data from your backend
const timeSlots = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, '0')}:00`,
);

const mockSchedule = [
  {
    id: 1,
    employeeName: 'Anna Andersson',
    avatar: '/avatars/aa.png',
    visits: [
      {
        id: 1,
        clientName: 'Erik Svensson',
        start: '09:00',
        end: '10:00',
        type: 'Medication',
      },
      {
        id: 2,
        clientName: 'Maria Larsson',
        start: '10:30',
        end: '11:30',
        type: 'Assistance',
      },
    ],
  },
  // Add more employees here
];

export default function ScheduleTimeline() {
  const t = useTranslations('Schedule.timeline');

  return (
    <div className="relative">
      {/* Timeline header */}
      <div className="sticky top-0 z-10 border-b bg-background">
        <div className="flex">
          <div className="w-48 shrink-0 border-r p-4">{t('employee')}</div>
          <div className="flex-1">
            <div className="grid-cols-24 grid gap-0">
              {timeSlots.map(time => (
                <div
                  key={time}
                  className="border-r px-2 py-4 text-center text-sm"
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline content */}
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="relative">
          {mockSchedule.map(employee => (
            <div key={employee.id} className="flex border-b">
              {/* Employee info */}
              <div className="w-48 shrink-0 border-r p-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <img src={employee.avatar} alt={employee.employeeName} />
                  </Avatar>
                  <span className="font-medium">{employee.employeeName}</span>
                </div>
              </div>

              {/* Schedule grid */}
              <div className="relative flex-1">
                <div className="grid-cols-24 grid h-full gap-0">
                  {timeSlots.map(time => (
                    <div key={time} className="h-full border-r" />
                  ))}
                </div>

                {/* Visits */}
                <div className="absolute inset-0">
                  {employee.visits.map((visit) => {
                    const startHour = Number.parseInt(
                      visit.start.split(':')[0],
                    );
                    const endHour = Number.parseInt(visit.end.split(':')[0]);
                    const duration = endHour - startHour;
                    const startPercentage = (startHour / 24) * 100;
                    const widthPercentage = (duration / 24) * 100;

                    return (
                      <div
                        key={visit.id}
                        className="bg-primary/10 absolute top-1 rounded-md p-2 text-sm"
                        style={{
                          left: `${startPercentage}%`,
                          width: `${widthPercentage}%`,
                        }}
                      >
                        <div className="font-medium">{visit.clientName}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{visit.type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {visit.start}
                            {' '}
                            -
                            {visit.end}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
