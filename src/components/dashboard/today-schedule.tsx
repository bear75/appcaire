'use client';

import { ArrowRight, Car, Clock, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n';

type HourlyMetrics = {
  hour: string;
  visits: number;
  employees: number;
  clients: number;
  vehicles: number;
  kmTravelled: number;
  efficiency: number;
};

export function TodaySchedule() {
  const t = useTranslations('Dashboard');

  const hourlyData: HourlyMetrics[] = [
    {
      hour: '08:00',
      visits: 12,
      employees: 8,
      clients: 10,
      vehicles: 6,
      kmTravelled: 45,
      efficiency: 72,
    },
    {
      hour: '09:00',
      visits: 15,
      employees: 10,
      clients: 12,
      vehicles: 8,
      kmTravelled: 52,
      efficiency: 68,
    },
    {
      hour: '10:00',
      visits: 10,
      employees: 7,
      clients: 8,
      vehicles: 5,
      kmTravelled: 38,
      efficiency: 64,
    },
    // Add more hourly data as needed
  ];

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency < 65) {
      return 'bg-red-50 border-red-200 text-red-700';
    }
    if (efficiency < 70) {
      return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    }
    return 'bg-green-50 border-green-200 text-green-700';
  };

  return (
    <div className="space-y-4">
      <div className="mb-2 grid grid-cols-7 gap-2 text-sm font-medium text-slate-500">
        <div>{t('today_schedule.time')}</div>
        <div>{t('today_schedule.visits')}</div>
        <div>{t('today_schedule.staff')}</div>
        <div>{t('today_schedule.clients')}</div>
        <div>{t('today_schedule.vehicles')}</div>
        <div>{t('today_schedule.distance')}</div>
        <div>{t('today_schedule.efficiency')}</div>
      </div>
      <div className="space-y-2">
        {hourlyData.map(slot => (
          <div
            key={slot.hour}
            className={cn(
              'grid grid-cols-7 gap-2 rounded-lg border p-3',
              getEfficiencyColor(slot.efficiency),
            )}
          >
            <div className="flex items-center">
              <Clock className="mr-2 size-4" />
              {slot.hour}
            </div>
            <div className="flex items-center">
              <ArrowRight className="mr-2 size-4" />
              {slot.visits}
            </div>
            <div className="flex items-center">
              <User className="mr-2 size-4" />
              {slot.employees}
            </div>
            <div className="flex items-center">
              <User className="mr-2 size-4" />
              {slot.clients}
            </div>
            <div className="flex items-center">
              <Car className="mr-2 size-4" />
              {slot.vehicles}
            </div>
            <div>
              {slot.kmTravelled}
              {' '}
              km
            </div>
            <div className="font-medium">
              {slot.efficiency}
              %
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
