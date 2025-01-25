'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/helpers/utils';

type ActiveLinkProps = {
  /** The URL that the link should navigate to */
  href: string;
  /** The content to be rendered inside the link */
  children: React.ReactNode;
};

/**
 * A link component that shows active state when the current path matches its href
 * @component
 */
export const ActiveLink = ({ href, children }: ActiveLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'px-3 py-2',
        pathname.endsWith(href)
        && 'rounded-md bg-primary text-primary-foreground',
      )}
    >
      {children}
    </Link>
  );
};
