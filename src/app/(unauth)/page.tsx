import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';

export const metadata = {
  title: 'Caire - Framtidens Hemtjänstplanering',
  description: 'Optimera din hemtjänstverksamhet med AI-driven schemaläggning och ruttplanering',
};

export default function IndexPage() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Footer />
      </main>
    </>
  );
}
