import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Package } from 'lucide-react';
import { packs } from '@/data/packs';
import { products } from '@/data/products';
import { AddToCartButton } from '@/components/AddToCartButton';

export function generateStaticParams() {
  return packs.map(pack => ({
    slug: pack.slug,
  }));
}

export default function PackDetailPage({ params }: { params: { slug: string } }) {
  const pack = packs.find(p => p.slug === params.slug);

  if (!pack) {
    notFound();
  }

  const originalPrice = pack.price / (1 - pack.discount / 100);
  const savings = originalPrice - pack.price;

  // Get included products
  const includedProducts = pack.products
    .map(pid => products.find(p => p.id === pid))
    .filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/packs"
        className="inline-flex items-center text-gray-600 hover:text-yellow transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux packs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="relative h-96 lg:h-[600px] bg-gray-100 rounded-2xl overflow-hidden">
          <Image
            src={pack.image}
            alt={pack.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 bg-orange text-white px-6 py-3 rounded-full text-xl font-bold">
            -{pack.discount}%
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="mb-6">
            <span className="text-sm text-gray-500 uppercase tracking-wide">
              Pack complet
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{pack.name}</h1>
            <p className="text-xl text-gray-600">{pack.description}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl text-gray-400 line-through">
                {originalPrice.toFixed(2)} €
              </span>
              <span className="text-5xl font-bold text-gray-900">
                {pack.price.toFixed(2)} €
              </span>
            </div>
            <p className="text-lg text-green-600 font-semibold mt-2">
              Économisez {savings.toFixed(2)} € ({pack.discount}% de réduction)
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Ce qui est inclus</h2>
            <ul className="space-y-3">
              {pack.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <AddToCartButton productId={pack.id} type="pack" className="w-full text-lg py-4" />
          </div>

          {/* Benefits */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Installation guidée incluse</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Garantie 2 ans sur tous les produits</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Livraison gratuite</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Support prioritaire 1 mois offert</span>
            </div>
          </div>
        </div>
      </div>

      {/* Included Products Detail */}
      <div className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <Package className="w-8 h-8 text-yellow" />
          <h2 className="text-3xl font-bold">Produits inclus dans ce pack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {includedProducts.map(product => {
            if (!product) return null;
            const count = pack.products.filter(pid => pid === product.id).length;

            return (
              <div key={product.id} className="card p-6 relative">
                {count > 1 && (
                  <div className="absolute top-4 right-4 bg-yellow text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    x{count}
                  </div>
                )}
                <div className="relative h-48 bg-gray-100 rounded-lg mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.shortDescription}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-yellow hover:text-orange font-semibold text-sm"
                >
                  Voir les détails →
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why This Pack */}
      <div className="card p-8 bg-gradient-to-r from-yellow to-orange">
        <h2 className="text-3xl font-bold mb-6">Pourquoi choisir ce pack ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold mb-2">-{pack.discount}%</div>
            <p className="text-gray-900">
              Économie importante vs achat séparé
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <p className="text-gray-900">
              Tous les produits sont compatibles et testés ensemble
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">30min</div>
            <p className="text-gray-900">
              Installation guidée pas à pas incluse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
