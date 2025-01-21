'use client';

import Link from 'next/link';

import { CenteredFooter } from '@/features/landing/CenteredFooter';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const Footer = () => {
  return (
    <Section>
      <CenteredFooter
        logo={<Logo />}
        name="Caire"
        iconList={(
          <>
            <li>
              <Link href="/privacy-policy">
                Integritetspolicy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service">
                Användarvillkor
              </Link>
            </li>
          </>
        )}
        legalLinks={null}
      >
        <div className="text-center text-sm text-muted-foreground">
          {new Date().getFullYear()}
          {' caire. '}
          Alla rättigheter förbehållna
        </div>
      </CenteredFooter>
    </Section>
  );
};
