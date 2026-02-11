import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CamerasInstallationPage() {
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

        <h1 className="text-4xl font-bold mb-4">Installation des Caméras</h1>
        <p className="text-xl text-gray-600 mb-12">
          Guide d'installation pour caméras intérieures et extérieures In Situ Security
        </p>

        {/* Choix du modèle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-3">Caméra Intérieure HD</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Installation simple sur meuble ou fixation murale</li>
              <li>• Alimentation secteur uniquement</li>
              <li>• Idéale pour salon, chambre, entrée</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-3">Caméra Extérieure 4K</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Fixation murale renforcée</li>
              <li>• Étanche IP67 (pluie, neige, gel)</li>
              <li>• Idéale pour jardin, parking, entrée</li>
            </ul>
          </div>
        </div>

        {/* Prérequis */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 text-blue-600 mr-2" />
            Prérequis
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Centrale In Situ Security installée et opérationnelle</li>
            <li>• Réseau WiFi 2.4 GHz ou 5 GHz avec bonne couverture</li>
            <li>• Application In Situ Security à jour</li>
            <li>• Prise électrique à proximité (sauf modèles sur batterie)</li>
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
              Sélectionnez un emplacement stratégique :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• <strong>Hauteur :</strong> 2 à 3 mètres pour une vue optimale</li>
              <li>• <strong>Angle :</strong> Orientez vers les zones à surveiller (porte, fenêtre, allée)</li>
              <li>• <strong>Évitez :</strong> Lumière directe (soleil, lampadaire) qui peut éblouir l'objectif</li>
              <li>• <strong>WiFi :</strong> Vérifiez la force du signal à cet endroit (app In Situ &gt; Outils &gt; Test WiFi)</li>
            </ul>
          </div>

          {/* Étape 2 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                2
              </div>
              <h3 className="text-xl font-bold">Fixation de la caméra</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Caméra intérieure :</h4>
                <p className="text-gray-700 ml-4 mb-2">
                  Posez la caméra sur un meuble stable ou utilisez le support mural fourni. Percez deux trous, insérez les chevilles et vissez le support.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Caméra extérieure :</h4>
                <p className="text-gray-700 ml-4 mb-2">
                  Utilisez le support renforcé et les vis longues fournies. Pour une installation sur brique ou béton, utilisez des chevilles adaptées (non fournies).
                </p>
              </div>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <strong>⚠️ Conseil :</strong> Avant de percer définitivement, testez la vue de la caméra en la maintenant à l'emplacement souhaité et en visualisant l'image depuis l'application.
              </p>
            </div>
          </div>

          {/* Étape 3 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                3
              </div>
              <h3 className="text-xl font-bold">Alimentation</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Branchez l'adaptateur secteur :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Connectez le câble à la caméra (connecteur micro-USB ou USB-C selon modèle)</li>
              <li>• Branchez l'adaptateur à une prise électrique</li>
              <li>• La LED de la caméra clignote en bleu : la caméra démarre</li>
              <li>• Attendez 20 à 30 secondes que le voyant devienne bleu fixe</li>
            </ul>
          </div>

          {/* Étape 4 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                4
              </div>
              <h3 className="text-xl font-bold">Appairage avec la centrale</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Dans l'application In Situ Security :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Ouvrez le menu principal &gt; <strong>Appareils</strong></li>
              <li>• Appuyez sur <strong>+ Ajouter un appareil</strong></li>
              <li>• Sélectionnez <strong>Caméra</strong></li>
              <li>• Scannez le QR Code au dos de la caméra ou saisissez le code manuellement</li>
              <li>• Donnez un nom à votre caméra (ex: "Caméra Entrée", "Caméra Jardin")</li>
              <li>• Sélectionnez le réseau WiFi et entrez le mot de passe</li>
              <li>• Attendez 30 secondes : la caméra se connecte au WiFi puis à la centrale</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>✓ Succès :</strong> Le voyant devient vert fixe et le flux vidéo apparaît dans l'application.
            </p>
          </div>

          {/* Étape 5 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                5
              </div>
              <h3 className="text-xl font-bold">Configuration des paramètres</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Personnalisez votre caméra selon vos besoins :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• <strong>Zones de détection :</strong> Définissez les zones où les mouvements déclenchent une alerte</li>
              <li>• <strong>Sensibilité :</strong> Ajustez pour éviter les fausses alertes (branches, animaux)</li>
              <li>• <strong>Vision nocturne :</strong> Automatique ou manuelle</li>
              <li>• <strong>Enregistrement :</strong> Continu, sur détection ou désactivé</li>
              <li>• <strong>Notifications :</strong> Activez les alertes push en cas de mouvement</li>
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
              Vérifiez que tout fonctionne :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Visualisez le flux vidéo en direct depuis l'application</li>
              <li>• Testez la vision nocturne en couvrant le capteur de lumière</li>
              <li>• Passez devant la caméra pour vérifier la détection de mouvement</li>
              <li>• Testez l'audio bidirectionnel (parlez via l'app et écoutez depuis la caméra)</li>
            </ul>
          </div>
        </div>

        {/* Dépannage rapide */}
        <div className="mt-12 card p-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">Dépannage rapide</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">🔴 Voyant rouge clignotant</h4>
              <p className="text-gray-700 text-sm ml-4">
                → Problème de connexion WiFi. Vérifiez le signal et les identifiants réseau. Réinitialisez la caméra (bouton reset 10 sec).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">📹 Image floue ou sombre</h4>
              <p className="text-gray-700 text-sm ml-4">
                → Nettoyez la lentille avec un chiffon microfibre. Vérifiez l'éclairage de la zone. Ajustez la sensibilité vision nocturne.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">⚠️ Trop de fausses alertes</h4>
              <p className="text-gray-700 text-sm ml-4">
                → Réduisez la sensibilité de détection. Redéfinissez les zones de détection pour exclure les arbres, routes passantes, etc.
              </p>
            </div>
          </div>
        </div>

        {/* Prochaines étapes */}
        <div className="mt-12 bg-gradient-to-r from-yellow to-orange rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Prochaines étapes</h2>
          <div className="space-y-2">
            <Link href="/docs/installation/capteurs" className="block text-gray-900 hover:underline font-semibold">
              → Installer des capteurs d'ouverture et de mouvement
            </Link>
            <Link href="/docs/installation/app-mobile" className="block text-gray-900 hover:underline font-semibold">
              → Configurer l'application mobile en détail
            </Link>
            <Link href="/support" className="block text-gray-900 hover:underline font-semibold">
              → Consulter le centre d'aide pour plus de questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
