import type { Metadata } from 'next';
import { Raleway, Geologica } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/providers/thema';

import meta from '@/data/meta';

import './globals.css';
import StoreProvider from '@/providers/StoreProvider';

const raleway = Raleway({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
});

const geologica = Geologica({
  subsets: ['cyrillic'],
  weight: ['200', '300', '400', '500', '700'],
  variable: '--font-geologica',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className={`${raleway.variable} ${geologica.variable}`}>
        <main>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <StoreProvider>{children}</StoreProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </main>
      </body>
    </html>
  );
}
