import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { AppConfig } from '@/utils/AppConfig';
import { cn } from '@/utils/Helpers';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: AppConfig.title,
      template: `%s | ${AppConfig.title}`,
    },
    description: AppConfig.description,
  };
}

export function generateStaticParams() {
  return AppConfig.locales.map(locale => ({ locale: locale.id }));
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  const messages = useMessages();

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased', inter.className)}>
        <NextIntlClientProvider messages={messages} locale={params.locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
