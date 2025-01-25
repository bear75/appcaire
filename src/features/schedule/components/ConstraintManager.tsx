'use client';

import { ListFilter, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import type { ConstraintCategory } from '../types';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data - replace with actual data from your backend
const mockConstraints = {
  organization: [
    {
      id: 1,
      type: 'HARD',
      category: 'WORKING_HOURS',
      description: 'Max 40 timmar per vecka',
      satisfaction: 100,
    },
    {
      id: 2,
      type: 'MEDIUM',
      category: 'STAFF_RATIO',
      description: 'Minst 1 sjuksköterska per 10 undersköterskor',
      satisfaction: 85,
    },
  ],
  employee: [
    {
      id: 3,
      type: 'HARD',
      category: 'AVAILABILITY',
      description: 'Ledig på helger',
      satisfaction: 100,
    },
    {
      id: 4,
      type: 'SOFT',
      category: 'PREFERENCES',
      description: 'Föredrar morgonpass',
      satisfaction: 75,
    },
  ],
  client: [
    {
      id: 5,
      type: 'HARD',
      category: 'TIME_WINDOW',
      description: 'Medicin mellan 08:00-10:00',
      satisfaction: 100,
    },
    {
      id: 6,
      type: 'MEDIUM',
      category: 'CONTINUITY',
      description: 'Samma vårdgivare för personlig hygien',
      satisfaction: 90,
    },
  ],
};

interface ConstraintManagerProps {
  organizationId: string;
}

export function ConstraintManager({ organizationId }: ConstraintManagerProps) {
  const { t } = useTranslation('schedule');
  const [_selectedCategory, _setSelectedCategory] = useState<ConstraintCategory>('SKILL'); // Prefix with _ to indicate intentionally unused

  return (
    <div className="flex items-center gap-2">
      <Button
        className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700"
      >
        <ListFilter className="size-4" />
        <span>{t('constraints.title')}</span>
      </Button>

      <Card className="absolute right-4 top-16 z-50 w-[400px] border bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{t('constraints.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('constraints.description')}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            title={t('close')}
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('constraints.constraints_travel_time')}</span>
              <span className="text-sm text-muted-foreground">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('constraints.constraints_workload')}</span>
              <span className="text-sm text-muted-foreground">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('constraints.constraints_skills')}</span>
              <span className="text-sm text-muted-foreground">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('constraints.constraints_preferences')}</span>
              <span className="text-sm text-muted-foreground">95%</span>
            </div>
            <Progress value={95} className="h-2" />
          </div>

          <div className="pt-4">
            <Select defaultValue="balanced">
              <SelectTrigger className="border bg-white text-gray-900">
                <SelectValue placeholder={t('constraints.constraints_select_mode')} />
              </SelectTrigger>
              <SelectContent className="border bg-white text-gray-900">
                <SelectItem value="balanced" className="hover:bg-purple-50">{t('constraints.constraints_mode_balanced')}</SelectItem>
                <SelectItem value="optimize-time" className="hover:bg-purple-50">{t('constraints.constraints_mode_time')}</SelectItem>
                <SelectItem value="optimize-quality" className="hover:bg-purple-50">{t('constraints.constraints_mode_quality')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Constraints list */}
        <div className="mt-4 grid gap-4">
          {mockConstraints.organization.map(constraint => (
            <Card
              key={constraint.id}
              className="border bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:bg-purple-50/50 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          constraint.type === 'HARD'
                            ? 'destructive'
                            : constraint.type === 'MEDIUM'
                              ? 'default'
                              : 'secondary'
                        }
                        className={
                          constraint.type === 'HARD'
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : constraint.type === 'MEDIUM'
                              ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }
                      >
                        {t(`constraints.types.${constraint.type.toLowerCase()}`)}
                      </Badge>
                      <Badge variant="outline" className="border-purple-200 text-purple-600">
                        {t(`constraints.category_labels.${constraint.category}`)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {constraint.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-purple-600">
                      {constraint.satisfaction}
                      %
                    </div>
                    <Progress
                      value={constraint.satisfaction}
                      className="w-24"
                    />
                  </div>
                </div>

                {/* Edit form */}
                <div className="grid gap-4 border-t border-border pt-4">
                  <div className="grid gap-2">
                    <Select defaultValue={constraint.type}>
                      <SelectTrigger className="border bg-white text-gray-900">
                        <SelectValue placeholder={t('constraints.select_type')} />
                      </SelectTrigger>
                      <SelectContent className="border bg-white text-gray-900">
                        <SelectItem value="HARD" className="hover:bg-purple-50">
                          {t('constraints.types.hard')}
                        </SelectItem>
                        <SelectItem value="MEDIUM" className="hover:bg-purple-50">
                          {t('constraints.types.medium')}
                        </SelectItem>
                        <SelectItem value="SOFT" className="hover:bg-purple-50">
                          {t('constraints.types.soft')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    defaultValue={constraint.description}
                    placeholder={t('constraints.description_placeholder')}
                    className="border bg-white text-gray-900"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add new constraint button */}
        <Button className="mt-4 w-full bg-purple-600 text-white hover:bg-purple-700">
          {t('constraints.add_constraint')}
        </Button>
      </Card>
    </div>
  );
}
