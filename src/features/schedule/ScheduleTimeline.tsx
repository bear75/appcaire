'use client';

import { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import TaskDetailsModal from './TaskDetailsModal';
import { useTranslations } from '@/utils/translations';
import Image from 'next/image';

// Generate time slots from 07:00 to 22:00
const timeSlots = Array.from(
  { length: 16 },
  (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`
);

const mockSchedule = [
  {
    id: 1,
    employeeName: 'Anna Andersson',
    avatar: '/avatars/aa.png',
    visits: [
      {
        id: 1,
        title: 'Medicinering - Erik Svensson',
        clientName: 'Erik Svensson',
        start: '09:00',
        end: '10:00',
        type: 'Medicinering',
        location: 'Storgatan 5, 114 55 Stockholm',
        constraints: [
          {
            type: 'HARD',
            description: 'Måste ges inom tidsintervallet',
            satisfaction: 100,
          },
          {
            type: 'MEDIUM',
            description: 'Föredrar samma vårdgivare',
            satisfaction: 85,
          },
        ],
        conflicts: [
          {
            type: 'Överlappande besök',
            description: 'Nästa besök börjar 10 minuter innan detta slutar',
            severity: 'medium',
          },
        ],
      },
      {
        id: 2,
        title: 'Assistans - Maria Larsson',
        clientName: 'Maria Larsson',
        start: '10:30',
        end: '11:30',
        type: 'Assistans',
        location: 'Kungsgatan 12, 111 35 Stockholm',
        constraints: [
          {
            type: 'SOFT',
            description: 'Föredrar kvinnlig vårdgivare',
            satisfaction: 100,
          },
        ],
      },
    ],
  },
  // Add more employees here
];

// Helper functions
function parseTime(time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function addHours(date: Date, hours: number): string {
  const newDate = new Date(date);
  newDate.setHours(date.getHours() + hours);
  return `${newDate.getHours().toString().padStart(2, '0')}:00`;
}

function formatTime(time: string): string {
  return time;
}

function calculateVisitWidth(visit: any): number {
  const startHour = parseInt(visit.start);
  const endHour = parseInt(visit.end);
  return (endHour - startHour) * 100;
}

export default function ScheduleTimeline() {
  const t = useTranslations('Schedule.timeline');
  const [selectedVisit, setSelectedVisit] = useState<any>(null);

  return (
    <Card className="overflow-hidden">
      <ScrollArea className="h-[600px]" orientation="both">
        <div className="min-w-[1600px]">
          {/* Time slots */}
          <div className="sticky top-0 z-10 flex bg-slate-50 border-b">
            <div className="w-48 border-r p-4 bg-white">
              <span className="font-medium text-purple-600">{t('staff')}</span>
            </div>
            <div className="flex flex-1">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="flex-1 min-w-[100px] h-full border-l border-gray-100 relative"
                  role="gridcell"
                  tabIndex={0}
                >
                  <span className="text-xs font-medium text-gray-500 p-2 block">
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule rows */}
          {mockSchedule.map((employee) => (
            <div key={employee.id} className="flex border-t hover:bg-slate-50/50">
              <div className="flex items-center gap-2 sticky left-0 bg-white z-10 pr-4 min-w-[200px]">
                <div className="relative w-8 h-8">
                  <Image
                    src={employee.avatar || '/placeholder-avatar.png'}
                    alt={employee.employeeName}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {employee.employeeName}
                  </p>
                </div>
              </div>
              <div className="relative flex flex-1 py-2 min-h-[80px]">
                {employee.visits.map((visit) => (
                  <div
                    key={visit.id}
                    className="absolute flex cursor-pointer items-center gap-2 rounded-md bg-white p-3 shadow-sm transition-all hover:bg-purple-50 hover:shadow-lg hover:-translate-y-1 border border-purple-100"
                    style={{
                      left: `${((parseInt(visit.start) - 7) * 100)}px`,
                      width: `${((parseInt(visit.end) - parseInt(visit.start)) * 100)}px`,
                      minWidth: '150px',
                    }}
                    onClick={() => setSelectedVisit(visit)}
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-purple-600 truncate">
                          {visit.clientName}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {visit.start}-{visit.end}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="mt-1 w-fit bg-purple-50 text-purple-600 hover:bg-purple-100"
                      >
                        {visit.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {selectedVisit && (
        <TaskDetailsModal
          isOpen={!!selectedVisit}
          onClose={() => setSelectedVisit(null)}
          task={{
            id: selectedVisit.id,
            employeeName: mockSchedule.find(e => e.visits.some(v => v.id === selectedVisit.id))?.employeeName || '',
            clientName: selectedVisit.clientName,
            startTime: selectedVisit.start,
            endTime: selectedVisit.end,
            location: selectedVisit.location,
            type: selectedVisit.type,
            constraints: selectedVisit.constraints || [],
            conflicts: selectedVisit.conflicts || []
          }}
        />
      )}
    </Card>
  );
}
