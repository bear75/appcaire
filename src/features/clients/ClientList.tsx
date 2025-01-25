'use client';

import { Mail, MoreHorizontal, Phone } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useTranslations } from '@/lib/utils/i18n/translations';

interface ClientListProps {
  searchQuery?: string;
  visitTypeFilter?: string;
  statusFilter?: string;
}

// Use the same mock data as ClientGrid
const mockClients = [
  {
    id: 1,
    name: 'Anna Andersson',
    email: 'anna.a@example.com',
    phone: '070-123 45 67',
    visitType: 'medical',
    status: 'active',
    avatar: '/avatars/anna.jpg',
    careNeeds: ['Medicindelning', 'Sårvård'],
  },
  {
    id: 2,
    name: 'Erik Eriksson',
    email: 'erik.e@example.com',
    phone: '070-234 56 78',
    visitType: 'hygiene',
    status: 'active',
    avatar: '/avatars/erik.jpg',
    careNeeds: ['Dusch', 'Påklädning'],
  },
  // Add more mock clients as needed
];

export function ClientList({ 
  searchQuery = '', 
  visitTypeFilter = 'all', 
  statusFilter = 'all' 
}: ClientListProps) {
  const t = useTranslations('Clients');

  const filteredClients = mockClients.filter((client) => {
    // Only apply search filter if there's a search query
    const matchesSearch = !searchQuery || 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.phone && client.phone.includes(searchQuery));
    
    const matchesVisitType = visitTypeFilter === 'all' || client.visitType === visitTypeFilter;
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

    return matchesSearch && matchesVisitType && matchesStatus;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">{t('name')}</TableHead>
          <TableHead>{t('contact')}</TableHead>
          <TableHead>{t('visit_type')}</TableHead>
          <TableHead>{t('status')}</TableHead>
          <TableHead className="w-[70px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredClients.map((client) => (
          <TableRow key={client.id} className="group">
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="size-8 border">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>
                    {client.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="font-medium hover:text-purple-600"
                >
                  {client.name}
                </Link>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="size-4 text-purple-600" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-purple-600" />
                  <span>{client.phone}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{t(client.visitType)}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                {t(client.status)}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href={`/dashboard/clients/${client.id}`} className="w-full">
                      {t('view_profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>{t('edit')}</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">{t('delete')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
