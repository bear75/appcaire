'use client';

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import {
  BarChart3,
  Calendar,
  Home,
  Settings,
  Users,
  UserSquare2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n';

import { Logo } from './Logo';

export function Sidebar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const navigation = [
    { name: t('dashboard'), href: '/dashboard', icon: Home },
    { name: t('schedule'), href: '/dashboard/schedule', icon: Calendar },
    { name: t('employees'), href: '/dashboard/employees', icon: Users },
    { name: t('clients'), href: '/dashboard/clients', icon: UserSquare2 },
    { name: t('analytics'), href: '/dashboard/analytics', icon: BarChart3 },
    { name: t('settings'), href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      {/* Logo and Name */}
      <div className="flex h-12 items-center justify-start border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="size-6" />
          <span className="text-lg font-medium">Caire</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-700 hover:bg-gray-50',
              )}
            >
              <Icon className="size-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Clerk Components at Bottom */}
      <div className="space-y-2 border-t p-4">
        <OrganizationSwitcher
          organizationProfileMode="modal"
          hidePersonal
          appearance={{
            elements: {
              organizationSwitcherTrigger: 'max-w-28 sm:max-w-52',
            },
          }}
          afterCreateOrganizationUrl="/dashboard"
          afterLeaveOrganizationUrl="/dashboard"
          afterSelectOrganizationUrl="/dashboard"
        />
        <UserButton
          appearance={{
            elements: {
              rootBox: 'flex items-center',
              userButtonTrigger:
                'flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent',
              userButtonBox: 'flex w-full',
              userPreviewMainIdentifier: 'font-medium',
              userPreviewSecondaryIdentifier: 'text-xs text-muted-foreground',
            },
          }}
          afterSignOutUrl="/"
        />
      </div>
    </div>
  );
}
