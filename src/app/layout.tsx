import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import ThemeProvider from '../context/ThemeProvider';
import { StoreProvider } from './StoreProvider';
import '../index.css';
import '../App.css';

export const metadata: Metadata = {
  title: 'Rick and Morty Explorer',
  description: 'Search and browse Rick and Morty characters',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
