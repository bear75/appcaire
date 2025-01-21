'use client';

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { useOrganization } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Calendar,
  Home,
  Settings,
  Users,
  UserSquare2,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useTranslations } from '@/utils/translations';
import { ORG_ROLE } from '@/types/Auth';
import { Logo } from './Logo';

export function Sidebar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const { membership } = useOrganization();
  const isCaireAdmin = membership?.role === ORG_ROLE.SUPER_ADMIN;

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
          <Logo className="h-6 w-6" />
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
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Clerk Components at Bottom */}
      <div className="border-t p-4">
        {isCaireAdmin && (
          <div className="mb-4">
            <OrganizationSwitcher
              hidePersonal
              afterCreateOrganizationUrl="/dashboard"
              organizationProfileUrl="/dashboard/organization-profile"
              createOrganizationUrl="/dashboard/create-organization"
              skipInvitationScreen={false}
              appearance={{
                elements: {
                  rootBox: 'flex items-center',
                  organizationSwitcherTrigger: 'flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-accent text-sm',
                },
              }}
            />
          </div>
        )}
        <UserButton
          appearance={{
            elements: {
              rootBox: 'flex items-center',
              userButtonTrigger: 'flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent',
              userButtonBox: 'flex w-full',
            },
          }}
          afterSignOutUrl="/"
        />
      </div>
    </div>
  );
} 