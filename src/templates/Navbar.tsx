'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';
import { getI18nPath } from '@/utils/Helpers';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            <li data-fade>
              <LocaleSwitcher />
            </li>
            <li className="ml-1 mr-2.5" data-fade>
              <Link href={getI18nPath('/sign-in', locale)}>{t('sign_in')}</Link>
            </li>
            <li>
              <Link className={buttonVariants()} href={getI18nPath('/sign-up', locale)}>
                {t('sign_up')}
              </Link>
            </li>
          </>
        )}
      >
        <></>
      </CenteredMenu>
    </Section>
  );
};
