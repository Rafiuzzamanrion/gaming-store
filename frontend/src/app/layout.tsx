
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import { Rajdhani } from 'next/font/google';
import clsx from 'clsx';
import { Providers } from './providers';
import {siteConfig} from "@/config/siteConfig";
import {Navbar} from "@/components/layout/Navbar";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon:'/images/logo-1.png'
  }
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
    <Navbar/>
    <main className="container mx-auto max-w-7xl px-4 sm:px-5">
      <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
        {children}
      </Providers>
    </main>
    </body>
    </html>
  );
}