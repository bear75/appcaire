'use client';

import { Globe, Clock, Calendar } from 'lucide-react';
import { useTranslations } from '@/lib/utils/i18n/translations';

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
import { cn } from '@/lib/utils';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

const ICON_STYLES = 'size-4 text-purple-600';

export function LocalizationSettings() {
  const t = useTranslations('Settings');

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-slate-900">{t('localization.title')}</h3>
        <p className="text-sm text-slate-600">
          {t('localization.description')}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Language Settings */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Globe className={ICON_STYLES} />
              {t('localization.language.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('localization.language.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-sm font-medium text-slate-900">
                {t('localization.language.select_label')}
              </Label>
              <Select defaultValue="sv">
                <SelectTrigger id="language" className="bg-white border-slate-200">
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
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Clock className={ICON_STYLES} />
              {t('localization.timezone.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('localization.timezone.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-sm font-medium text-slate-900">
                {t('localization.timezone.select_label')}
              </Label>
              <Select defaultValue="Europe/Stockholm">
                <SelectTrigger id="timezone" className="bg-white border-slate-200">
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
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Calendar className={ICON_STYLES} />
              {t('localization.date_format.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('localization.date_format.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="date_format" className="text-sm font-medium text-slate-900">
                  {t('localization.date_format.select_label')}
                </Label>
                <Select defaultValue="sv-SE">
                  <SelectTrigger id="date_format" className="bg-white border-slate-200">
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

              <div className="space-y-2">
                <Label htmlFor="time_format" className="text-sm font-medium text-slate-900">
                  {t('localization.time_format.select_label')}
                </Label>
                <Select defaultValue="24h">
                  <SelectTrigger id="time_format" className="bg-white border-slate-200">
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
        <Button 
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md"
        >
          {t('localization.save')}
        </Button>
      </div>
    </div>
  );
}
