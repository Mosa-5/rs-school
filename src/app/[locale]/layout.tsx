import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import ThemeProvider from '../../context/ThemeProvider';
import { StoreProvider } from '../StoreProvider';
import { Header } from '../../components/header/header';
import { SelectionBar } from '../../components/selectionBar/selectionBar';
import '../../index.css';
import '../../App.css';

export const metadata: Metadata = {
  title: 'Rick and Morty Explorer',
  description: 'Search and browse Rick and Morty characters',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <StoreProvider>
            <ThemeProvider>
              <div className="app">
                <Header />
                {children}
                <SelectionBar />
              </div>
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
