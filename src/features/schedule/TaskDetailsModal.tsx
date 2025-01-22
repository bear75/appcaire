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
  task?: {
    id: string;
    title: string;
    clientName: string;
    employeeName: string;
    start: string;
    end: string;
    type: string;
    location: string;
    constraints: {
      type: 'HARD' | 'MEDIUM' | 'SOFT';
      description: string;
      satisfaction: number;
    }[];
    conflicts?: {
      type: string;
      description: string;
      severity: 'high' | 'medium' | 'low';
    }[];
  };
}

export default function TaskDetailsModal({
  isOpen,
  onClose,
  task,
}: TaskDetailsModalProps) {
  const t = useTranslations('Schedule.taskDetails');

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-purple-600">
            {task.title}
          </DialogTitle>
          <DialogDescription>
            {t('subtitle')}
          </DialogDescription>
        </DialogHeader>

        {/* Main content with 3D card effect */}
        <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-purple-50/50 border border-border">
          {/* Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <User className="size-4 text-purple-600" />
              <div>
                <div className="text-sm text-muted-foreground">{t('employee')}</div>
                <div className="font-medium text-purple-600">{task.employeeName}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-purple-600" />
              <div>
                <div className="text-sm text-muted-foreground">{t('time')}</div>
                <div className="font-medium text-purple-600">
                  {task.start} - {task.end}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-purple-600" />
              <div>
                <div className="text-sm text-muted-foreground">{t('location')}</div>
                <div className="font-medium text-purple-600">{task.location}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t('type')}</div>
              <Badge variant="secondary" className="mt-1 bg-purple-50 text-purple-600 hover:bg-purple-100">
                {task.type}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Constraints */}
          <div>
            <h3 className="mb-4 font-semibold">{t('constraints')}</h3>
            <div className="space-y-4">
              {task.constraints.map((constraint, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        constraint.type === 'HARD'
                          ? 'destructive'
                          : constraint.type === 'MEDIUM'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {constraint.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {constraint.satisfaction}%
                    </span>
                  </div>
                  <Progress value={constraint.satisfaction} />
                  <p className="text-sm text-muted-foreground">
                    {constraint.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Conflicts */}
          {task.conflicts && task.conflicts.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="mb-4 font-semibold">{t('conflicts')}</h3>
                <div className="space-y-4">
                  {task.conflicts.map((conflict, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 rounded-md bg-destructive/5 p-3"
                    >
                      <AlertTriangle
                        className={`size-4 ${
                          conflict.severity === 'high'
                            ? 'text-destructive'
                            : conflict.severity === 'medium'
                            ? 'text-yellow-500'
                            : 'text-blue-500'
                        }`}
                      />
                      <div>
                        <div className="font-medium">{conflict.type}</div>
                        <p className="text-sm text-muted-foreground">
                          {conflict.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 