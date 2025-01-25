'use client';

import { Grid2X2, List, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslations } from '@/lib/i18n';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { EmployeeGrid } from './EmployeeGrid';
import { EmployeeList } from './EmployeeList';
import { CARD_STYLES } from './styles';

// Available skills for filtering
const availableSkills = [
  'Medicin',
  'Sårvård',
  'Demens',
  'Rehabilitering',
  'Palliativ vård',
];

export function EmployeeDirectory() {
  const t = useTranslations('Employees');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get all parameters from URL
  const viewMode = (searchParams?.get('view') as 'grid' | 'list') || 'grid';
  const searchQuery = searchParams?.get('search') || '';
  const roleFilter = searchParams?.get('role') || 'all';
  const statusFilter = searchParams?.get('status') || 'all';
  const skillFilter = searchParams?.get('skill') || 'all';

  // Update URL parameters
  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className={cn(CARD_STYLES.base)}>
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={e => updateParams({ search: e.target.value })}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={value => updateParams({ role: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('select_role')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_roles')}</SelectItem>
                <SelectItem value="nurse">{t('nurse')}</SelectItem>
                <SelectItem value="care_assistant">{t('care_assistant')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={value => updateParams({ status: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('select_status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_statuses')}</SelectItem>
                <SelectItem value="active">{t('active')}</SelectItem>
                <SelectItem value="on_leave">{t('on_leave')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={skillFilter} onValueChange={value => updateParams({ skill: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('select_skill')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_skills')}</SelectItem>
                {availableSkills.map(skill => (
                  <SelectItem key={skill} value={skill.toLowerCase()}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="rounded-lg border bg-background p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => updateParams({ view: 'grid' })}
                className="size-8"
              >
                <Grid2X2 className="size-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => updateParams({ view: 'list' })}
                className="size-8"
              >
                <List className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Section */}
      <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
        <CardContent className="p-4">
          {viewMode === 'grid' ? <EmployeeGrid /> : <EmployeeList />}
        </CardContent>
      </Card>
    </div>
  );
}
