'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check } from 'lucide-react';
import { Pack } from '@/data/types';
import { useCartStore } from '@/store/cart';

interface PackCardProps {
  pack: Pack;
}

export function PackCard({ pack }: PackCardProps) {
  const addItem = useCartStore(state => state.addItem);

  const originalPrice = pack.price / (1 - pack.discount / 100);
  const savings = originalPrice - pack.price;

  const handleAddToCart = () => {
    addItem({
      productId: pack.id,
      quantity: 1,
      type: 'pack',
    });
  };

  return (
    <div className="card">
      <div className="relative h-64 bg-gray-100 dark:bg-gray-700">
        <Image
          src={pack.image}
          alt={pack.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 bg-orange text-white text-sm font-bold px-3 py-1 rounded-full">
          -{pack.discount}%
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{pack.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{pack.description}</p>

        <ul className="space-y-2 mb-6">
          {pack.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <Check className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="border-t dark:border-gray-700 pt-4">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                {originalPrice.toFixed(2)} €
              </span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white ml-2">
                {pack.price.toFixed(2)} €
              </span>
            </div>
          </div>
          <p className="text-sm text-green-600 dark:text-green-500 font-semibold mb-4">
            Économisez {savings.toFixed(2)} €
          </p>

          <div className="flex space-x-2">
            <button onClick={handleAddToCart} className="flex-1 btn-primary">
              <ShoppingCart className="w-4 h-4 inline mr-2" />
              Ajouter au panier
            </button>
            <Link
              href={`/packs/${pack.slug}`}
              className="btn-secondary px-6"
            >
              Détails
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
