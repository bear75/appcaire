import { Calendar, Clock, MapPin, MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
const mockClients = [
  {
    id: 1,
    name: 'Erik Svensson',
    address: 'Kungsgatan 1, Stockholm',
    visitFrequency: 'Daily',
    nextVisit: '2024-01-19 09:00',
    visitDuration: '45 min',
    status: 'Active',
    avatar: '/avatars/es.png',
  },
  {
    id: 2,
    name: 'Maria Larsson',
    address: 'Drottninggatan 5, Stockholm',
    visitFrequency: 'Weekly',
    nextVisit: '2024-01-20 14:30',
    visitDuration: '60 min',
    status: 'On Hold',
    avatar: '/avatars/ml.png',
  },
];

export function ClientList() {
  const t = useTranslations('Clients');

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('address')}</TableHead>
            <TableHead>{t('visit_details')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockClients.map(client => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <img src={client.avatar} alt={client.name} />
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-muted-foreground" />
                  <span className="text-sm">{client.address}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span className="text-sm">{client.visitFrequency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="text-sm">{client.visitDuration}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={client.status === 'Active' ? 'default' : 'secondary'}
                >
                  {client.status}
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
                    <DropdownMenuItem>{t('view_visits')}</DropdownMenuItem>
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
