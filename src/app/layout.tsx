import type { Metadata } from 'next';
import '@fontsource-variable/public-sans';
import './globals.css';
import Providers from './providers';
import Header from '@/components/layout/Header';
import CategoryBar from '@/components/layout/CategoryBar';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/siteConfig';

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} | Electronics Store`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <Providers>
          <Header />
          <CategoryBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
