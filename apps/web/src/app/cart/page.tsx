'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { products } from '@/data/products';
import { packs } from '@/data/packs';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalItems } = useCartStore();

  const cartItemsWithDetails = items.map(item => {
    if (item.type === 'product') {
      const product = products.find(p => p.id === item.productId);
      return { ...item, details: product, price: product?.price || 0 };
    } else {
      const pack = packs.find(p => p.id === item.productId);
      return { ...item, details: pack, price: pack?.price || 0 };
    }
  });

  const subtotal = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? (subtotal > 300 ? 0 : 9.99) : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">
            Découvrez nos produits et commencez à sécuriser votre maison !
          </p>
          <Link href="/products" className="btn-primary">
            Voir les produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Mon panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItemsWithDetails.map(item => (
            <div key={`${item.type}-${item.productId}`} className="card p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.details?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.type === 'product' ? 'Produit individuel' : 'Pack complet'}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    {item.price.toFixed(2)} €
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.productId, item.type, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-yellow transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.type, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-yellow transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.productId, item.type)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 text-sm font-semibold"
          >
            Vider le panier
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Récapitulatif</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total ({getTotalItems()} articles)</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}</span>
              </div>
              {subtotal < 300 && subtotal > 0 && (
                <p className="text-sm text-gray-500">
                  Livraison gratuite à partir de 300 €
                </p>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full block text-center mb-3">
              Passer la commande
            </Link>
            <Link href="/products" className="btn-secondary w-full block text-center">
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
