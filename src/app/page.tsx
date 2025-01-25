import { Features } from '@/components/features/landing/Features';
import { Hero } from '@/components/features/landing/Hero';
import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';

export const metadata = {
  title: 'Caire - Framtidens Hemtjänstplanering',
  description:
    'Optimera din hemtjänstverksamhet med AI-driven schemaläggning och ruttplanering',
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
