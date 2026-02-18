import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

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
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors`}>
        <ThemeProvider>
          <ThemeToggle />
          <Header />
          <main className="min-h-screen bg-white dark:bg-gray-900">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
