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
import { useTranslations } from '@/lib/utils/i18n/translations';

interface ClientGridProps {
  searchQuery?: string;
  visitTypeFilter?: string;
  statusFilter?: string;
}

// Mock data - replace with actual data fetching
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

export function ClientGrid({ 
  searchQuery = '', 
  visitTypeFilter = 'all', 
  statusFilter = 'all' 
}: ClientGridProps) {
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
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredClients.map((client) => (
        <div
          key={client.id}
          className="group relative rounded-lg border bg-white p-4 transition-all hover:shadow-md"
        >
          <div className="absolute right-4 top-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
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
          </div>

          <div className="mb-4 flex items-start gap-4">
            <Avatar className="size-12 border">
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback>
                {client.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="block font-medium hover:text-purple-600"
              >
                {client.name}
              </Link>
              <div className="flex gap-2">
                <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                  {t(client.status)}
                </Badge>
                <Badge variant="outline">{t(client.visitType)}</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="size-4 text-purple-600" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4 text-purple-600" />
              <span>{client.phone}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 text-sm font-medium">{t('care_needs')}</div>
            <div className="flex flex-wrap gap-2">
              {client.careNeeds.map((need) => (
                <Badge key={need} variant="secondary">
                  {need}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 