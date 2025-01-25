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

import { Logo } from '@/templates/Logo';

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Översikt', href: '/dashboard', icon: Home },
    { name: 'Schema', href: '/dashboard/schedule', icon: Calendar },
    { name: 'Personal', href: '/dashboard/employees', icon: Users },
    { name: 'Klienter', href: '/dashboard/clients', icon: UserSquare2 },
    { name: 'Analys', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Inställningar', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r bg-white">
      <div className="flex h-full flex-col">
        {/* Logo and Name */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="size-6" />
            <span className="text-lg font-medium">Caire</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
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
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                )}
              >
                <Icon className="size-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Clerk Components */}
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
    </aside>
  );
}