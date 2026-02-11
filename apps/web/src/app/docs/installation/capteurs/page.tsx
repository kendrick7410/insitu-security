import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CapteursInstallationPage() {
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

        <h1 className="text-4xl font-bold mb-4">Installation des Capteurs</h1>
        <p className="text-xl text-gray-600 mb-12">
          Guide d'installation pour capteurs d'ouverture et détecteurs de mouvement
        </p>

        {/* Types de capteurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-3">Capteur d'ouverture</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Détecte l'ouverture/fermeture de portes et fenêtres
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Installation sur porte, fenêtre, volet</li>
              <li>• Portée : 100m (centrale)</li>
              <li>• Batterie : 2 ans d'autonomie</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-3">Détecteur de mouvement PIR</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Détecte les mouvements par infrarouge passif
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Angle : 120°, Portée : 12m</li>
              <li>• Anti-animaux &lt; 15kg</li>
              <li>• Installation murale ou en coin</li>
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
            <li>• Centrale InSitu Security installée et opérationnelle</li>
            <li>• Application InSitu Security à jour</li>
            <li>• Pile CR123A fournie (pré-installée avec languette de protection)</li>
          </ul>
        </div>

        {/* Installation Capteur d'ouverture */}
        <h2 className="text-3xl font-bold mb-6">Installation : Capteur d'ouverture</h2>

        <div className="space-y-8 mb-12">
          {/* Étape 1 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                1
              </div>
              <h3 className="text-xl font-bold">Préparation</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Retirez la languette de protection de la batterie située à l'arrière du capteur. La LED clignote une fois : le capteur est activé.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                2
              </div>
              <h3 className="text-xl font-bold">Appairage avec la centrale</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Dans l'application InSitu Security :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Menu &gt; <strong>Appareils</strong> &gt; <strong>+ Ajouter</strong></li>
              <li>• Sélectionnez <strong>Capteur d'ouverture</strong></li>
              <li>• Appuyez sur le bouton d'appairage du capteur (3 secondes)</li>
              <li>• La LED clignote rapidement : le capteur est en mode appairage</li>
              <li>• Attendez 10 secondes : "Capteur ajouté avec succès"</li>
              <li>• Nommez votre capteur (ex: "Porte Entrée", "Fenêtre Salon")</li>
            </ul>
          </div>

          {/* Étape 3 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                3
              </div>
              <h3 className="text-xl font-bold">Positionnement</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Le capteur se compose de 2 parties :
            </p>
            <ul className="space-y-3 text-gray-700 ml-6">
              <li>
                <strong>• Partie principale (avec LED) :</strong><br />
                <span className="ml-4 text-sm">À fixer sur le cadre fixe (dormant de porte ou fenêtre)</span>
              </li>
              <li>
                <strong>• Aimant (petit module) :</strong><br />
                <span className="ml-4 text-sm">À fixer sur la partie mobile (porte ou battant de fenêtre)</span>
              </li>
            </ul>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <strong>⚠️ Important :</strong> Les deux parties doivent être alignées et espacées de <strong>moins de 2 cm</strong> lorsque la porte/fenêtre est fermée. Les flèches sur chaque partie doivent se faire face.
              </p>
            </div>
          </div>

          {/* Étape 4 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                4
              </div>
              <h3 className="text-xl font-bold">Fixation</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Deux options de fixation :
            </p>
            <div className="space-y-3 ml-6">
              <div>
                <strong>Option A : Adhésif double-face (fourni)</strong>
                <p className="text-sm text-gray-700 ml-4">
                  Nettoyez les surfaces. Retirez le film protecteur et collez fermement. Attendez 24h avant utilisation intensive.
                </p>
              </div>
              <div>
                <strong>Option B : Vis (fournies)</strong>
                <p className="text-sm text-gray-700 ml-4">
                  Percez des avant-trous de 2mm. Vissez les deux parties à leurs emplacements respectifs.
                </p>
              </div>
            </div>
          </div>

          {/* Étape 5 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                5
              </div>
              <h3 className="text-xl font-bold">Test</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Testez le capteur :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Ouvrez et fermez la porte/fenêtre</li>
              <li>• La LED clignote à chaque changement d'état</li>
              <li>• L'application affiche "Ouvert" ou "Fermé" en temps réel</li>
              <li>• Configurez les notifications (Paramètres du capteur &gt; Alertes)</li>
            </ul>
          </div>
        </div>

        {/* Installation Détecteur de mouvement */}
        <h2 className="text-3xl font-bold mb-6">Installation : Détecteur de mouvement</h2>

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
              Positionnement optimal :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• <strong>Hauteur :</strong> 2 à 2,5 mètres du sol</li>
              <li>• <strong>Angle :</strong> Légèrement incliné vers le bas (15-20°)</li>
              <li>• <strong>Zone de couverture :</strong> Couloir, salon, entrée, garage</li>
              <li>• <strong>Évitez :</strong> Proximité de radiateurs, climatiseurs, fenêtres ensoleillées (fausses détections)</li>
            </ul>
          </div>

          {/* Étape 2 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                2
              </div>
              <h3 className="text-xl font-bold">Activation et appairage</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Retirez la languette de batterie. Dans l'application :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Menu &gt; <strong>Appareils</strong> &gt; <strong>+ Ajouter</strong></li>
              <li>• Sélectionnez <strong>Détecteur de mouvement</strong></li>
              <li>• Maintenez le bouton d'appairage 3 secondes</li>
              <li>• LED clignote : mode appairage activé</li>
              <li>• Nommez votre détecteur (ex: "Détecteur Salon", "Détecteur Garage")</li>
            </ul>
          </div>

          {/* Étape 3 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                3
              </div>
              <h3 className="text-xl font-bold">Fixation murale</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Utilisez le support orientable fourni :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Marquez les points de perçage (hauteur 2-2,5m)</li>
              <li>• Percez et insérez les chevilles</li>
              <li>• Vissez le support au mur</li>
              <li>• Clipsez le détecteur sur le support</li>
              <li>• Ajustez l'angle pour couvrir la zone souhaitée</li>
            </ul>
          </div>

          {/* Étape 4 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                4
              </div>
              <h3 className="text-xl font-bold">Configuration</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Paramètres recommandés :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• <strong>Sensibilité :</strong> Moyenne (ajustez si trop/pas assez de détections)</li>
              <li>• <strong>Mode anti-animaux :</strong> Activé si vous avez des animaux &lt; 15kg</li>
              <li>• <strong>Délai entre détections :</strong> 2-3 minutes (évite les alertes répétées)</li>
              <li>• <strong>Notifications :</strong> Activez uniquement en mode alarme activé</li>
            </ul>
          </div>

          {/* Étape 5 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                5
              </div>
              <h3 className="text-xl font-bold">Test de couverture</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Vérifiez la zone de détection :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Activez le mode test dans l'application (LED clignote à chaque détection)</li>
              <li>• Déplacez-vous dans la pièce pour tester la couverture</li>
              <li>• Ajustez l'angle du support si nécessaire</li>
              <li>• Vérifiez que les zones critiques (porte, fenêtre) sont bien couvertes</li>
            </ul>
          </div>
        </div>

        {/* Conseils de placement */}
        <div className="mt-12 card p-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">Conseils de placement optimal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">✓ Bonnes pratiques</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 1 capteur d'ouverture par accès (porte, fenêtre)</li>
                <li>• 1 détecteur de mouvement par grande pièce</li>
                <li>• Privilégier les passages obligés (couloir, escalier)</li>
                <li>• Tester avant fixation définitive</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">✗ À éviter</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Proximité de sources de chaleur</li>
                <li>• Derrière des objets (rideaux, plantes)</li>
                <li>• Zones exposées au soleil direct</li>
                <li>• Trop près du sol (animaux)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="mt-8 card p-8">
          <h2 className="text-2xl font-bold mb-4">Maintenance des capteurs</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Batterie :</strong> Remplacez tous les 18-24 mois (notification automatique dans l'app quand batterie faible)
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Nettoyage :</strong> Essuyez avec un chiffon sec tous les 3-6 mois (pas de produit chimique)
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Test mensuel :</strong> Vérifiez le bon fonctionnement via l'application (Paramètres &gt; Test du capteur)
              </div>
            </li>
          </ul>
        </div>

        {/* Prochaines étapes */}
        <div className="mt-12 bg-gradient-to-r from-yellow to-orange rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Prochaines étapes</h2>
          <div className="space-y-2">
            <Link href="/docs/installation/app-mobile" className="block text-gray-900 hover:underline font-semibold">
              → Configurer l'application mobile (scénarios, automatisations)
            </Link>
            <Link href="/support" className="block text-gray-900 hover:underline font-semibold">
              → Centre d'aide et FAQ
            </Link>
            <Link href="/maintenance" className="block text-gray-900 hover:underline font-semibold">
              → Plans de maintenance pour votre système
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
