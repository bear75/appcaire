import { Bell, Building2, Globe2, Shield, Users2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { LocalizationSettings } from './sections/LocalizationSettings';
import { NotificationSettings } from './sections/NotificationSettings';
import { OrganizationSettings } from './sections/OrganizationSettings';
import { SecuritySettings } from './sections/SecuritySettings';
import { UserSettings } from './sections/UserSettings';

export function SettingsTabs() {
  const t = useTranslations('Settings');

  return (
    <Tabs defaultValue="organization" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
        <TabsTrigger value="organization" className="space-x-2">
          <Building2 className="size-4" />
          <span>{t('tabs.organization')}</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="space-x-2">
          <Users2 className="size-4" />
          <span>{t('tabs.users')}</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="space-x-2">
          <Bell className="size-4" />
          <span>{t('tabs.notifications')}</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="space-x-2">
          <Shield className="size-4" />
          <span>{t('tabs.security')}</span>
        </TabsTrigger>
        <TabsTrigger value="localization" className="space-x-2">
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
