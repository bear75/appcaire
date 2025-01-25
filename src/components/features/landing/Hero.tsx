import { buttonVariants } from '@/components/ui/button';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';

export const Hero = () => {
  return (
    <Section className="bg-background py-24">
      <CenteredHero
        title="Optimera din hemtjänst med AI"
        description="Effektiv schemaläggning och ruttplanering för hemtjänsten. Spara tid och resurser med vår AI-drivna lösning."
        buttons={(
          <>
            <a className={buttonVariants({ size: 'lg' })} href="/sign-up">
              Kom igång
            </a>

            <a
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="/sign-in"
            >
              Logga in
            </a>
          </>
        )}
      />
    </Section>
  );
};
