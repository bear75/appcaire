'use client';

import { Settings } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from '@/utils/translations';

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

export default function ConstraintManager() {
  const t = useTranslations('Schedule.constraints');
  const [selectedCategory, setSelectedCategory] = useState<'organization' | 'employee' | 'client'>('organization');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-purple-100 bg-white hover:bg-purple-50 hover:text-purple-600"
        >
          <Settings className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[600px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-purple-900">
            {t('title')}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        {/* Category selector */}
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === 'organization' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('organization')}
            className={selectedCategory === 'organization' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'}
          >
            {t('categories.organization')}
          </Button>
          <Button
            variant={selectedCategory === 'employee' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('employee')}
            className={selectedCategory === 'employee' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'}
          >
            {t('categories.employee')}
          </Button>
          <Button
            variant={selectedCategory === 'client' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('client')}
            className={selectedCategory === 'client' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'}
          >
            {t('categories.client')}
          </Button>
        </div>

        {/* Constraints list */}
        <div className="grid gap-4">
          {mockConstraints[selectedCategory].map(constraint => (
            <Card
              key={constraint.id}
              className="border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:bg-purple-50/50 hover:shadow-lg"
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
                        {constraint.type}
                      </Badge>
                      <Badge variant="outline" className="border-purple-200 text-purple-600">
                        {t(`category_labels.${constraint.category}`)}
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
                      indicatorClassName={
                        constraint.satisfaction >= 90
                          ? 'bg-green-500'
                          : constraint.satisfaction >= 70
                            ? 'bg-purple-500'
                            : 'bg-red-500'
                      }
                    />
                  </div>
                </div>

                {/* Edit form */}
                <div className="grid gap-4 border-t border-border pt-4">
                  <div className="grid gap-2">
                    <Select defaultValue={constraint.type}>
                      <SelectTrigger className="border-purple-100 bg-white text-gray-900">
                        <SelectValue placeholder={t('select_type')} />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="HARD" className="text-gray-900 hover:bg-purple-50">
                          {t('types.hard')}
                        </SelectItem>
                        <SelectItem value="MEDIUM" className="text-gray-900 hover:bg-purple-50">
                          {t('types.medium')}
                        </SelectItem>
                        <SelectItem value="SOFT" className="text-gray-900 hover:bg-purple-50">
                          {t('types.soft')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    defaultValue={constraint.description}
                    placeholder={t('description_placeholder')}
                    className="border-purple-100 bg-white text-gray-900"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add new constraint button */}
        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
          {t('add_constraint')}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
