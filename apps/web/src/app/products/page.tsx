'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { ProductCategory } from '@/data/types';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const categories: { value: ProductCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'Tous les produits' },
    { value: 'camera', label: 'Caméras' },
    { value: 'sensor', label: 'Capteurs' },
    { value: 'hub', label: 'Centrales' },
    { value: 'siren', label: 'Sirènes' },
    { value: 'keypad', label: 'Claviers' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title">Tous nos produits</h1>
        <p className="section-subtitle">
          Composez votre système de sécurité sur mesure
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === cat.value
                ? 'bg-yellow text-gray-900'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-yellow'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Aucun produit dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
}
