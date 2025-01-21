import { Mail, MoreHorizontal, Phone } from 'lucide-react';
import { useTranslations } from '@/utils/translations';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data - replace with actual data from your backend
const mockEmployees = [
  {
    id: 1,
    name: 'Anna Andersson',
    email: 'anna.andersson@example.com',
    phone: '+46 70 123 45 67',
    role: 'Nurse',
    status: 'Active',
    avatar: '/avatars/aa.png',
  },
  {
    id: 2,
    name: 'Erik Eriksson',
    email: 'erik.eriksson@example.com',
    phone: '+46 70 234 56 78',
    role: 'Care Assistant',
    status: 'On Leave',
    avatar: '/avatars/ee.png',
  },
];

export function EmployeeList() {
  const t = useTranslations('Employees');

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('contact')}</TableHead>
            <TableHead>{t('role')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEmployees.map(employee => (
            <TableRow key={employee.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <img src={employee.avatar} alt={employee.name} />
                  </Avatar>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-muted-foreground" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-muted-foreground" />
                    <span className="text-sm">{employee.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{employee.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    employee.status === 'Active' ? 'default' : 'secondary'
                  }
                >
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">{t('open_menu')}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>{t('edit')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('view_schedule')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('delete')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
