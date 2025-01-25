'use client';

import Link from 'next/link';

import { Logo } from '@/components/layout/shared/Logo';
import { CenteredFooter } from '@/features/landing/CenteredFooter';
import { Section } from '@/features/landing/Section';

export function Footer() {
  return (
    <Section>
      <CenteredFooter
        logo={<Logo className="size-6" />}
        name="Caire"
        iconList={(
          <>
            <li>
              <Link href="/privacy-policy">Integritetspolicy</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Användarvillkor</Link>
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
}
