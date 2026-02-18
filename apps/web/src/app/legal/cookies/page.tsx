import { Cookie, Settings, BarChart3, Target } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Cookie className="w-16 h-16 text-orange mx-auto mb-6" />
          <h1 className="section-title dark:text-white">Politique de Cookies</h1>
          <p className="section-subtitle dark:text-gray-300">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <p className="text-blue-900 dark:text-blue-200">
            <strong>Qu'est-ce qu'un cookie ?</strong> Un cookie est un petit fichier texte stocké sur votre
            appareil (ordinateur, smartphone, tablette) lors de votre visite sur notre site. Les cookies nous
            permettent d'améliorer votre expérience de navigation.
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">1. Types de cookies utilisés</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Nous utilisons différents types de cookies sur notre site, chacun ayant une fonction spécifique :
            </p>

            <div className="space-y-4">
              <div className="card dark:bg-gray-800 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange/10 dark:bg-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 dark:text-white">Cookies strictement nécessaires</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2"><strong className="dark:text-white">Exemples :</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 dark:text-gray-300">
                        <li>Gestion de votre session de navigation</li>
                        <li>Mémorisation de votre panier d'achat</li>
                        <li>Sécurité et authentification</li>
                        <li>Choix de langue et préférences d'affichage</li>
                      </ul>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <strong>Durée :</strong> Session ou jusqu'à 30 jours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card dark:bg-gray-800 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow/10 dark:bg-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-yellow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 dark:text-white">Cookies analytiques</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2"><strong className="dark:text-white">Exemples :</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 dark:text-gray-300">
                        <li>Nombre de visiteurs et pages consultées</li>
                        <li>Temps passé sur chaque page</li>
                        <li>Sources de trafic</li>
                        <li>Taux de rebond et parcours utilisateur</li>
                      </ul>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <strong>Outil utilisé :</strong> Google Analytics (anonymisé)<br />
                        <strong>Durée :</strong> Jusqu'à 24 mois
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card dark:bg-gray-800 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-green-600 dark:text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 dark:text-white">Cookies de personnalisation</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      Ces cookies mémorisent vos préférences pour améliorer votre expérience.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2"><strong className="dark:text-white">Exemples :</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 dark:text-gray-300">
                        <li>Mode sombre / clair</li>
                        <li>Préférences de tri des produits</li>
                        <li>Filtres appliqués</li>
                        <li>Derniers produits consultés</li>
                      </ul>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <strong>Durée :</strong> Jusqu'à 12 mois
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">2. Cookies tiers</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Certains cookies sont déposés par des services tiers que nous utilisons :
            </p>

            <div className="space-y-3">
              <div className="border-l-4 border-orange pl-4 py-2">
                <h3 className="font-bold dark:text-white mb-1">Google Analytics</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Analyse d'audience (statistiques anonymisées)
                </p>
              </div>

              <div className="border-l-4 border-orange pl-4 py-2">
                <h3 className="font-bold dark:text-white mb-1">Stripe / PayPal</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Traitement sécurisé des paiements
                </p>
              </div>

              <div className="border-l-4 border-orange pl-4 py-2">
                <h3 className="font-bold dark:text-white mb-1">Netlify</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Hébergement et performance du site
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">3. Gestion de vos préférences</h2>

            <div className="bg-yellow/10 dark:bg-yellow/20 border-2 border-yellow/30 dark:border-yellow/40 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 dark:text-white">Vous avez le contrôle</h3>
              <p className="text-gray-900 dark:text-gray-100 mb-4">
                Vous pouvez à tout moment accepter, refuser ou gérer vos préférences de cookies.
                Notez que le refus de certains cookies peut affecter votre expérience de navigation.
              </p>
            </div>

            <h3 className="text-xl font-bold mb-3 dark:text-white">Comment gérer les cookies :</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                <h4 className="font-bold mb-2 dark:text-white">Option 1 : Paramètres du site</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Utilisez notre outil de gestion des cookies (bandeau en bas de page) pour personnaliser
                  vos préférences.
                </p>
                <button className="btn-primary text-sm">
                  Gérer mes préférences
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                <h4 className="font-bold mb-2 dark:text-white">Option 2 : Paramètres du navigateur</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Configurez votre navigateur pour bloquer ou supprimer les cookies. Chaque navigateur
                  propose ses propres paramètres.
                </p>
                <div className="space-y-1 text-xs">
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="block text-orange hover:underline">
                    → Chrome
                  </a>
                  <a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer" className="block text-orange hover:underline">
                    → Firefox
                  </a>
                  <a href="https://support.apple.com/fr-fr/HT201265" target="_blank" rel="noopener noreferrer" className="block text-orange hover:underline">
                    → Safari
                  </a>
                  <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="block text-orange hover:underline">
                    → Edge
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">4. Cookies et vie privée</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous respectons votre vie privée et nous nous engageons à :
            </p>

            <ul className="space-y-3 mb-4">
              <li className="flex items-start space-x-3">
                <span className="text-orange text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="dark:text-white">Ne jamais vendre vos données</strong> à des tiers
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="dark:text-white">Utiliser uniquement des cookies nécessaires</strong> sans votre consentement
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="dark:text-white">Anonymiser les données analytiques</strong> autant que possible
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="dark:text-white">Respecter vos choix</strong> de préférences cookies
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">5. Durée de conservation</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-white uppercase">Type de cookie</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-white uppercase">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Session</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Fin de session</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Panier</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">30 jours</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Préférences</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">12 mois</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Analytiques</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">24 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">6. Modifications de cette politique</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous pouvons mettre à jour cette politique de cookies pour refléter les changements dans nos
              pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires. La date de
              dernière mise à jour est indiquée en haut de cette page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">7. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pour toute question concernant notre utilisation des cookies :
            </p>
            <div className="bg-gradient-to-r from-orange/10 to-yellow/10 dark:from-orange/20 dark:to-yellow/20 rounded-xl p-6">
              <p className="text-gray-900 dark:text-white mb-2">
                <strong>Email :</strong>{' '}
                <a href="mailto:privacy@insitusecurity.be" className="text-orange hover:underline">
                  privacy@insitusecurity.be
                </a>
              </p>
              <p className="text-gray-900 dark:text-white mb-2">
                <strong>Téléphone :</strong> +32 (0) 2 354 73 18
              </p>
              <p className="text-gray-900 dark:text-white">
                <strong>Horaires :</strong> Lundi - Vendredi, 9h - 18h
              </p>
            </div>
          </section>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <p className="text-blue-900 dark:text-blue-200 text-center">
              <strong>Bon à savoir :</strong> Les cookies ne peuvent pas infecter votre ordinateur avec des virus
              ou des logiciels malveillants. Ils ne contiennent que du texte et ne peuvent pas exécuter de code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
