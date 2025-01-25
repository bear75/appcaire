'use client';

import { ListFilter, X } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/lib/i18n';

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

type ConstraintManagerProps = {
  _organizationId?: string; // Make it optional since it's not used
};

export function ConstraintManager({ _organizationId }: ConstraintManagerProps) {
  const { t } = useTranslation('schedule');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Combine all constraints for display
  const allConstraints = [
    ...mockConstraints.organization,
    ...mockConstraints.employee,
    ...mockConstraints.client,
  ];

  // Simulate optimization process
  const simulateOptimization = () => {
    setIsOptimizing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <ListFilter className="size-4" />
        {t('constraints.title')}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 z-50 w-[400px] border bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t('constraints.title')}</h2>
              <p className="text-sm text-gray-600">{t('constraints.description')}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="size-8 p-0"
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Constraint satisfaction levels */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{t('constraints.constraints.travel_time')}</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{t('constraints.constraints.workload')}</span>
                  <span className="text-sm text-gray-600">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{t('constraints.constraints.skills')}</span>
                  <span className="text-sm text-gray-600">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{t('constraints.constraints.preferences')}</span>
                  <span className="text-sm text-gray-600">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>

            {/* Optimization mode selector */}
            <div className="border-t pt-4">
              <Select defaultValue="balanced">
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder={t('constraints.mode_balanced')} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="balanced" className="hover:bg-purple-50">
                    {t('constraints.mode_balanced')}
                  </SelectItem>
                  <SelectItem value="optimize-time" className="hover:bg-purple-50">
                    Optimera tid
                  </SelectItem>
                  <SelectItem value="optimize-quality" className="hover:bg-purple-50">
                    Optimera kvalitet
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Constraint list */}
            <div className="space-y-3">
              {allConstraints.map(constraint => (
                <div
                  key={constraint.id}
                  className="rounded-lg border bg-white p-4 shadow-sm hover:bg-purple-50/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={constraint.type === 'HARD' ? 'destructive' : 'default'}
                          className={
                            constraint.type === 'HARD'
                              ? 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                          }
                        >
                          {t(`constraints.types.${constraint.type.toLowerCase()}`)}
                        </Badge>
                        <Badge variant="outline" className="border-purple-200 text-purple-600">
                          {t(`constraints.category_labels.${constraint.category}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{constraint.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-purple-600">
                        {constraint.satisfaction}
                        %
                      </div>
                      <Progress value={constraint.satisfaction} className="w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
