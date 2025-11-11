import type { ReactNode } from 'react';
import '@/styles/globals.css';
import { Rajdhani } from 'next/font/google';
import clsx from 'clsx';
import { Providers } from './providers';

export const metadata = {
  title: 'Gaming Store',
  description: 'Your ultimate gaming destination'
};

const font = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['400', '500', '600', '700']
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={font.variable}>
    <body suppressHydrationWarning className={clsx('font-sans', font.className)}>
    <main className="container mx-auto max-w-7xl pt-16 px-6">
      <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
        {children}
      </Providers>
    </main>
    </body>
    </html>
  );
}