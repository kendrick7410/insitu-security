import type { Metadata } from 'next';
import Image from 'next/image';
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
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/about" className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] cursor-pointer hover:opacity-90 transition-opacity">
            <Image
              src="/images/logo.png"
              alt="In Situ Security"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Phrase d'accroche principale */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight">
            Votre sécurité,<br />votre installation
          </h1>
        </div>
      </div>
    </main>
  );
}
