import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'InSitu Security - Votre sécurité, votre installation',
  description: 'Système de sécurité connecté que vous installez vous-même. Testez, installez, maîtrisez votre sécurité en toute autonomie.',
  openGraph: {
    title: 'InSitu Security - Votre sécurité, votre installation',
    description: 'Système de sécurité connecté que vous installez vous-même.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/images/logo.png"
              alt="InSitu Security"
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
