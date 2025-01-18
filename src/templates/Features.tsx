import { CalendarIcon, ClockIcon, PersonIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

import { Background } from '@/components/Background';
import { FeatureCard } from '@/features/landing/FeatureCard';
import { Section } from '@/features/landing/Section';

export const Features = () => {
  const t = useTranslations('Index');

  return (
    <Background>
      <Section
        title={t('benefits_title')}
      >
        <div className="grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-3">
          <FeatureCard
            icon={<CalendarIcon className="size-6 stroke-primary-foreground stroke-2" />}
            title={t('feature_1_title')}
          >
            {t('feature_1_description')}
          </FeatureCard>

          <FeatureCard
            icon={<ClockIcon className="size-6 stroke-primary-foreground stroke-2" />}
            title={t('feature_2_title')}
          >
            {t('feature_2_description')}
          </FeatureCard>

          <FeatureCard
            icon={<PersonIcon className="size-6 stroke-primary-foreground stroke-2" />}
            title={t('feature_3_title')}
          >
            {t('feature_3_description')}
          </FeatureCard>
        </div>
      </Section>
    </Background>
  );
};
