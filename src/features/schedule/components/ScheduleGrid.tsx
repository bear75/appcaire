import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslations } from '@/lib/i18n';

import type { ProcessedSchedule } from '../types';

type ScheduleGridProps = {
  schedule: ProcessedSchedule;
  onTaskSelect: (taskId: string | null) => void;
};

export default function ScheduleGrid({ schedule, onTaskSelect }: ScheduleGridProps) {
  const t = useTranslations('Schedule.grid');

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('employee')}</TableHead>
            <TableHead>{t('client')}</TableHead>
            <TableHead>{t('time')}</TableHead>
            <TableHead>{t('type')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('location')}</TableHead>
            <TableHead>{t('constraints')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.data.entries.map(entry => (
            <TableRow key={entry.id} onClick={() => onTaskSelect(entry.id)} className="cursor-pointer hover:bg-slate-50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <img
                      src={entry.employeeAvatar || '/placeholder-avatar.png'}
                      alt={entry.employeeName}
                    />
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {entry.employeeName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {entry.employeeRole || t('staff')}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{entry.clientName}</TableCell>
              <TableCell>
                {entry.startDateTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                {' '}
                -
                {entry.endDateTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{entry.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {schedule.status}
                </Badge>
              </TableCell>
              <TableCell>{entry.location}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {entry.constraints?.map(constraint => (
                    <Badge
                      key={constraint.type}
                      variant="outline"
                      className="bg-primary/5"
                    >
                      {constraint.type}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
