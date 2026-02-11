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
    <main className="min-h-screen flex items-center justify-center px-4 bg-white py-16">
      <div className="max-w-4xl w-full text-center space-y-16">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
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

        {/* Notre mission */}
        <div className="max-w-3xl mx-auto space-y-6 text-left px-4">
          <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">Notre mission</h3>

          <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
            <p>
              La sécurité est un pilier essentiel de votre tranquillité d'esprit. Notre mission est de vous aider à retrouver — ou à préserver — ce sentiment de sérénité grâce à des solutions fiables, accessibles et efficaces.
            </p>

            <p>
              Nous proposons des <strong>kits de sécurité connectés que vous installez vous-même</strong>, accompagnés d'une <strong>documentation détaillée</strong> pour vous guider pas à pas. Chaque élément est pensé pour être simple, intuitif et adapté à vos besoins.
            </p>

            <p>
              Parce que l'autonomie ne signifie pas l'isolement, nous assurons un <strong>support technique réactif</strong> et proposons des <strong>plans de maintenance</strong> pour garantir la pérennité de votre installation. Si vous préférez, notre équipe peut aussi se charger de l'<strong>installation professionnelle</strong> et de l'<strong>accompagnement sur mesure</strong>.
            </p>

            <p className="text-xl md:text-2xl font-light text-orange text-center mt-8 pt-4">
              Notre mission : garantir votre sérénité.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
