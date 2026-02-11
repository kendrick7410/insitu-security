import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Commande enregistrée !</h1>
        <p className="text-xl text-gray-600 mb-4">
          Merci pour votre commande. Vous recevrez un email de confirmation avec votre <strong>facture</strong> sous 24h.
        </p>
        <p className="text-gray-600 mb-8">
          Numéro de commande : <span className="font-mono font-bold">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </p>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 flex items-center justify-center">
            📧 Vous allez recevoir par email :
          </h2>
          <ul className="space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Confirmation de commande</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Facture avec RIB bancaire</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Instructions de paiement</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Prochaines étapes</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold">Réception de la facture</h3>
                <p className="text-sm text-gray-600">
                  Vous recevrez votre facture par email sous 24h
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold">Paiement (30 jours)</h3>
                <p className="text-sm text-gray-600">
                  Effectuez le virement bancaire selon les instructions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold">Expédition</h3>
                <p className="text-sm text-gray-600">
                  Livraison sous 2-4 jours après réception du paiement
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
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
