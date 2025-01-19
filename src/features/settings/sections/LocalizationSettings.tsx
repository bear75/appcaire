import { useTranslations } from 'next-intl';

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

export function LocalizationSettings() {
  const t = useTranslations('Settings');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('localization.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('localization.description')}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('localization.language.title')}</CardTitle>
            <CardDescription>
              {t('localization.language.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="language">
                {t('localization.language.select_label')}
              </Label>
              <Select defaultValue="sv">
                <SelectTrigger id="language">
                  <SelectValue
                    placeholder={t('localization.language.placeholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sv">
                    {t('localization.language.options.swedish')}
                  </SelectItem>
                  <SelectItem value="en">
                    {t('localization.language.options.english')}
                  </SelectItem>
                  <SelectItem value="no">
                    {t('localization.language.options.norwegian')}
                  </SelectItem>
                  <SelectItem value="da">
                    {t('localization.language.options.danish')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Timezone Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('localization.timezone.title')}</CardTitle>
            <CardDescription>
              {t('localization.timezone.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="timezone">
                {t('localization.timezone.select_label')}
              </Label>
              <Select defaultValue="Europe/Stockholm">
                <SelectTrigger id="timezone">
                  <SelectValue
                    placeholder={t('localization.timezone.placeholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Stockholm">
                    {t('localization.timezone.options.stockholm')}
                  </SelectItem>
                  <SelectItem value="Europe/Oslo">
                    {t('localization.timezone.options.oslo')}
                  </SelectItem>
                  <SelectItem value="Europe/Copenhagen">
                    {t('localization.timezone.options.copenhagen')}
                  </SelectItem>
                  <SelectItem value="Europe/Helsinki">
                    {t('localization.timezone.options.helsinki')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Date & Time Format */}
        <Card>
          <CardHeader>
            <CardTitle>{t('localization.date_format.title')}</CardTitle>
            <CardDescription>
              {t('localization.date_format.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date_format">
                  {t('localization.date_format.select_label')}
                </Label>
                <Select defaultValue="sv-SE">
                  <SelectTrigger id="date_format">
                    <SelectValue
                      placeholder={t('localization.date_format.placeholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sv-SE">YYYY-MM-DD</SelectItem>
                    <SelectItem value="en-GB">DD/MM/YYYY</SelectItem>
                    <SelectItem value="en-US">MM/DD/YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="time_format">
                  {t('localization.time_format.select_label')}
                </Label>
                <Select defaultValue="24h">
                  <SelectTrigger id="time_format">
                    <SelectValue
                      placeholder={t('localization.time_format.placeholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">
                      {t('localization.time_format.options.24h')}
                    </SelectItem>
                    <SelectItem value="12h">
                      {t('localization.time_format.options.12h')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit">{t('localization.save')}</Button>
      </div>
    </div>
  );
}
