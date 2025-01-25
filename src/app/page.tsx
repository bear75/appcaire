import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';

export const metadata = {
  title: 'Caire - Framtidens Hemtjänstplanering',
  description: 'Optimera din hemtjänstverksamhet med AI-driven schemaläggning och ruttplanering',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <Features />
        <Footer />
      </main>
    </div>
  );
}
