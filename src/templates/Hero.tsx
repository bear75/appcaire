import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';

export const Hero = () => {
  const t = useTranslations('Index');

  return (
    <Section className="py-36">
      <CenteredHero
        banner={null}
        title={t('hero_title')}
        description={t('hero_description')}
        buttons={(
          <>
            <a
              className={buttonVariants({ size: 'lg' })}
              href="/sign-up"
            >
              {t('get_started')}
            </a>

            <a
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="/sign-in"
            >
              {t('sign_in')}
            </a>
          </>
        )}
      />
    </Section>
  );
};
