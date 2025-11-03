import type {Metadata} from 'next';
import {Rajdhani} from 'next/font/google';
import '@/styles/globals.css';
import clsx from "clsx";

export const metadata: Metadata = {
  title: 'Gaming Store',
  description: 'Your ultimate gaming destination',
};
const font = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['400', '500', '600', '700'],
});
export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
    <body
      suppressHydrationWarning={true}
      className={clsx("min-h-screen text-foreground bg-background font-sans antialiased", font.variable,)}>
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
      {children}
    </main>
    </body>
    </html>
  );
}
