import { useTranslations } from 'next-intl';

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

// Mock data - replace with actual data from your backend
const mockAssignments = [
  {
    id: 1,
    employee: {
      name: 'Anna Andersson',
      avatar: '/avatars/aa.png',
      role: 'Nurse',
    },
    client: 'Erik Svensson',
    time: '09:00 - 10:00',
    type: 'Medication',
    status: 'Scheduled',
    location: 'Kungsgatan 1',
    constraints: ['Qualification', 'Time Window'],
  },
  // Add more assignments here
];

export default function ScheduleGrid() {
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
          {mockAssignments.map(assignment => (
            <TableRow key={assignment.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <img
                      src={assignment.employee.avatar}
                      alt={assignment.employee.name}
                    />
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {assignment.employee.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {assignment.employee.role}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{assignment.client}</TableCell>
              <TableCell>{assignment.time}</TableCell>
              <TableCell>
                <Badge variant="outline">{assignment.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    assignment.status === 'Scheduled' ? 'secondary' : 'default'
                  }
                >
                  {assignment.status}
                </Badge>
              </TableCell>
              <TableCell>{assignment.location}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {assignment.constraints.map(constraint => (
                    <Badge
                      key={constraint}
                      variant="outline"
                      className="bg-primary/5"
                    >
                      {constraint}
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
