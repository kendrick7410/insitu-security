import Link from 'next/link';
import { Shield, Smartphone, Eye, Headphones, ArrowRight, Check } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { PackCard } from '@/components/PackCard';
import { products } from '@/data/products';
import { packs } from '@/data/packs';

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);
  const featuredPacks = packs.slice(0, 2);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sécurisez votre maison en{' '}
              <span className="text-yellow">quelques clics</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Système d'alarme connectée DIY. Installation facile, visualisation AR,
              sans abonnement obligatoire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packs" className="btn-primary text-lg">
                Découvrir nos packs
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </Link>
              <Link href="/ar" className="btn-secondary text-lg bg-gray-800 border-gray-700 text-white hover:border-yellow">
                Essayer en AR
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-bold mb-2">Installation facile</h3>
              <p className="text-gray-600 text-sm">
                100% sans fil, installation guidée en 30 minutes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-bold mb-2">App mobile gratuite</h3>
              <p className="text-gray-600 text-sm">
                Contrôlez votre système depuis n'importe où
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-bold mb-2">Visualisation AR</h3>
              <p className="text-gray-600 text-sm">
                Prévisualisez vos équipements chez vous avant achat
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-bold mb-2">Support 7j/7</h3>
              <p className="text-gray-600 text-sm">
                Assistance technique et conseils personnalisés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos packs populaires</h2>
            <p className="section-subtitle">
              Des solutions complètes avec jusqu'à -25% de réduction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredPacks.map(pack => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/packs" className="btn-primary">
              Voir tous les packs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Produits populaires</h2>
            <p className="section-subtitle">
              Composez votre système sur mesure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/products" className="btn-primary">
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* AR Section */}
      <section className="py-16 bg-gradient-to-r from-yellow to-orange text-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Eye className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Visualisez vos équipements en réalité augmentée
            </h2>
            <p className="text-lg mb-8">
              Utilisez votre smartphone pour placer virtuellement nos caméras et capteurs
              chez vous. Trouvez les emplacements parfaits avant d'acheter !
            </p>
            <Link href="/ar" className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block">
              Lancer l'expérience AR
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center">Pourquoi choisir InSitu Security ?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="flex space-x-4">
                <Check className="w-6 h-6 text-yellow flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Sans abonnement obligatoire</h3>
                  <p className="text-gray-600">
                    Utilisez votre système gratuitement. Les plans de maintenance sont optionnels.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Check className="w-6 h-6 text-yellow flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Compatible domotique</h3>
                  <p className="text-gray-600">
                    Intégration Google Home, Alexa et Apple HomeKit disponible.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Check className="w-6 h-6 text-yellow flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Évolutif</h3>
                  <p className="text-gray-600">
                    Ajoutez jusqu'à 50 appareils à votre centrale. Commencez petit, évoluez selon vos besoins.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Check className="w-6 h-6 text-yellow flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Garantie 2 ans</h3>
                  <p className="text-gray-600">
                    Tous nos produits sont garantis 2 ans pièces et main d'œuvre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
