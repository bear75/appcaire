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
    skills: ['Medicin', 'Sårvård', 'Demens'],
  },
  {
    id: 2,
    name: 'Erik Eriksson',
    email: 'erik.eriksson@example.com',
    phone: '+46 70 234 56 78',
    role: 'Care Assistant',
    status: 'On Leave',
    avatar: '/avatars/ee.png',
    skills: ['Personlig hygien', 'Förflyttning', 'Matning'],
  },
];

export function EmployeeGrid() {
  const t = useTranslations('Employees');

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockEmployees.map((employee) => (
        <div
          key={employee.id}
          className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Card Header */}
          <div className="absolute right-4 top-4">
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
                <DropdownMenuItem>{t('edit')}</DropdownMenuItem>
                <DropdownMenuItem>{t('view_schedule')}</DropdownMenuItem>
                <DropdownMenuItem>{t('delete')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Employee Info */}
          <div className="flex flex-col items-center text-center">
            <Avatar className="size-20 border-2 border-purple-100">
              <img src={employee.avatar} alt={employee.name} />
            </Avatar>
            <Link
              href={`/dashboard/employees/${employee.id}`}
              className="mt-4 font-semibold hover:text-purple-600"
            >
              {employee.name}
            </Link>
            <Badge
              variant={employee.status === 'Active' ? 'default' : 'secondary'}
              className="mt-2"
            >
              {employee.status}
            </Badge>
            <Badge variant="outline" className="mt-2">
              {employee.role}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="size-4" />
              <span className="truncate">{employee.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4" />
              <span>{employee.phone}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* View Profile Button */}
          <div className="mt-6">
            <Link href={`/dashboard/employees/${employee.id}`}>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
              >
                {t('view_profile')}
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 