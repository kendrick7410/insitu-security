import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'In Situ Security - Alarme Connectée DIY',
  description: 'Système d\'alarme connectée et caméras de surveillance. Installation facile, visualisation AR, app mobile gratuite.',
  keywords: 'alarme maison, caméra surveillance, domotique, sécurité connectée, DIY',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
