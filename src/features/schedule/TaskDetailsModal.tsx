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
  const t = useTranslations('Schedule.task_details');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[600px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {task.clientName}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            {t('subtitle')}
          </DialogDescription>
        </DialogHeader>

        {/* Basic Info */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">{t('employee')}</p>
              <p className="text-base text-gray-900">{task.employeeName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{t('time')}</p>
              <p className="text-base text-gray-900">
                {task.startTime} - {task.endTime}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{t('location')}</p>
              <p className="text-base text-gray-900">{task.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{t('type')}</p>
              <p className="text-base text-gray-900">{task.type}</p>
            </div>
          </div>

          <Separator />

          {/* Constraints */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">{t('constraints')}</h3>
            <div className="space-y-2">
              {task.constraints.map((constraint) => (
                <div
                  key={constraint.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50"
                >
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
                    </div>
                    <p className="text-sm text-gray-600">
                      {constraint.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-purple-600">
                      {constraint.satisfaction}%
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
              ))}
            </div>
          </div>

          <Separator />

          {/* Conflicts */}
          {task.conflicts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">{t('conflicts')}</h3>
              <div className="space-y-2">
                {task.conflicts.map((conflict) => (
                  <div
                    key={conflict.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50"
                  >
                    <div className="space-y-1">
                      <Badge
                        variant={
                          conflict.severity === 'HIGH'
                            ? 'destructive'
                            : conflict.severity === 'MEDIUM'
                            ? 'default'
                            : 'secondary'
                        }
                        className={
                          conflict.severity === 'HIGH'
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : conflict.severity === 'MEDIUM'
                            ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }
                      >
                        {conflict.severity}
                      </Badge>
                      <p className="text-sm text-gray-600">
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