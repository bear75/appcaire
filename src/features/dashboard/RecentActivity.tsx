'use client';

import { useTranslations } from '@/lib/i18n';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type ActivityItem = {
  id: string;
  type: 'schedule' | 'employee' | 'client' | 'constraint';
  message: string;
  timestamp: string;
  user: string;
};

export const RecentActivity = () => {
  const t = useTranslations('RecentActivity');

  // This would be fetched from the API in a real implementation
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'schedule',
      message: t('schedule_optimized'),
      timestamp: '2024-01-17T15:30:00Z',
      user: 'Anna Andersson',
    },
    {
      id: '2',
      type: 'employee',
      message: t('employee_added'),
      timestamp: '2024-01-17T14:15:00Z',
      user: 'Erik Eriksson',
    },
    {
      id: '3',
      type: 'client',
      message: t('client_updated'),
      timestamp: '2024-01-17T13:45:00Z',
      user: 'Maria Nilsson',
    },
    {
      id: '4',
      type: 'constraint',
      message: t('constraint_modified'),
      timestamp: '2024-01-17T12:45:00Z',
      user: 'Johan Johansson',
    },
  ];

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t('recent_activity')}</h2>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            {t('latest_updates')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {activities.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.message}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
