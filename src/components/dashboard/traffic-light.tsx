'use client';

import { Car, GraduationCap, Heart, Users } from 'lucide-react';

import { cn } from '@/libs/utils';
import { useTranslations } from '@/utils/translations';

type Recommendation = {
  type: 'staffing' | 'training' | 'vehicles' | 'clients';
  status: 'green' | 'yellow' | 'red';
  message: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function TrafficLightRecommendations() {
  const t = useTranslations('Dashboard');

  // This would come from your API/database
  const recommendations: Recommendation[] = [
    {
      type: 'staffing',
      status: 'yellow',
      message: t('recommendations.staffing.need_more_hourly'),
      icon: Users,
    },
    {
      type: 'training',
      status: 'red',
      message: t('recommendations.training.dementia_care_needed'),
      icon: GraduationCap,
    },
    {
      type: 'vehicles',
      status: 'green',
      message: t('recommendations.vehicles.optimal_allocation'),
      icon: Car,
    },
    {
      type: 'clients',
      status: 'yellow',
      message: t('recommendations.clients.needs_review'),
      icon: Heart,
    },
  ];

  const getStatusColor = (status: Recommendation['status']) => {
    switch (status) {
      case 'green':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'red':
        return 'bg-red-50 border-red-200 text-red-700';
    }
  };

  const getIconColor = (status: Recommendation['status']) => {
    switch (status) {
      case 'green':
        return 'text-green-500';
      case 'yellow':
        return 'text-yellow-500';
      case 'red':
        return 'text-red-500';
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.map(rec => (
        <button
          key={rec.type}
          onClick={() => {
            // Handle click to show details
          }}
          className={cn(
            'flex w-full items-start space-x-4 rounded-lg border p-4 text-left transition-colors hover:bg-opacity-80',
            getStatusColor(rec.status),
          )}
        >
          <rec.icon className={cn('h-5 w-5', getIconColor(rec.status))} />
          <div className="flex-1">
            <div className="font-medium">{t(`recommendations.${rec.type}.title`)}</div>
            <div className="mt-1 text-sm">{rec.message}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
