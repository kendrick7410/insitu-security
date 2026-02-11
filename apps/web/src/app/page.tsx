import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'In Situ Security - Votre sécurité, votre installation',
  description: 'Système de sécurité connecté que vous installez vous-même. Testez, installez, maîtrisez votre sécurité en toute autonomie.',
  openGraph: {
    title: 'In Situ Security - Votre sécurité, votre installation',
    description: 'Système de sécurité connecté que vous installez vous-même.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-6xl w-full text-center space-y-16">
        {/* Logo Text */}
        <div className="flex justify-center animate-fadeIn">
          <Link
            href="/about"
            className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
            style={{
              fontFamily: 'Inter, Poppins, Montserrat, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              letterSpacing: '0.5px',
              lineHeight: '1.2',
            }}
          >
            <span
              className="font-semibold"
              style={{ color: '#F5A000' }}
            >
              In Situ
            </span>
            {' '}
            <span
              className="font-normal"
              style={{ color: '#4A4A4A' }}
            >
              Security
            </span>
          </Link>
        </div>

        {/* Phrase d'accroche principale */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-4xl font-light text-gray-700 tracking-tight leading-tight">
            Votre sécurité,<br className="lg:hidden" />votre installation
          </h1>
        </div>
      </div>
    </main>
  );
}
