import { useTranslations } from '@/utils/translations';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function NotificationSettings() {
  const t = useTranslations('Settings');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('notifications.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('notifications.description')}
        </p>
      </div>

      <div className="space-y-8">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">
            {t('notifications.email.title')}
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label
                htmlFor="schedule_changes"
                className="flex flex-col space-y-1"
              >
                <span>{t('notifications.email.schedule_changes')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('notifications.email.schedule_changes_description')}
                </span>
              </Label>
              <Switch id="schedule_changes" />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label
                htmlFor="new_assignments"
                className="flex flex-col space-y-1"
              >
                <span>{t('notifications.email.new_assignments')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('notifications.email.new_assignments_description')}
                </span>
              </Label>
              <Switch id="new_assignments" />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="reports" className="flex flex-col space-y-1">
                <span>{t('notifications.email.reports')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('notifications.email.reports_description')}
                </span>
              </Label>
              <Switch id="reports" />
            </div>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">
            {t('notifications.sms.title')}
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label
                htmlFor="urgent_changes"
                className="flex flex-col space-y-1"
              >
                <span>{t('notifications.sms.urgent_changes')}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {t('notifications.sms.urgent_changes_description')}
                </span>
              </Label>
              <Switch id="urgent_changes" />
            </div>
          </div>
        </div>

        {/* Notification Frequency */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">
            {t('notifications.frequency.title')}
          </h4>

          <div className="flex items-center space-x-4">
            <div className="grid min-w-[120px] gap-2">
              <Label htmlFor="frequency">
                {t('notifications.frequency.label')}
              </Label>
              <Select defaultValue="daily">
                <SelectTrigger id="frequency">
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
        </div>

        <div className="flex justify-end">
          <Button type="submit">{t('notifications.save')}</Button>
        </div>
      </div>
    </div>
  );
}
