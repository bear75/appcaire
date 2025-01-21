import '@/styles/global.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Navbar } from '@/templates/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Caire - Hemvård',
  description: 'Hantera din hemtjänstorganisation effektivt med Caire.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="sv" suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen bg-background antialiased',
            inter.className,
          )}
        >
          {!children?.toString().includes('(auth)') && <Navbar />}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
