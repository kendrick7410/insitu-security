import Link from 'next/link';
import { ArrowLeft, CheckCircle, Smartphone, Bell, Shield } from 'lucide-react';

export default function AppMobileInstallationPage() {
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

        <h1 className="text-4xl font-bold mb-4">Configuration de l'application mobile</h1>
        <p className="text-xl text-gray-600 mb-12">
          Maîtrisez votre application InSitu Security pour une expérience optimale
        </p>

        {/* Téléchargement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Smartphone className="w-6 h-6 mr-2 text-yellow" />
              iOS (iPhone/iPad)
            </h3>
            <p className="text-gray-700 mb-4 text-sm">
              Téléchargez InSitu Security sur l'App Store
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Compatible iOS 13 et versions ultérieures</li>
              <li>• Notifications push instantanées</li>
              <li>• Widget écran d'accueil</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Smartphone className="w-6 h-6 mr-2 text-yellow" />
              Android
            </h3>
            <p className="text-gray-700 mb-4 text-sm">
              Téléchargez InSitu Security sur Google Play
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Compatible Android 8.0 et versions ultérieures</li>
              <li>• Mode économie d'énergie optimisé</li>
              <li>• Raccourcis rapides</li>
            </ul>
          </div>
        </div>

        {/* Première configuration */}
        <h2 className="text-3xl font-bold mb-6">Première configuration</h2>

        <div className="space-y-8 mb-12">
          {/* Étape 1 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                1
              </div>
              <h3 className="text-xl font-bold">Créer un compte</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Lors de la première ouverture de l'application :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Appuyez sur <strong>"Créer un compte"</strong></li>
              <li>• Saisissez votre adresse email et créez un mot de passe sécurisé (8 caractères min)</li>
              <li>• Validez votre email via le lien reçu par mail</li>
              <li>• Reconnectez-vous avec vos identifiants</li>
            </ul>
          </div>

          {/* Étape 2 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                2
              </div>
              <h3 className="text-xl font-bold">Ajouter votre centrale</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Ajoutez votre centrale déjà installée :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Appuyez sur <strong>"+ Ajouter une centrale"</strong></li>
              <li>• Scannez le QR Code au dos de la centrale</li>
              <li>• Donnez un nom à votre installation (ex: "Maison", "Appartement", "Bureau")</li>
              <li>• Attendez la connexion (30 secondes)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Tous les appareils déjà appairés à la centrale apparaissent automatiquement dans l'application.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center font-bold text-xl mr-4">
                3
              </div>
              <h3 className="text-xl font-bold">Activer les notifications</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Pour recevoir les alertes en temps réel :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• L'application demande l'autorisation d'envoyer des notifications : acceptez</li>
              <li>• Activez le son et les vibrations pour les alertes critiques</li>
              <li>• Personnalisez les types d'alertes dans <strong>Paramètres &gt; Notifications</strong></li>
            </ul>
          </div>
        </div>

        {/* Interface principale */}
        <h2 className="text-3xl font-bold mb-6">Interface principale</h2>

        <div className="space-y-6 mb-12">
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-yellow" />
              Tableau de bord
            </h3>
            <p className="text-gray-700 mb-4">
              L'écran principal affiche en un coup d'œil :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• <strong>État de l'alarme :</strong> Désarmée, Armée (Total), Armée (Nuit), Armée (Absent)</li>
              <li>• <strong>Appareils :</strong> Liste de tous vos capteurs, caméras, sirènes</li>
              <li>• <strong>Événements récents :</strong> Historique des détections et alertes</li>
              <li>• <strong>Accès rapides :</strong> Boutons pour armer/désarmer, voir caméras, gérer appareils</li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Modes d'armement</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold mb-2">🛡️ Armé Total</h4>
                <p className="text-sm text-gray-700">
                  Tous les capteurs sont actifs. Recommandé quand vous quittez votre domicile.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold mb-2">🌙 Armé Nuit</h4>
                <p className="text-sm text-gray-700">
                  Désactive les détecteurs de mouvement intérieurs, garde actifs les capteurs d'ouverture. Idéal pour dormir tranquille.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold mb-2">🏠 Armé Absent</h4>
                <p className="text-sm text-gray-700">
                  Mode personnalisable pour absences courtes (courses, travail). Configurez quels appareils restent actifs.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold mb-2">✓ Désarmé</h4>
                <p className="text-sm text-gray-700">
                  Tous les capteurs désactivés. Les caméras peuvent continuer d'enregistrer si configuré.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fonctionnalités avancées */}
        <h2 className="text-3xl font-bold mb-6">Fonctionnalités avancées</h2>

        <div className="space-y-8">
          {/* Scénarios */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 text-yellow mr-3" />
              <h3 className="text-xl font-bold">Scénarios automatisés</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Créez des automatisations intelligentes :
            </p>
            <div className="space-y-3 ml-6">
              <div>
                <strong>Exemple 1 : Départ au travail</strong>
                <p className="text-sm text-gray-700 ml-4">
                  Tous les jours à 8h30 → Armer en mode Total + Activer caméras extérieures
                </p>
              </div>
              <div>
                <strong>Exemple 2 : Coucher</strong>
                <p className="text-sm text-gray-700 ml-4">
                  Tous les soirs à 23h → Armer en mode Nuit + Désactiver détecteurs intérieurs
                </p>
              </div>
              <div>
                <strong>Exemple 3 : Détection intrusion</strong>
                <p className="text-sm text-gray-700 ml-4">
                  Si mouvement détecté (alarme armée) → Activer sirène + Enregistrer caméras + Notification push
                </p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              <strong>Configuration :</strong> Menu &gt; Automatisations &gt; + Nouveau scénario
            </p>
          </div>

          {/* Partage */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Partage d'accès</h3>
            <p className="text-gray-700 mb-4">
              Donnez accès à votre système à d'autres personnes :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• <strong>Administrateur :</strong> Accès total (ajout/suppression appareils, gestion utilisateurs)</li>
              <li>• <strong>Utilisateur :</strong> Armer/désarmer, voir caméras, recevoir alertes</li>
              <li>• <strong>Invité :</strong> Accès temporaire (durée limitée, permissions restreintes)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Partage :</strong> Menu &gt; Utilisateurs &gt; + Inviter un utilisateur
            </p>
          </div>

          {/* Géolocalisation */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Armement/Désarmement géolocalisé</h3>
            <p className="text-gray-700 mb-4">
              Activez l'armement automatique basé sur votre position :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• L'application détecte quand vous quittez votre domicile</li>
              <li>• Proposition d'armer automatiquement (notification)</li>
              <li>• Désarmement automatique à votre retour (optionnel, sécurisé par code PIN)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Activation :</strong> Paramètres &gt; Géolocalisation &gt; Activer l'armement intelligent
            </p>
          </div>

          {/* Historique */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Historique et enregistrements</h3>
            <p className="text-gray-700 mb-4">
              Consultez l'historique complet :
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Tous les événements (ouvertures, détections, armements/désarmements)</li>
              <li>• Enregistrements vidéo des caméras (30 jours en cloud gratuit, puis archivage local optionnel)</li>
              <li>• Filtrage par appareil, par type d'événement, par période</li>
              <li>• Export des données (PDF, CSV) pour assurance ou police</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Accès :</strong> Menu principal &gt; Historique
            </p>
          </div>
        </div>

        {/* Conseils d'utilisation */}
        <div className="mt-12 card p-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">Conseils d'utilisation</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Mettez à jour l'application régulièrement</strong>
                <p className="text-sm text-gray-700">
                  Les mises à jour apportent de nouvelles fonctionnalités et corrections de bugs.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Activez Face ID / Touch ID</strong>
                <p className="text-sm text-gray-700">
                  Protégez l'accès à votre système avec la biométrie pour plus de sécurité et rapidité.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Testez régulièrement vos scénarios</strong>
                <p className="text-sm text-gray-700">
                  Vérifiez que vos automatisations fonctionnent comme prévu, notamment après ajout de nouveaux appareils.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Configurez les contacts d'urgence</strong>
                <p className="text-sm text-gray-700">
                  Ajoutez des numéros de téléphone à contacter automatiquement en cas d'intrusion (Paramètres &gt; Urgences).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 bg-gradient-to-r from-yellow to-orange rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Besoin d'aide ?</h2>
          <p className="text-gray-900 mb-6">
            Notre équipe support est disponible pour vous accompagner dans l'utilisation de votre système InSitu Security.
          </p>
          <div className="space-y-2">
            <Link href="/support" className="block text-gray-900 hover:underline font-semibold">
              → Centre d'aide et FAQ
            </Link>
            <Link href="/contact" className="block text-gray-900 hover:underline font-semibold">
              → Contacter le support technique
            </Link>
            <a href="mailto:support@insitusecurity.be" className="block text-gray-900 hover:underline font-semibold">
              → support@insitusecurity.be
            </a>
            <a href="tel:+3223547318" className="block text-gray-900 hover:underline font-semibold">
              → +32 (0) 2 354 73 18
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
