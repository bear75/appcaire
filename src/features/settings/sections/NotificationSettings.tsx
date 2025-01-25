'use client';

import { Mail, MessageSquare, Timer } from 'lucide-react';

import { PageContainer, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/utils/i18n/translations';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

const ICON_STYLES = 'size-4 text-purple-600';

export function NotificationSettings() {
  const t = useTranslations('Settings');

  return (
    <PageContainer>
      <PageHeader
        title={t('notifications.title')}
        description={t('notifications.description')}
      />

      <div className="grid gap-6">
        {/* Email Notifications */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Mail className={ICON_STYLES} />
              {t('notifications.email.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('notifications.email.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-4">
                <Label
                  htmlFor="schedule_changes"
                  className="flex flex-col space-y-1"
                >
                  <span className="text-sm font-medium text-slate-900">
                    {t('notifications.email.schedule_changes')}
                  </span>
                  <span className="text-sm text-slate-600">
                    {t('notifications.email.schedule_changes_description')}
                  </span>
                </Label>
                <Switch
                  id="schedule_changes"
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>

              <div className="flex items-center justify-between space-x-4">
                <Label
                  htmlFor="new_assignments"
                  className="flex flex-col space-y-1"
                >
                  <span className="text-sm font-medium text-slate-900">
                    {t('notifications.email.new_assignments')}
                  </span>
                  <span className="text-sm text-slate-600">
                    {t('notifications.email.new_assignments_description')}
                  </span>
                </Label>
                <Switch
                  id="new_assignments"
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>

              <div className="flex items-center justify-between space-x-4">
                <Label htmlFor="reports" className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-slate-900">
                    {t('notifications.email.reports')}
                  </span>
                  <span className="text-sm text-slate-600">
                    {t('notifications.email.reports_description')}
                  </span>
                </Label>
                <Switch
                  id="reports"
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SMS Notifications */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <MessageSquare className={ICON_STYLES} />
              {t('notifications.sms.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('notifications.sms.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <Label
                htmlFor="urgent_changes"
                className="flex flex-col space-y-1"
              >
                <span className="text-sm font-medium text-slate-900">
                  {t('notifications.sms.urgent_changes')}
                </span>
                <span className="text-sm text-slate-600">
                  {t('notifications.sms.urgent_changes_description')}
                </span>
              </Label>
              <Switch
                id="urgent_changes"
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Frequency */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Timer className={ICON_STYLES} />
              {t('notifications.frequency.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('notifications.frequency.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="frequency"
                  className="text-sm font-medium text-slate-900"
                >
                  {t('notifications.frequency.label')}
                </Label>
                <Select defaultValue="daily">
                  <SelectTrigger
                    id="frequency"
                    className="min-w-[180px] border-slate-200 bg-white"
                  >
                    <SelectValue
                      placeholder={t('notifications.frequency.placeholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">
                      {t('notifications.frequency.realtime')}
                    </SelectItem>
                    <SelectItem value="daily">
                      {t('notifications.frequency.daily')}
                    </SelectItem>
                    <SelectItem value="weekly">
                      {t('notifications.frequency.weekly')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-purple-600 text-white shadow-sm hover:bg-purple-700 hover:shadow-md"
        >
          {t('notifications.save')}
        </Button>
      </div>
    </PageContainer>
  );
}
