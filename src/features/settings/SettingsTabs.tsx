'use client';

import { Bell, Building2, Calendar, Globe2, Shield, Users2 } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/lib/utils/i18n/translations';

import { LocalizationSettings } from './sections/LocalizationSettings';
import { NotificationSettings } from './sections/NotificationSettings';
import { OrganizationSettings } from './sections/OrganizationSettings';
import { SchedulingSettings } from './sections/SchedulingSettings';
import { SecuritySettings } from './sections/SecuritySettings';
import { UserSettings } from './sections/UserSettings';

export function SettingsTabs() {
  const t = useTranslations('Settings');

  return (
    <Tabs defaultValue="organization" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 gap-4 bg-background p-1 md:grid-cols-6">
        <TabsTrigger
          value="organization"
          className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
        >
          <Building2 className="size-4" />
          <span>{t('tabs.organization')}</span>
        </TabsTrigger>
        <TabsTrigger
          value="users"
          className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
        >
          <Users2 className="size-4" />
          <span>{t('tabs.users')}</span>
        </TabsTrigger>
        <TabsTrigger
          value="scheduling"
          className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
        >
          <Calendar className="size-4" />
          <span>{t('tabs.scheduling')}</span>
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
        >
          <Bell className="size-4" />
          <span>{t('tabs.notifications')}</span>
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
        >
          <Shield className="size-4" />
          <span>{t('tabs.security')}</span>
        </TabsTrigger>
        <TabsTrigger
          value="localization"
          className="space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
        >
          <Globe2 className="size-4" />
          <span>{t('tabs.localization')}</span>
        </TabsTrigger>
      </TabsList>

      <Card className="p-6">
        <TabsContent value="organization">
          <OrganizationSettings />
        </TabsContent>

        <TabsContent value="users">
          <UserSettings />
        </TabsContent>

        <TabsContent value="scheduling">
          <SchedulingSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="localization">
          <LocalizationSettings />
        </TabsContent>
      </Card>
    </Tabs>
  );
}
