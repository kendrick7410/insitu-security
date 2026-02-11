'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { products } from '@/data/products';
import { packs } from '@/data/packs';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalItems } = useCartStore();
  const [step, setStep] = useState(1);

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

  const shipping = subtotal > 300 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de commande
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Finaliser ma commande</h1>

        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-yellow text-gray-900' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > s ? <Check className="w-6 h-6" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-1 ${step > s ? 'bg-yellow' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Shipping Information */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Informations de livraison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Prénom *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Nom *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Adresse *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Code postal *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Ville *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Téléphone *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Récapitulatif</h2>
            <div className="space-y-3 mb-6">
              {cartItemsWithDetails.map(item => (
                <div
                  key={`${item.type}-${item.productId}`}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.details?.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    {(item.price * item.quantity).toFixed(2)} €
                  </span>
                </div>
              ))}
              <div className="border-t pt-3">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Livraison</span>
                  <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Modalités de paiement</h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Paiement sur facture</h3>
                  <p className="text-gray-700 mb-3">
                    Vous recevrez une <strong>facture par email</strong> après validation de votre commande.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Facture envoyée sous 24h</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Paiement par virement bancaire</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Délai de paiement : 30 jours</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Expédition après réception du paiement</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-600">
                  💡 <strong>RIB inclus</strong> dans la facture. Vous pouvez également payer par chèque à l'ordre d'In Situ Security.
                </p>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full text-lg py-4">
            Valider ma commande ({total.toFixed(2)} €)
          </button>

          <p className="text-center text-sm text-gray-500">
            En validant, vous acceptez nos{' '}
            <a href="/legal/terms" className="text-yellow hover:underline">
              conditions générales de vente
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
