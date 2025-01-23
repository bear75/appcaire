'use client';

import { Grid2X2, List, Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from '@/utils/translations';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClientList } from './ClientList';
import { ClientGrid } from './ClientGrid';

export function ClientDirectory() {
  const t = useTranslations('Clients');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [visitTypeFilter, setVisitTypeFilter] = useState('all');

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder={t('search_placeholder')}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={visitTypeFilter} onValueChange={setVisitTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('select_visit_type')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all_visit_types')}</SelectItem>
            <SelectItem value="medical">{t('medical')}</SelectItem>
            <SelectItem value="hygiene">{t('hygiene')}</SelectItem>
            <SelectItem value="social">{t('social')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('select_status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all_statuses')}</SelectItem>
            <SelectItem value="active">{t('active')}</SelectItem>
            <SelectItem value="on_hold">{t('on_hold')}</SelectItem>
            <SelectItem value="completed">{t('completed')}</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1 rounded-md border p-1">
          <Button
            variant="ghost"
            size="icon"
            className={viewMode === 'grid' ? 'bg-purple-50 text-purple-600' : ''}
            onClick={() => setViewMode('grid')}
          >
            <Grid2X2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={viewMode === 'list' ? 'bg-purple-50 text-purple-600' : ''}
            onClick={() => setViewMode('list')}
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="rounded-lg border bg-white">
        {viewMode === 'grid' ? (
          <ClientGrid
            searchQuery={searchQuery}
            visitTypeFilter={visitTypeFilter}
            statusFilter={statusFilter}
          />
        ) : (
          <ClientList
            searchQuery={searchQuery}
            visitTypeFilter={visitTypeFilter}
            statusFilter={statusFilter}
          />
        )}
      </div>
    </div>
  );
} 