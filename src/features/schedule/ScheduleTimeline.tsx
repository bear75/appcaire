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
        type: 'Medicinering',
      },
      {
        id: 2,
        clientName: 'Maria Larsson',
        start: '10:30',
        end: '11:30',
        type: 'Assistans',
      },
    ],
  },
  // Add more employees here
];

export default function ScheduleTimeline() {
  return (
    <ScrollArea className="h-[600px]">
      <div className="relative min-w-[800px]">
        {/* Time slots */}
        <div className="sticky top-0 z-10 flex bg-background">
          <div className="w-48 border-r p-4">Personal</div>
          <div className="flex flex-1">
            {timeSlots.map((time) => (
              <div key={time} className="w-24 border-r p-4 text-center">
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule rows */}
        {mockSchedule.map((employee) => (
          <div key={employee.id} className="flex border-t">
            <div className="flex w-48 items-center gap-2 border-r p-4">
              <Avatar>
                <img src={employee.avatar} alt={employee.employeeName} />
              </Avatar>
              <span className="font-medium">{employee.employeeName}</span>
            </div>
            <div className="relative flex flex-1">
              {employee.visits.map((visit) => (
                <div
                  key={visit.id}
                  className="absolute flex items-center gap-2 rounded-md bg-primary/10 p-2"
                  style={{
                    left: `${(parseInt(visit.start) * 100) / 24}%`,
                    width: `${
                      ((parseInt(visit.end) - parseInt(visit.start)) * 100) / 24
                    }%`,
                  }}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{visit.clientName}</span>
                    <Badge variant="secondary">{visit.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
