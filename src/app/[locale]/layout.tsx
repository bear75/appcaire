import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import type { AllLocales } from '@/utils/AppConfig';
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
  params: { locale: (typeof AllLocales)[number] };
};

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased', inter.className)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
