import { Plus, Search } from 'lucide-react';

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
import { useTranslations } from '@/lib/utils/i18n/translations';

const TABLE_STYLES = {
  wrapper: 'rounded-xl border border-slate-200/50 bg-white shadow-md',
  header: 'bg-slate-50/50',
  row: 'hover:bg-slate-50/50 transition-colors',
};

// Add type definitions for user roles and status
export type UserRole = 'Admin' | 'Manager' | 'Scheduler' | 'Staff';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

// Add type definitions for user data
export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export type UserSettingsProps = {
  users?: User[];
  onInviteUser?: () => Promise<void>;
  onEditUser?: (user: User) => Promise<void>;
  onSearchUsers?: (query: string) => Promise<void>;
  className?: string;
};

const DEFAULT_USERS: User[] = [
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

export function UserSettings({
  users = DEFAULT_USERS,
  onInviteUser,
  onEditUser,
  onSearchUsers,
  className,
}: UserSettingsProps) {
  const t = useTranslations('Settings');

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchUsers) {
      await onSearchUsers(e.target.value);
    }
  };

  const handleInvite = async () => {
    if (onInviteUser) {
      await onInviteUser();
    }
  };

  const handleEdit = async (user: User) => {
    if (onEditUser) {
      await onEditUser(user);
    }
  };

  return (
    <div className={cn('flex-1 space-y-8 p-8 pt-6', className)}>
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-slate-900">
          {t('users.title')}
        </h3>
        <p className="text-sm text-slate-600">{t('users.description')}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder={t('users.search_placeholder')}
            onChange={handleSearch}
            className="border-slate-200 bg-white pl-10"
          />
        </div>
        <Button
          onClick={handleInvite}
          className="bg-purple-600 text-white shadow-sm hover:bg-purple-700 hover:shadow-md"
        >
          <Plus className="mr-2 size-4" />
          {t('users.invite')}
        </Button>
      </div>

      <div className={TABLE_STYLES.wrapper}>
        <Table>
          <TableHeader className={TABLE_STYLES.header}>
            <TableRow>
              <TableHead className="text-sm font-medium text-slate-900">
                {t('users.fields.name')}
              </TableHead>
              <TableHead className="text-sm font-medium text-slate-900">
                {t('users.fields.email')}
              </TableHead>
              <TableHead className="text-sm font-medium text-slate-900">
                {t('users.fields.role')}
              </TableHead>
              <TableHead className="text-sm font-medium text-slate-900">
                {t('users.fields.status')}
              </TableHead>
              <TableHead className="text-right text-sm font-medium text-slate-900">
                {t('users.fields.actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} className={TABLE_STYLES.row}>
                <TableCell className="font-medium text-slate-900">
                  {user.name}
                </TableCell>
                <TableCell className="text-slate-600">{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="border-green-200/50 bg-green-50 text-green-700 hover:bg-green-100">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(user)}
                    className="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
