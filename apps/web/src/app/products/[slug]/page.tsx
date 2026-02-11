import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, ArrowLeft, Eye, Check } from 'lucide-react';
import { products } from '@/data/products';
import { AddToCartButton } from '@/components/AddToCartButton';

export function generateStaticParams() {
  return products.map(product => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/products"
        className="inline-flex items-center text-gray-600 hover:text-yellow transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux produits
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="relative h-96 lg:h-[600px] bg-gray-100 rounded-2xl overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.ar3DModel && (
            <div className="absolute top-4 right-4 bg-yellow text-gray-900 px-4 py-2 rounded-lg font-semibold">
              Disponible en AR
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="mb-6">
            <span className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>
            <p className="text-xl text-gray-600">{product.shortDescription}</p>
          </div>

          <div className="mb-8">
            <span className="text-5xl font-bold">{product.price.toFixed(2)} €</span>
            <p className="text-sm text-gray-500 mt-2">TVA incluse • Livraison gratuite dès 300€</p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Caractéristiques</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <AddToCartButton productId={product.id} type="product" className="w-full" />

            {product.ar3DModel && (
              <Link href="/ar" className="btn-secondary w-full block text-center">
                <Eye className="w-5 h-5 inline mr-2" />
                Visualiser en AR
              </Link>
            )}
          </div>

          {/* Shipping & Warranty */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Livraison sous 2-4 jours ouvrés</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Garantie 2 ans constructeur</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Retour gratuit sous 30 jours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-8">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <Link key={p.id} href={`/products/${p.slug}`} className="card group">
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{p.shortDescription}</p>
                  <span className="text-2xl font-bold">{p.price.toFixed(2)} €</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
