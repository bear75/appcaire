import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function UserSettings() {
  const t = useTranslations('Settings');

  // Mock data - replace with actual data from your backend
  const users = [
    {
      id: 1,
      name: 'Anna Andersson',
      email: 'anna@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Erik Eriksson',
      email: 'erik@example.com',
      role: 'Manager',
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('users.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('users.description')}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative">
          <Input
            placeholder={t('users.search_placeholder')}
            className="w-[300px]"
          />
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          {t('users.invite')}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('users.fields.name')}</TableHead>
              <TableHead>{t('users.fields.email')}</TableHead>
              <TableHead>{t('users.fields.role')}</TableHead>
              <TableHead>{t('users.fields.status')}</TableHead>
              <TableHead className="text-right">
                {t('users.fields.actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    {t('users.actions.edit')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
