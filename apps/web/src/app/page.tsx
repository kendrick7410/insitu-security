import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, Package, Smartphone, Shield, CheckCircle, Eye } from 'lucide-react';

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
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-white dark:bg-gray-900">

      {/* Section 1 - Hero */}
      <section className="min-h-screen snap-start flex items-center justify-center bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 pt-20 pb-8">
        <div className="max-w-6xl w-full text-center px-4">
          {/* Logo Text */}
          <div className="flex justify-center mb-12 animate-fadeIn">
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
              <span className="font-semibold" style={{ color: '#F5A000' }}>
                In Situ
              </span>
              {' '}
              <span className="font-normal" style={{ color: '#4A4A4A' }}>
                Security
              </span>
            </Link>
          </div>

          {/* Slogan */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-700 dark:text-gray-200 tracking-tight leading-tight mb-16">
            Votre sécurité, votre installation
          </h1>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 mx-auto text-orange opacity-60" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Découvrir</p>
          </div>
        </div>
      </section>

      {/* Section 2 - Le Concept */}
      <section className="min-h-screen snap-start flex items-center justify-center bg-gradient-to-b pt-20 pb-8 from-gray-50 dark:from-gray-800 to-orange/5 dark:to-orange/10 px-4">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 dark:text-white">
            <span className="text-orange">Le concept</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Package className="w-16 h-16 text-orange mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Vous achetez</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Du matériel de qualité professionnelle sélectionné avec soin
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CheckCircle className="w-16 h-16 text-orange mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Vous installez</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Autonomie totale à votre rythme avec nos guides détaillés
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange to-yellow text-white rounded-2xl p-8 shadow-xl">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Nous vous accompagnons</h3>
            <p className="text-lg">
              Support technique réactif et aide sur place si besoin
            </p>
          </div>

          <div className="mt-12 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 3 - Produits */}
      <section className="min-h-screen snap-start flex items-center justify-center bg-gradient-to-b pt-20 pb-8 from-orange/5 dark:from-orange/10 to-yellow/5 dark:to-yellow/10 px-4">
        <div className="max-w-6xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
            Nos <span className="text-orange">produits</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour sécuriser votre environnement
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-3">📹</div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Caméras</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">HD & 4K</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-3">🚪</div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Capteurs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ouverture & Mouvement</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-3">🏠</div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Centrale</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hub connecté</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-3">🔔</div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Sirène</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">120dB extérieure</p>
            </div>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange to-yellow text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Package className="w-6 h-6" />
            <span>Découvrir le catalogue</span>
          </Link>

          <div className="mt-12 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 4 - AR Experience */}
      <section className="min-h-screen snap-start flex items-center justify-center bg-gradient-to-b pt-20 pb-8 from-yellow/5 dark:from-yellow/10 to-white dark:to-gray-900 px-4">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-8">
            <Eye className="w-20 h-20 text-orange mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Visualisez <span className="text-orange">avant d'installer</span>
            </h2>
          </div>

          <div className="bg-gradient-to-br from-orange/10 to-yellow/10 dark:from-orange/20 dark:to-yellow/20 rounded-2xl p-8 md:p-12 mb-8 border-2 border-orange/20 dark:border-orange/30">
            <Smartphone className="w-16 h-16 text-orange mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Réalité Augmentée</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Placez virtuellement vos équipements de sécurité dans votre environnement réel avec votre smartphone. Testez différentes configurations avant d'acheter.
            </p>
            <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300">Visualisation instantanée sur votre téléphone</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300">Testez différents emplacements</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300">Ajoutez directement au panier</span>
              </li>
            </ul>
          </div>

          <Link
            href="/ar"
            className="inline-flex items-center space-x-2 bg-orange text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Eye className="w-6 h-6" />
            <span>Essayer l'expérience AR</span>
          </Link>

          <div className="mt-12 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 5 - CTA Final */}
      <section className="min-h-screen snap-start flex items-center justify-center bg-gradient-to-b pt-20 pb-8 from-white dark:from-gray-900 to-orange/10 dark:to-orange/20 px-4">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 dark:text-white">
            Prêt à <span className="text-orange">commencer</span> ?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Sécurisez votre environnement dès aujourd'hui avec des équipements de qualité professionnelle
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/products"
              className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-orange to-yellow text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Package className="w-6 h-6" />
              <span>Voir les produits</span>
            </Link>

            <Link
              href="/about"
              className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 border-2 border-orange text-orange dark:text-orange px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Shield className="w-6 h-6" />
              <span>En savoir plus</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange mb-2">100%</div>
              <p className="text-gray-600 dark:text-gray-400">Matériel de qualité</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange mb-2">DIY</div>
              <p className="text-gray-600 dark:text-gray-400">Installation autonome</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange mb-2">24/7</div>
              <p className="text-gray-600 dark:text-gray-400">Support disponible</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
