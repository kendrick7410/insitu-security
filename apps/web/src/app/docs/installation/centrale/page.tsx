import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CentraleInstallationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/docs"
          className="inline-flex items-center text-gray-600 hover:text-yellow mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la documentation
        </Link>

        <h1 className="text-4xl font-bold mb-4">Installation de la Centrale d'alarme</h1>
        <p className="text-xl text-gray-600 mb-12">
          Guide complet pour installer et configurer votre centrale InSitu Security
        </p>

        {/* Contenu requis */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Contenu de la boîte</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span>1 Centrale d'alarme InSitu</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span>1 Adaptateur secteur 12V</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span>1 Câble Ethernet RJ45</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span>1 Support mural + vis de fixation</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span>Guide de démarrage rapide</span>
            </li>
          </ul>
        </div>

        {/* Prérequis */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 text-blue-600 mr-2" />
            Prérequis
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Connexion Internet (WiFi ou Ethernet)</li>
            <li>• Smartphone iOS 13+ ou Android 8+</li>
            <li>• Application InSitu Security installée (disponible sur App Store et Google Play)</li>
            <li>• Prise électrique proche du lieu d'installation</li>
          </ul>
        </div>

        {/* Étapes d'installation */}
        <h2 className="text-3xl font-bold mb-6">Étapes d'installation</h2>

        <div className="space-y-8">
          {/* Étape 1 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                1
              </div>
              <h3 className="text-xl font-bold">Choisir l'emplacement</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Sélectionnez un emplacement central dans votre habitation, de préférence :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• À proximité de votre box Internet</li>
              <li>• Dans un endroit discret mais accessible</li>
              <li>• À l'abri de l'humidité et des variations de température</li>
              <li>• Hors de portée des animaux et enfants en bas âge</li>
            </ul>
          </div>

          {/* Étape 2 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                2
              </div>
              <h3 className="text-xl font-bold">Fixation murale (optionnel)</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Si vous souhaitez fixer la centrale au mur :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Marquez les points de perçage à l'aide du support mural</li>
              <li>• Percez les trous et insérez les chevilles fournies</li>
              <li>• Vissez le support mural</li>
              <li>• Clipsez la centrale sur le support</li>
            </ul>
          </div>

          {/* Étape 3 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                3
              </div>
              <h3 className="text-xl font-bold">Connexion réseau</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Deux options de connexion sont disponibles :
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Option A : Ethernet (recommandé)</h4>
                <p className="text-gray-700 ml-4">
                  Connectez le câble Ethernet entre votre box Internet et la centrale. Cette méthode garantit une connexion stable et rapide.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Option B : WiFi</h4>
                <p className="text-gray-700 ml-4">
                  La configuration WiFi se fera lors de la première mise en route via l'application mobile.
                </p>
              </div>
            </div>
          </div>

          {/* Étape 4 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                4
              </div>
              <h3 className="text-xl font-bold">Mise sous tension</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Branchez l'adaptateur secteur à la centrale puis à une prise électrique. La centrale émet un bip et le voyant lumineux devient orange (démarrage en cours).
            </p>
            <p className="text-gray-700">
              <strong>Attendez 30 à 60 secondes</strong> que le voyant devienne vert fixe, indiquant que la centrale est prête pour la configuration.
            </p>
          </div>

          {/* Étape 5 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                5
              </div>
              <h3 className="text-xl font-bold">Configuration via l'application</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Ouvrez l'application InSitu Security sur votre smartphone :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Appuyez sur "Ajouter une centrale"</li>
              <li>• Scannez le QR Code au dos de la centrale</li>
              <li>• Suivez les instructions à l'écran pour nommer votre centrale</li>
              <li>• Si vous utilisez le WiFi, sélectionnez votre réseau et entrez le mot de passe</li>
              <li>• Attendez la confirmation de connexion (environ 30 secondes)</li>
            </ul>
          </div>

          {/* Étape 6 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                6
              </div>
              <h3 className="text-xl font-bold">Test de fonctionnement</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Vérifiez que tout fonctionne correctement :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Le voyant de la centrale est vert fixe</li>
              <li>• L'application affiche "Connecté" sur la page d'accueil</li>
              <li>• Testez la sirène intégrée depuis l'application (menu Paramètres &gt; Test sirène)</li>
            </ul>
          </div>
        </div>

        {/* Prochaines étapes */}
        <div className="mt-12 bg-gradient-to-r from-yellow to-orange rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Prochaines étapes</h2>
          <p className="text-gray-900 mb-4">
            Votre centrale est maintenant opérationnelle ! Vous pouvez :
          </p>
          <div className="space-y-2">
            <Link href="/docs/installation/cameras" className="block text-gray-900 hover:underline font-semibold">
              → Installer vos caméras
            </Link>
            <Link href="/docs/installation/capteurs" className="block text-gray-900 hover:underline font-semibold">
              → Ajouter des capteurs
            </Link>
            <Link href="/docs/installation/app-mobile" className="block text-gray-900 hover:underline font-semibold">
              → Configurer l'application mobile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
