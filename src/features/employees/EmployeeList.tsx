'use client';

import { Mail, MoreHorizontal, Phone } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import Link from 'next/link';

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
    <div className="rounded-xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">{t('name')}</TableHead>
            <TableHead className="w-[300px]">{t('contact')}</TableHead>
            <TableHead>{t('role')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEmployees.map((employee) => (
            <TableRow
              key={employee.id}
              className="group transition-colors hover:bg-purple-50"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="border-2 border-purple-100">
                    <img src={employee.avatar} alt={employee.name} />
                  </Avatar>
                  <div>
                    <div className="font-medium group-hover:text-purple-700">
                      <Link
                        href={`/dashboard/employees/${employee.id}`}
                        className="hover:text-purple-600"
                      >
                        {employee.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-purple-600" />
                    <span className="text-sm text-muted-foreground">
                      {employee.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-purple-600" />
                    <span className="text-sm text-muted-foreground">
                      {employee.phone}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="border-purple-200 bg-purple-50 text-purple-700"
                >
                  {employee.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={employee.status === 'Active' ? 'default' : 'secondary'}
                  className={
                    employee.status === 'Active'
                      ? 'bg-green-100 text-green-700 hover:bg-green-100'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                  }
                >
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">{t('open_menu')}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      {t('edit')}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      {t('view_schedule')}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                      {t('delete')}
                    </DropdownMenuItem>
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
