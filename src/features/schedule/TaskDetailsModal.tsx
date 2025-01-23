'use client';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/utils/translations';
import { Clock, MapPin, User, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const BADGE_VARIANTS = {
  HARD: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100',
  MEDIUM: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100',
  SOFT: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100',
  HIGH: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100',
  LOW: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100',
};

const PROGRESS_VARIANTS = {
  high: 'bg-green-500',
  medium: 'bg-purple-500',
  low: 'bg-red-500',
};

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    employeeName: string;
    clientName: string;
    startTime: string;
    endTime: string;
    location: string;
    type: string;
    constraints: Array<{
      id: string;
      type: 'HARD' | 'MEDIUM' | 'SOFT';
      description: string;
      satisfaction: number;
    }>;
    conflicts: Array<{
      id: string;
      severity: 'HIGH' | 'MEDIUM' | 'LOW';
      description: string;
    }>;
  };
}

export default function TaskDetailsModal({
  isOpen,
  onClose,
  task,
}: TaskDetailsModalProps) {
  const t = useTranslations('Schedule');  // Using available namespace

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[600px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            {task.clientName}
          </DialogTitle>
          <DialogDescription className="text-base text-slate-600">
            {t('task_details.subtitle')}
          </DialogDescription>
        </DialogHeader>

        {/* Basic Info */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-500">{t('task_details.employee')}</p>
              <div className="flex items-center gap-2">
                <User className="size-4 text-slate-400" />
                <p className="text-base text-slate-900">{task.employeeName}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-500">{t('task_details.time')}</p>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-slate-400" />
                <p className="text-base text-slate-900">
                  {task.startTime} - {task.endTime}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-500">{t('task_details.location')}</p>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-slate-400" />
                <p className="text-base text-slate-900">{task.location}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-500">{t('task_details.type')}</p>
              <Badge variant="outline" className="bg-purple-50/50 text-purple-600 border-purple-100">
                {task.type}
              </Badge>
            </div>
          </div>

          <Separator className="bg-slate-100" />

          {/* Constraints */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">{t('task_details.constraints')}</h3>
            <div className="space-y-3">
              {task.constraints.map((constraint) => (
                <div
                  key={constraint.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-2">
                    <Badge className={cn(BADGE_VARIANTS[constraint.type])}>
                      {constraint.type}
                    </Badge>
                    <p className="text-sm text-slate-600">
                      {constraint.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-purple-600 mb-1.5">
                      {constraint.satisfaction}%
                    </div>
                    <Progress
                      value={constraint.satisfaction}
                      className="w-24 bg-slate-100"
                      indicatorClassName={cn(
                        constraint.satisfaction >= 90
                          ? PROGRESS_VARIANTS.high
                          : constraint.satisfaction >= 70
                          ? PROGRESS_VARIANTS.medium
                          : PROGRESS_VARIANTS.low
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-slate-100" />

          {/* Conflicts */}
          {task.conflicts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-slate-900">{t('task_details.conflicts')}</h3>
              </div>
              <div className="space-y-3">
                {task.conflicts.map((conflict) => (
                  <div
                    key={conflict.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-2">
                      <Badge className={cn(BADGE_VARIANTS[conflict.severity])}>
                        {conflict.severity}
                      </Badge>
                      <p className="text-sm text-slate-600">
                        {conflict.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 