import type { Metadata } from 'next';
import Image from 'next/image';

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
      <div className="max-w-4xl w-full text-center space-y-16">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <Image
              src="/images/logo.png"
              alt="In Situ Security"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Phrase d'accroche principale */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight">
            Votre sécurité,<br />votre installation
          </h1>

          {/* Sous-titre discret */}
          <h2 className="text-lg md:text-xl text-gray-500 font-light tracking-wide">
            Testez, installez, maîtrisez.
          </h2>
        </div>
      </div>
    </main>
  );
}
