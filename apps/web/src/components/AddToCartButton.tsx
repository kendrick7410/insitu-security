'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface AddToCartButtonProps {
  productId: string;
  type: 'product' | 'pack';
  className?: string;
}

export function AddToCartButton({ productId, type, className = '' }: AddToCartButtonProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId,
      quantity: 1,
      type,
    });
  };

  return (
    <button onClick={handleAddToCart} className={`btn-primary ${className}`}>
      <ShoppingCart className="w-5 h-5 inline mr-2" />
      Ajouter au panier
    </button>
  );
}
