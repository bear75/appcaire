'use client';

import { Card } from '@/components/ui/card';
import { useTranslations } from '@/utils/translations';
import { ArrowUp, Clock, Users, Car, Wand2 } from 'lucide-react';

export default function ScheduleMetrics() {
  const t = useTranslations('Schedule.metrics');

  return (
    <div className="grid grid-cols-5 gap-2 max-w-[1200px]">
      <Card className="p-2.5 bg-white hover:bg-purple-50/50 transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500 truncate">AI-Driven</p>
            <div className="flex items-center gap-1.5">
              <p className="text-base font-semibold text-purple-900">92%</p>
              <div className="flex items-center gap-0.5">
                <ArrowUp className="size-3 text-green-600" />
                <p className="text-xs text-green-600">+5.2%</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 flex-shrink-0">
            <Wand2 className="size-3.5 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card className="p-2.5 bg-white hover:bg-purple-50/50 transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500 truncate">{t('total_hours')}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-base font-semibold text-purple-900">156.5h</p>
              <div className="flex items-center gap-0.5">
                <ArrowUp className="size-3 text-green-600" />
                <p className="text-xs text-green-600">+2.1%</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 flex-shrink-0">
            <Clock className="size-3.5 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card className="p-2.5 bg-white hover:bg-purple-50/50 transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500 truncate">{t('completion_rate')}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-base font-semibold text-purple-900">98.2%</p>
              <div className="flex items-center gap-0.5">
                <ArrowUp className="size-3 text-green-600" />
                <p className="text-xs text-green-600">+1.2%</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 flex-shrink-0">
            <Users className="size-3.5 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card className="p-2.5 bg-white hover:bg-purple-50/50 transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500 truncate">{t('staff_utilization')}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-base font-semibold text-purple-900">87.5%</p>
              <div className="flex items-center gap-0.5">
                <ArrowUp className="size-3 text-green-600" />
                <p className="text-xs text-green-600">+3.4%</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 flex-shrink-0">
            <Users className="size-3.5 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card className="p-2.5 bg-white hover:bg-purple-50/50 transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500 truncate">{t('travel_time')}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-base font-semibold text-purple-900">22.3 min</p>
              <div className="flex items-center gap-0.5">
                <ArrowUp className="size-3 text-green-600 rotate-180" />
                <p className="text-xs text-green-600">-5.2%</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 flex-shrink-0">
            <Car className="size-3.5 text-purple-600" />
          </div>
        </div>
      </Card>
    </div>
  );
}
