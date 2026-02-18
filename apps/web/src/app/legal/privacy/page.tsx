import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-orange mx-auto mb-6" />
          <h1 className="section-title dark:text-white">Politique de Confidentialité</h1>
          <p className="section-subtitle dark:text-gray-300">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <p className="text-blue-900 dark:text-blue-200">
            <strong>Votre vie privée est importante pour nous.</strong> Cette politique explique quelles données
            nous collectons, pourquoi nous les collectons et comment nous les utilisons. En utilisant notre site,
            vous acceptez les pratiques décrites dans cette politique.
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-8 h-8 text-orange" />
              <h2 className="text-2xl font-bold dark:text-white">1. Données collectées</h2>
            </div>

            <h3 className="text-xl font-bold mb-3 dark:text-white">Données que vous nous fournissez :</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Nom, prénom</li>
              <li>Adresse email</li>
              <li>Adresse de livraison et de facturation</li>
              <li>Numéro de téléphone</li>
              <li>Informations de paiement (traitées de manière sécurisée par nos prestataires)</li>
            </ul>

            <h3 className="text-xl font-bold mb-3 dark:text-white">Données collectées automatiquement :</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Adresse IP</li>
              <li>Type de navigateur et appareil</li>
              <li>Pages visitées et temps passé sur le site</li>
              <li>Données de navigation (cookies)</li>
            </ul>
          </section>

          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-8 h-8 text-orange" />
              <h2 className="text-2xl font-bold dark:text-white">2. Utilisation des données</h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous utilisons vos données personnelles pour :
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="card dark:bg-gray-800 p-6">
                <h3 className="font-bold text-lg mb-3 dark:text-white">Traitement des commandes</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Valider et traiter vos achats</li>
                  <li>Organiser la livraison</li>
                  <li>Émettre des factures</li>
                  <li>Gérer le SAV</li>
                </ul>
              </div>

              <div className="card dark:bg-gray-800 p-6">
                <h3 className="font-bold text-lg mb-3 dark:text-white">Communication</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Répondre à vos questions</li>
                  <li>Envoyer des confirmations de commande</li>
                  <li>Vous informer du statut de livraison</li>
                  <li>Support technique</li>
                </ul>
              </div>

              <div className="card dark:bg-gray-800 p-6">
                <h3 className="font-bold text-lg mb-3 dark:text-white">Amélioration du service</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Analyser l'utilisation du site</li>
                  <li>Améliorer nos produits</li>
                  <li>Personnaliser votre expérience</li>
                  <li>Prévenir la fraude</li>
                </ul>
              </div>

              <div className="card dark:bg-gray-800 p-6">
                <h3 className="font-bold text-lg mb-3 dark:text-white">Marketing (avec consentement)</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Newsletter mensuelle</li>
                  <li>Offres spéciales</li>
                  <li>Nouveaux produits</li>
                  <li>Conseils d'utilisation</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow/10 dark:bg-yellow/20 border-2 border-yellow/30 dark:border-yellow/40 rounded-xl p-4">
              <p className="text-gray-900 dark:text-gray-100 text-sm">
                <strong>Important :</strong> Vous pouvez vous désabonner de nos communications marketing à tout
                moment en cliquant sur le lien de désinscription présent dans chaque email.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-8 h-8 text-orange" />
              <h2 className="text-2xl font-bold dark:text-white">3. Protection des données</h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous prenons la sécurité de vos données très au sérieux et mettons en œuvre des mesures
              techniques et organisationnelles appropriées :
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Chiffrement SSL/TLS pour toutes les transmissions de données</li>
              <li>Serveurs sécurisés et hébergement certifié</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Sauvegardes régulières</li>
              <li>Surveillance continue de la sécurité</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">4. Partage des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous ne vendons jamais vos données personnelles à des tiers. Nous partageons vos données
              uniquement dans les cas suivants :
            </p>

            <div className="space-y-4 mb-4">
              <div className="border-l-4 border-orange pl-4">
                <h3 className="font-bold dark:text-white mb-2">Prestataires de services</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Transporteurs (livraison), processeurs de paiement, hébergement cloud - tous soumis à
                  des obligations strictes de confidentialité.
                </p>
              </div>

              <div className="border-l-4 border-orange pl-4">
                <h3 className="font-bold dark:text-white mb-2">Obligations légales</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Si la loi l'exige (demandes des autorités judiciaires, fiscales, etc.).
                </p>
              </div>

              <div className="border-l-4 border-orange pl-4">
                <h3 className="font-bold dark:text-white mb-2">Protection de nos droits</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Pour prévenir la fraude, protéger nos droits ou la sécurité de nos utilisateurs.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">5. Vos droits (RGPD)</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold dark:text-white mb-2">✓ Droit d'accès</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Obtenir une copie de vos données personnelles
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold dark:text-white mb-2">✓ Droit de rectification</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Corriger des données inexactes ou incomplètes
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold dark:text-white mb-2">✓ Droit à l'effacement</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Demander la suppression de vos données
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold dark:text-white mb-2">✓ Droit d'opposition</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Refuser le traitement de vos données
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold dark:text-white mb-2">✓ Droit à la portabilité</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Recevoir vos données dans un format structuré
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold dark:text-white mb-2">✓ Droit de limitation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Limiter le traitement de vos données
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pour exercer ces droits, contactez-nous à :{' '}
              <a href="mailto:privacy@insitusecurity.be" className="text-orange hover:underline font-semibold">
                privacy@insitusecurity.be
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">6. Conservation des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous conservons vos données personnelles aussi longtemps que nécessaire :
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong className="dark:text-white">Données de compte :</strong> Jusqu'à suppression de votre compte</li>
              <li><strong className="dark:text-white">Données de commande :</strong> 10 ans (obligations comptables)</li>
              <li><strong className="dark:text-white">Données marketing :</strong> 3 ans après dernier contact</li>
              <li><strong className="dark:text-white">Cookies :</strong> Selon la durée définie (max 13 mois)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">7. Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Notre site utilise des cookies pour améliorer votre expérience. Pour plus de détails, consultez
              notre{' '}
              <a href="/legal/cookies" className="text-orange hover:underline">
                Politique de Cookies
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">8. Contact</h2>
            <div className="bg-gradient-to-r from-orange/10 to-yellow/10 dark:from-orange/20 dark:to-yellow/20 rounded-xl p-6">
              <p className="text-gray-900 dark:text-white mb-4">
                <strong>Responsable de la protection des données :</strong>
              </p>
              <p className="text-gray-900 dark:text-white mb-2">
                <strong>Email :</strong> privacy@insitusecurity.be
              </p>
              <p className="text-gray-900 dark:text-white mb-2">
                <strong>Adresse :</strong> 504/21 Chaussée de Wavre, 1390 Grez-Doiceau, Belgique
              </p>
              <p className="text-gray-900 dark:text-white">
                <strong>Téléphone :</strong> +32 (0) 2 354 73 18
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3 dark:text-white">Réclamation auprès de l'autorité</h3>
              <p className="text-blue-900 dark:text-blue-200">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation
                auprès de l'Autorité de Protection des Données (APD) : <br />
                <a href="https://www.autoriteprotectiondonnees.be" className="text-blue-700 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  www.autoriteprotectiondonnees.be
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
