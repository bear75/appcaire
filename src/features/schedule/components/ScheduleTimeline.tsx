'use client';

import { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import TaskDetailsModal from './TaskDetailsModal';
import { useTranslations } from '@/lib/utils/i18n/translations';
import Image from 'next/image';
import type { ProcessedSchedule } from '../types';

// Generate time slots from 07:00 to 22:00
const timeSlots = Array.from(
  { length: 16 },
  (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`
);

interface ScheduleTimelineProps {
  schedule: ProcessedSchedule;
  onTaskSelect: (taskId: string | null) => void;
}

export default function ScheduleTimeline({ schedule, onTaskSelect }: ScheduleTimelineProps) {
  const t = useTranslations('Schedule');

  // Group entries by employee
  const employeeSchedules = schedule.data.entries.reduce((acc, entry) => {
    const employeeId = entry.employeeId;
    if (!acc[employeeId]) {
      acc[employeeId] = {
        id: employeeId,
        employeeName: entry.employeeName,
        avatar: entry.employeeAvatar || '/images/default-avatar.png',
        visits: []
      };
    }
    acc[employeeId].visits.push({
      id: entry.id,
      title: `${t(`visit_types.${entry.type}`)} - ${entry.clientName}`,
      clientName: entry.clientName,
      start: new Date(entry.startDateTime).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
      end: new Date(entry.endDateTime).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
      type: entry.type,
      location: entry.location,
      constraints: entry.constraints || [],
      conflicts: entry.conflicts || []
    });
    return acc;
  }, {} as Record<string, any>);

  return (
    <Card className="overflow-hidden">
      <ScrollArea className="h-[600px]" orientation="both">
        <div className="min-w-[1600px]">
          {/* Time slots */}
          <div className="sticky top-0 z-10 flex bg-slate-50 border-b">
            <div className="w-48 border-r p-4 bg-white">
              <span className="font-medium text-purple-600">{t('Personal')}</span>
            </div>
            <div className="flex flex-1">
              {timeSlots.map((time, index) => (
                <div
                  key={`timeslot-${time}-${index}`}
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
          {Object.values(employeeSchedules).map((employee) => (
            <div key={`employee-${employee.id}`} className="flex border-t hover:bg-slate-50/50">
              <div className="flex items-center gap-2 sticky left-0 bg-white z-10 pr-4 min-w-[200px]">
                <div className="relative w-8 h-8">
                  <Image
                    src={employee.avatar}
                    alt={employee.employeeName}
                    width={32}
                    height={32}
                    className="rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/default-avatar.png';
                      target.onerror = null;
                    }}
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
                    key={`visit-${visit.id}`}
                    className="absolute flex cursor-pointer items-center gap-2 rounded-md bg-white p-3 shadow-sm transition-all hover:bg-purple-50 hover:shadow-lg hover:-translate-y-1 border border-purple-100"
                    style={{
                      left: `${((parseInt(visit.start) - 7) * 100)}px`,
                      width: `${((parseInt(visit.end) - parseInt(visit.start)) * 100)}px`,
                      minWidth: '150px',
                    }}
                    onClick={() => onTaskSelect(visit.id)}
                  >
                    <div className="flex flex-col w-full space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-purple-600 truncate">
                          {visit.clientName}
                        </span>
                        <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">
                          {visit.start}-{visit.end}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="w-fit bg-purple-50 text-purple-600 hover:bg-purple-100"
                        >
                          {t(`visit_types.${visit.type}`)}
                        </Badge>
                        {visit.location && (
                          <span className="text-xs text-muted-foreground truncate">
                            {visit.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
