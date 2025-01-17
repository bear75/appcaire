'use client';

import { GlobeIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/libs/i18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = AppConfig.locales.find(
    locale => locale.id === AppConfig.locale,
  );

  function onValueChange(value: string) {
    router.push(pathname, { locale: value as 'sv' | 'en' });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-9"
          aria-label="Switch language"
        >
          <GlobeIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={currentLocale?.id}
          onValueChange={onValueChange}
        >
          {AppConfig.locales.map(locale => (
            <DropdownMenuRadioItem key={locale.id} value={locale.id}>
              {locale.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
