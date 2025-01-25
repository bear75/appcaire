import '@/styles/global.css';

import { svSE } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

import { Providers } from './providers';

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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      localization={svSE}
      appearance={{
        variables: {
          colorPrimary: '#7c3aed',
        },
      }}
    >
      <html lang="sv" suppressHydrationWarning>
        <body className={cn(inter.className, 'min-h-screen antialiased')}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
