'use client';

import { Grid2X2, List, Search } from 'lucide-react';
import { useState } from 'react';

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
import { useTranslations } from '@/utils/translations';
import { cn } from '@/lib/utils';

import { EmployeeGrid } from './EmployeeGrid';
import { EmployeeList } from './EmployeeList';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

// Available skills for filtering
const availableSkills = [
  'Medicin',
  'Sårvård',
  'Demens',
  'Personlig hygien',
  'Förflyttning',
  'Matning',
];

export function EmployeeDirectory() {
  const t = useTranslations('Employees');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');

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
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('select_role')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_roles')}</SelectItem>
                <SelectItem value="nurse">{t('nurse')}</SelectItem>
                <SelectItem value="care_assistant">{t('care_assistant')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('select_status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_statuses')}</SelectItem>
                <SelectItem value="active">{t('active')}</SelectItem>
                <SelectItem value="on_leave">{t('on_leave')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
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
                onClick={() => setViewMode('grid')}
                className="size-8"
              >
                <Grid2X2 className="size-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
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
