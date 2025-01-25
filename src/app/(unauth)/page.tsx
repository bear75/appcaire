import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';

export const metadata = {
  title: 'Caire - Framtidens Hemtjänstplanering',
  description: 'Optimera din hemtjänstverksamhet med AI-driven schemaläggning och ruttplanering',
};

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex flex-col">
        <Hero />
        <Features />
        <Footer />
      </main>
    </div>
  );
}
