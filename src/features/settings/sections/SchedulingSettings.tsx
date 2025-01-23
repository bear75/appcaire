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

export function SchedulingSettings() {
  const t = useTranslations('Settings');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('scheduling.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('scheduling.description')}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Working Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              {t('scheduling.working_hours.title')}
            </CardTitle>
            <CardDescription>
              {t('scheduling.working_hours.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>{t('scheduling.working_hours.default_start')}</Label>
                <Select defaultValue="08">
                  <SelectTrigger>
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
              <div className="grid gap-2">
                <Label>{t('scheduling.working_hours.default_end')}</Label>
                <Select defaultValue="17">
                  <SelectTrigger>
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
            <div className="flex items-center space-x-2">
              <Switch id="weekend_scheduling" />
              <Label htmlFor="weekend_scheduling">
                {t('scheduling.working_hours.allow_weekends')}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Service Delivery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="size-5" />
              {t('scheduling.service_delivery.title')}
            </CardTitle>
            <CardDescription>
              {t('scheduling.service_delivery.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>{t('scheduling.service_delivery.min_duration')}</Label>
                <Input type="number" min="15" step="15" defaultValue="30" />
              </div>
              <div className="grid gap-2">
                <Label>{t('scheduling.service_delivery.max_duration')}</Label>
                <Input type="number" min="30" step="15" defaultValue="120" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>{t('scheduling.service_delivery.travel_buffer')}</Label>
              <Input type="number" min="5" step="5" defaultValue="15" />
            </div>
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="size-5" />
              {t('scheduling.qualifications.title')}
            </CardTitle>
            <CardDescription>
              {t('scheduling.qualifications.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="strict_matching" />
              <Label htmlFor="strict_matching">
                {t('scheduling.qualifications.strict_matching')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="certification_warnings" />
              <Label htmlFor="certification_warnings">
                {t('scheduling.qualifications.certification_warnings')}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Resource Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="size-5" />
              {t('scheduling.resources.title')}
            </CardTitle>
            <CardDescription>
              {t('scheduling.resources.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>{t('scheduling.resources.max_daily_distance')}</Label>
                <Input type="number" min="0" step="10" defaultValue="200" />
              </div>
              <div className="grid gap-2">
                <Label>{t('scheduling.resources.max_continuous_driving')}</Label>
                <Input type="number" min="30" step="30" defaultValue="240" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="optimize_routes" defaultChecked />
              <Label htmlFor="optimize_routes">
                {t('scheduling.resources.optimize_routes')}
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit">{t('scheduling.save')}</Button>
      </div>
    </div>
  );
} 