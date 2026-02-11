'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/data/types';
import { useCartStore } from '@/store/cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity: 1,
      type: 'product',
    });
  };

  return (
    <div className="card group">
      <div className="relative h-64 bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.ar3DModel && (
          <div className="absolute top-3 right-3 bg-yellow text-gray-900 text-xs font-bold px-2 py-1 rounded">
            AR 3D
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">{product.price.toFixed(2)} €</span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-primary flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="btn-secondary flex items-center justify-center px-4"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
