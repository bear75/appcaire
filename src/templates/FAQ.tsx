import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section } from '@/features/landing/Section';

export const FAQ = () => {
  return (
    <Section>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Hur fungerar AI-schemaläggningen?</AccordionTrigger>
          <AccordionContent>
            Vår AI analyserar alla tillgängliga data - personalens kompetenser, klienternas behov, restider och andra faktorer - för att skapa optimala scheman som sparar tid och resurser.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Kan Caire integreras med vårt befintliga system?</AccordionTrigger>
          <AccordionContent>
            Ja, Caire kan integreras med de flesta vanliga system inom hemtjänsten, inklusive Alfa eCare och Carefox.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Hur lång är startsträckan?</AccordionTrigger>
          <AccordionContent>
            De flesta organisationer kommer igång inom några dagar. Vi erbjuder en 30-dagars kostnadsfri testperiod där ni kan utvärdera systemet.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Hur säkert är systemet?</AccordionTrigger>
          <AccordionContent>
            Caire följer alla relevanta säkerhetsstandarder och är fullt GDPR-kompatibelt. All data krypteras och lagras säkert.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Vilken support ingår?</AccordionTrigger>
          <AccordionContent>
            Vi erbjuder support via telefon och e-post under kontorstid, samt omfattande dokumentation och utbildningsmaterial.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Vad kostar det?</AccordionTrigger>
          <AccordionContent>
            Vi erbjuder flexibla prisplaner baserade på organisationens storlek. Kontakta oss för en offert anpassad efter era behov.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
};
