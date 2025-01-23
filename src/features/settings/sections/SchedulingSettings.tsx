'use client';

import { Car, Clock, GraduationCap, Timer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from '@/utils/translations';
import { cn } from '@/lib/utils';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

const ICON_STYLES = 'size-4 text-purple-600';

export function SchedulingSettings() {
  const t = useTranslations('Settings');

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-slate-900">{t('scheduling.title')}</h3>
        <p className="text-sm text-slate-600">
          {t('scheduling.description')}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Working Hours */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Clock className={ICON_STYLES} />
              {t('scheduling.working_hours.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('scheduling.working_hours.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">{t('scheduling.working_hours.default_start')}</Label>
                <Select defaultValue="08">
                  <SelectTrigger className="bg-white border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">{t('scheduling.working_hours.default_end')}</Label>
                <Select defaultValue="17">
                  <SelectTrigger className="bg-white border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Switch id="weekend_scheduling" className="data-[state=checked]:bg-purple-600" />
              <Label htmlFor="weekend_scheduling" className="text-sm font-medium text-slate-900">
                {t('scheduling.working_hours.allow_weekends')}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Service Delivery */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Timer className={ICON_STYLES} />
              {t('scheduling.service_delivery.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('scheduling.service_delivery.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">{t('scheduling.service_delivery.min_duration')}</Label>
                <Input 
                  type="number" 
                  min="15" 
                  step="15" 
                  defaultValue="30"
                  className="bg-white border-slate-200" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">{t('scheduling.service_delivery.max_duration')}</Label>
                <Input 
                  type="number" 
                  min="30" 
                  step="15" 
                  defaultValue="120"
                  className="bg-white border-slate-200" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-900">{t('scheduling.service_delivery.travel_buffer')}</Label>
              <Input 
                type="number" 
                min="5" 
                step="5" 
                defaultValue="15"
                className="bg-white border-slate-200" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <GraduationCap className={ICON_STYLES} />
              {t('scheduling.qualifications.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('scheduling.qualifications.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Switch id="strict_matching" className="data-[state=checked]:bg-purple-600" />
              <Label htmlFor="strict_matching" className="text-sm font-medium text-slate-900">
                {t('scheduling.qualifications.strict_matching')}
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Switch id="certification_warnings" className="data-[state=checked]:bg-purple-600" />
              <Label htmlFor="certification_warnings" className="text-sm font-medium text-slate-900">
                {t('scheduling.qualifications.certification_warnings')}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Resource Management */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Car className={ICON_STYLES} />
              {t('scheduling.resources.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('scheduling.resources.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">{t('scheduling.resources.max_daily_distance')}</Label>
                <Input 
                  type="number" 
                  min="0" 
                  step="10" 
                  defaultValue="200"
                  className="bg-white border-slate-200" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">{t('scheduling.resources.max_continuous_driving')}</Label>
                <Input 
                  type="number" 
                  min="30" 
                  step="30" 
                  defaultValue="240"
                  className="bg-white border-slate-200" 
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Switch id="optimize_routes" defaultChecked className="data-[state=checked]:bg-purple-600" />
              <Label htmlFor="optimize_routes" className="text-sm font-medium text-slate-900">
                {t('scheduling.resources.optimize_routes')}
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md"
        >
          {t('scheduling.save')}
        </Button>
      </div>
    </div>
  );
} 