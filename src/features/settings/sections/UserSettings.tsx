import { Plus, Search } from 'lucide-react';
import { useTranslations } from '@/utils/translations';

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
import { cn } from '@/lib/utils';

const TABLE_STYLES = {
  wrapper: 'rounded-xl border border-slate-200/50 bg-white shadow-md',
  header: 'bg-slate-50/50',
  row: 'hover:bg-slate-50/50 transition-colors',
};

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
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-slate-900">{t('users.title')}</h3>
        <p className="text-sm text-slate-600">
          {t('users.description')}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder={t('users.search_placeholder')}
            className="bg-white border-slate-200 pl-10"
          />
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md"
        >
          <Plus className="mr-2 size-4" />
          {t('users.invite')}
        </Button>
      </div>

      <div className={TABLE_STYLES.wrapper}>
        <Table>
          <TableHeader className={TABLE_STYLES.header}>
            <TableRow>
              <TableHead className="text-sm font-medium text-slate-900">{t('users.fields.name')}</TableHead>
              <TableHead className="text-sm font-medium text-slate-900">{t('users.fields.email')}</TableHead>
              <TableHead className="text-sm font-medium text-slate-900">{t('users.fields.role')}</TableHead>
              <TableHead className="text-sm font-medium text-slate-900">{t('users.fields.status')}</TableHead>
              <TableHead className="text-sm font-medium text-slate-900 text-right">
                {t('users.fields.actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} className={TABLE_STYLES.row}>
                <TableCell className="font-medium text-slate-900">{user.name}</TableCell>
                <TableCell className="text-slate-600">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200/50">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  >
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
