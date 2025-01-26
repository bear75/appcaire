'use client';

import { Calendar, Clock, Globe } from 'lucide-react';

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
import { useTranslations } from '@/lib/utils/i18n/translations';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

const ICON_STYLES = 'size-4 text-purple-600';

// Add type definitions for localization options
export type Language = 'sv' | 'en' | 'no' | 'da';
export type DateFormat = 'swedish' | 'european' | 'american';
export type TimeFormat = '24h' | '12h';

// Add type definitions for localization settings data
export type LocalizationSettingsData = {
  language: Language;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
};

export type LocalizationSettingsProps = {
  initialData?: Partial<LocalizationSettingsData>;
  onSubmit?: (data: LocalizationSettingsData) => Promise<void>;
  className?: string;
};

const DEFAULT_INITIAL_DATA: Partial<LocalizationSettingsData> = {
  language: 'sv',
  dateFormat: 'swedish',
  timeFormat: '24h',
};

export function LocalizationSettings({
  initialData = DEFAULT_INITIAL_DATA,
  onSubmit,
  className,
}: LocalizationSettingsProps) {
  const t = useTranslations('Settings');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData(e.currentTarget);
      await onSubmit({
        language: (formData.get('language') as Language) || 'sv',
        dateFormat: (formData.get('date_format') as DateFormat) || 'swedish',
        timeFormat: (formData.get('time_format') as TimeFormat) || '24h',
      });
    }
  };

  return (
    <div className={cn('flex-1 space-y-8 p-8 pt-6', className)}>
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-slate-900">
          {t('localization.title')}
        </h3>
        <p className="text-sm text-slate-600">
          {t('localization.description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
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
              <Label
                htmlFor="language"
                className="text-sm font-medium text-slate-900"
              >
                {t('localization.language.select_label')}
              </Label>
              <Select
                name="language"
                defaultValue={initialData?.language || 'sv'}
              >
                <SelectTrigger
                  id="language"
                  className="border-slate-200 bg-white"
                >
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

        {/* Date Format */}
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
            <div className="space-y-2">
              <Label
                htmlFor="date_format"
                className="text-sm font-medium text-slate-900"
              >
                {t('localization.date_format.select_label')}
              </Label>
              <Select
                name="date_format"
                defaultValue={initialData?.dateFormat || 'swedish'}
              >
                <SelectTrigger
                  id="date_format"
                  className="border-slate-200 bg-white"
                >
                  <SelectValue
                    placeholder={t('localization.date_format.placeholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="swedish">
                    {t('localization.date_format.options.swedish')}
                  </SelectItem>
                  <SelectItem value="european">
                    {t('localization.date_format.options.european')}
                  </SelectItem>
                  <SelectItem value="american">
                    {t('localization.date_format.options.american')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Time Format */}
        <Card className={cn(CARD_STYLES.base, CARD_STYLES.large)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Clock className={ICON_STYLES} />
              {t('localization.time_format.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('localization.time_format.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="time_format"
                className="text-sm font-medium text-slate-900"
              >
                {t('localization.time_format.select_label')}
              </Label>
              <Select
                name="time_format"
                defaultValue={initialData?.timeFormat || '24h'}
              >
                <SelectTrigger
                  id="time_format"
                  className="border-slate-200 bg-white"
                >
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
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-purple-600 text-white shadow-sm hover:bg-purple-700 hover:shadow-md"
          >
            {t('save')}
          </Button>
        </div>
      </form>
    </div>
  );
}
