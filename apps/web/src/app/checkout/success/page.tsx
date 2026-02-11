import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Commande confirmée !</h1>
        <p className="text-xl text-gray-600 mb-8">
          Merci pour votre commande. Vous recevrez un email de confirmation sous peu.
        </p>

        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Prochaines étapes</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold">Préparation</h3>
                <p className="text-sm text-gray-600">
                  Votre commande sera préparée dans les 24h
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold">Expédition</h3>
                <p className="text-sm text-gray-600">
                  Livraison sous 2-4 jours ouvrés
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold">Installation</h3>
                <p className="text-sm text-gray-600">
                  Suivez notre guide d'installation interactif
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/docs" className="btn-primary">
            Consulter la documentation
          </Link>
          <Link href="/" className="btn-secondary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
