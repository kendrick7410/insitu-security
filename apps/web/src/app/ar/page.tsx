import { Eye, Smartphone, Maximize } from 'lucide-react';

export default function ARPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Eye className="w-20 h-20 text-yellow mx-auto mb-6" />
          <h1 className="section-title">Visualisation en Réalité Augmentée</h1>
          <p className="section-subtitle">
            Placez virtuellement nos équipements de sécurité chez vous avant d'acheter
          </p>
        </div>

        {/* How it works */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Comment ça marche ?</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Ouvrez sur votre smartphone</h3>
                <p className="text-gray-600">
                  L'expérience AR nécessite un smartphone Android (ARCore) ou iOS (ARKit)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Scannez votre espace</h3>
                <p className="text-gray-600">
                  Pointez votre caméra vers le sol et déplacez-vous lentement pour détecter les surfaces
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Placez vos équipements</h3>
                <p className="text-gray-600">
                  Choisissez un produit et tapez sur une surface pour le placer. Ajustez la position et l'angle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <Smartphone className="w-10 h-10 text-yellow mb-4" />
            <h3 className="font-bold text-lg mb-2">Compatible avec</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• iPhone 6s et versions ultérieures (iOS 11+)</li>
              <li>• Android 7.0+ avec ARCore</li>
              <li>• Connexion HTTPS requise</li>
            </ul>
          </div>

          <div className="card p-6">
            <Maximize className="w-10 h-10 text-yellow mb-4" />
            <h3 className="font-bold text-lg mb-2">Fonctionnalités</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Placement précis sur les surfaces</li>
              <li>• Rotation et ajustement de taille</li>
              <li>• Plusieurs objets simultanés</li>
              <li>• Sauvegarde de votre configuration</li>
            </ul>
          </div>
        </div>

        {/* Launch Button */}
        <div className="card p-8 text-center bg-gradient-to-r from-yellow to-orange">
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-gray-900 mb-6">
            Ouvrez cette page sur votre smartphone pour lancer l'expérience AR
          </p>
          <a
            href={process.env.NODE_ENV === 'development' ? '/ar-app/' : '/ar/'}
            className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block"
          >
            Lancer l'expérience AR
          </a>
          <p className="text-sm text-gray-700 mt-4">
            En développement : servez l'app AR sur localhost:8080
          </p>
        </div>
      </div>
    </div>
  );
}
