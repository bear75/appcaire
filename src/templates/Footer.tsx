'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { CenteredFooter } from '@/features/landing/CenteredFooter';
import { Section } from '@/features/landing/Section';
import { getI18nPath } from '@/utils/Helpers';

import { Logo } from './Logo';

export const Footer = () => {
  const t = useTranslations('Footer');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <Section>
      <CenteredFooter
        logo={<Logo />}
        name="Caire"
        iconList={(
          <>
            <li>
              <Link href={getI18nPath('/privacy-policy', locale)}>
                {t('privacy_policy')}
              </Link>
            </li>
            <li>
              <Link href={getI18nPath('/terms-of-service', locale)}>
                {t('terms_of_service')}
              </Link>
            </li>
          </>
        )}
        legalLinks={null}
      >
        <div className="text-center text-sm text-muted-foreground">
          {new Date().getFullYear()}
          {' caire. '}
          {t('all_rights_reserved')}
        </div>
      </CenteredFooter>
    </Section>
  );
};
