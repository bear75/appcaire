import { CalendarIcon, ClockIcon, PersonIcon } from '@radix-ui/react-icons';

import { Background } from '@/components/Background';
import { FeatureCard } from '@/features/landing/FeatureCard';
import { Section } from '@/features/landing/Section';

export const Features = () => {
  return (
    <Background>
      <Section
        title="Fördelar med Caire"
      >
        <div className="grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-3">
          <FeatureCard
            icon={<CalendarIcon className="size-6 stroke-primary-foreground stroke-2" />}
            title="Smart Schemaläggning"
          >
            AI-driven schemaläggning som optimerar personalens tid och minskar administrativa kostnader.
          </FeatureCard>

          <FeatureCard
            icon={<ClockIcon className="size-6 stroke-primary-foreground stroke-2" />}
            title="Effektiv Ruttplanering"
          >
            Minimera restid och maximera tiden hos klienterna med intelligent ruttoptimering.
          </FeatureCard>

          <FeatureCard
            icon={<PersonIcon className="size-6 stroke-primary-foreground stroke-2" />}
            title="Personlig Anpassning"
          >
            Hänsyn till personalens kompetenser och klienternas önskemål för bästa möjliga matchning.
          </FeatureCard>
        </div>
      </Section>
    </Background>
  );
};
