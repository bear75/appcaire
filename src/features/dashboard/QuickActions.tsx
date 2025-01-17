'use client';

import { CalendarIcon, GearIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function QuickActions() {
  const t = useTranslations('QuickActions');

  const actions = [
    {
      icon: CalendarIcon,
      label: t('view_schedule'),
      href: '/dashboard/schedule',
    },
    {
      icon: PersonIcon,
      label: t('manage_employees'),
      href: '/dashboard/employees',
    },
    {
      icon: HomeIcon,
      label: t('manage_clients'),
      href: '/dashboard/clients',
    },
    {
      icon: GearIcon,
      label: t('settings'),
      href: '/dashboard/settings',
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">{t('title')}</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map(action => (
          <Button
            key={action.href}
            variant="outline"
            asChild
            className="justify-start gap-2"
          >
            <Link href={action.href}>
              <action.icon className="size-4" />
              {action.label}
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  );
}
