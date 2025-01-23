import { useTranslations } from '@/utils/translations';
import { Card } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

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

const BADGE_VARIANTS = {
  Scheduled: 'bg-purple-50 text-purple-600 border-purple-100',
  Completed: 'bg-green-50 text-green-600 border-green-100',
  Pending: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  Cancelled: 'bg-red-50 text-red-600 border-red-100',
};

export default function ScheduleGrid() {
  const t = useTranslations('Schedule');  // Using available namespace

  return (
    <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          {t('grid.title')}
        </h3>
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-100">
                <TableHead className="font-medium text-slate-600">{t('grid.employee')}</TableHead>
                <TableHead className="font-medium text-slate-600">{t('grid.client')}</TableHead>
                <TableHead className="font-medium text-slate-600">{t('grid.time')}</TableHead>
                <TableHead className="font-medium text-slate-600">{t('grid.type')}</TableHead>
                <TableHead className="font-medium text-slate-600">{t('grid.status')}</TableHead>
                <TableHead className="font-medium text-slate-600">{t('grid.location')}</TableHead>
                <TableHead className="font-medium text-slate-600">{t('grid.constraints')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssignments.map((assignment, index) => (
                <TableRow 
                  key={assignment.id}
                  className={cn(
                    "hover:bg-slate-50 transition-colors",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8 ring-2 ring-purple-100">
                        <img
                          src={assignment.employee.avatar}
                          alt={assignment.employee.name}
                          className="object-cover"
                        />
                      </Avatar>
                      <div>
                        <div className="font-medium text-slate-900">
                          {assignment.employee.name}
                        </div>
                        <div className="text-sm text-slate-600">
                          {assignment.employee.role}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">{assignment.client}</TableCell>
                  <TableCell className="text-slate-600">{assignment.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                      {assignment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        BADGE_VARIANTS[assignment.status as keyof typeof BADGE_VARIANTS] || BADGE_VARIANTS.Pending
                      )}
                    >
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{assignment.location}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {assignment.constraints.map(constraint => (
                        <Badge
                          key={constraint}
                          variant="outline"
                          className="bg-purple-50/50 text-purple-600 border-purple-100"
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
      </div>
    </Card>
  );
}
