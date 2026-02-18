import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-orange mx-auto mb-6" />
          <h1 className="section-title dark:text-white">Conditions Générales de Vente</h1>
          <p className="section-subtitle dark:text-gray-300">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">1. Informations légales</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              In Situ Security est une entreprise spécialisée dans la vente de systèmes de sécurité connectés en DIY (Do It Yourself).
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong className="dark:text-white">Raison sociale :</strong> In Situ Security SPRL
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong className="dark:text-white">Siège social :</strong> 504/21 Chaussée de Wavre, 1390 Grez-Doiceau, Belgique
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong className="dark:text-white">Numéro d'entreprise :</strong> BE 0XXX.XXX.XXX
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="dark:text-white">Contact :</strong> contact@insitusecurity.be | +32 (0) 2 354 73 18
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">2. Objet</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les présentes Conditions Générales de Vente (CGV) régissent toute commande effectuée sur le site
              insitusecurity.be. En passant commande, le client reconnaît avoir pris connaissance et accepté
              sans réserve l'intégralité des présentes CGV.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">3. Produits et services</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous proposons à la vente des équipements de sécurité (caméras, capteurs, centrales d'alarme, etc.)
              ainsi que des packs complets. Tous nos produits sont accompagnés de guides d'installation détaillés
              pour une installation autonome.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-4">
              <p className="text-blue-900 dark:text-blue-200 text-sm">
                <strong>Note :</strong> L'installation professionnelle n'est pas incluse dans le prix.
                Nos produits sont conçus pour une installation DIY. Une assistance sur place est disponible
                en option (voir plans de maintenance).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">4. Prix et paiement</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les prix sont indiqués en euros (EUR) toutes taxes comprises (TTC). Nous nous réservons le droit
              de modifier nos prix à tout moment, mais les produits seront facturés sur la base des tarifs en
              vigueur au moment de la validation de la commande.
            </p>
            <h3 className="text-xl font-bold mb-3 dark:text-white">Moyens de paiement acceptés :</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Carte bancaire (Visa, Mastercard)</li>
              <li>Virement bancaire</li>
              <li>PayPal</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">5. Livraison</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les produits sont livrés à l'adresse indiquée lors de la commande. Les délais de livraison
              sont donnés à titre indicatif et peuvent varier selon le transporteur.
            </p>
            <h3 className="text-xl font-bold mb-3 dark:text-white">Délais standards :</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Belgique : 2-3 jours ouvrés</li>
              <li>France : 3-5 jours ouvrés</li>
              <li>Autres pays EU : 5-7 jours ouvrés</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">6. Droit de rétractation</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours calendaires à
              compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir
              à justifier de motifs ni à payer de pénalité.
            </p>
            <div className="bg-yellow/10 dark:bg-yellow/20 border-2 border-yellow/30 dark:border-yellow/40 rounded-xl p-4 mb-4">
              <p className="text-gray-900 dark:text-gray-100 text-sm">
                <strong>Important :</strong> Les produits doivent être retournés dans leur emballage d'origine,
                en parfait état de revente (non utilisés, non installés).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">7. Garantie</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Tous nos produits bénéficient de la garantie légale de conformité de 2 ans à compter de la
              livraison. La garantie constructeur s'applique selon les termes définis par chaque fabricant.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Des extensions de garantie sont disponibles via nos plans de maintenance Premium et Pro.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">8. Responsabilité</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              In Situ Security ne saurait être tenu responsable des dommages résultant d'une mauvaise
              installation ou utilisation non conforme des produits. Nous recommandons de suivre attentivement
              les guides d'installation fournis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">9. Données personnelles</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les données collectées lors de votre commande sont nécessaires au traitement de celle-ci.
              Pour plus d'informations, consultez notre{' '}
              <a href="/legal/privacy" className="text-orange hover:underline">
                Politique de Confidentialité
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">10. Litiges</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les présentes CGV sont soumises au droit belge. En cas de litige, une solution amiable sera
              recherchée avant toute action judiciaire. À défaut, les tribunaux belges seront seuls compétents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">11. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pour toute question concernant nos CGV, n'hésitez pas à nous contacter :
            </p>
            <div className="bg-gradient-to-r from-orange/10 to-yellow/10 dark:from-orange/20 dark:to-yellow/20 rounded-xl p-6">
              <p className="text-gray-900 dark:text-white mb-2">
                <strong>Email :</strong> contact@insitusecurity.be
              </p>
              <p className="text-gray-900 dark:text-white mb-2">
                <strong>Téléphone :</strong> +32 (0) 2 354 73 18
              </p>
              <p className="text-gray-900 dark:text-white">
                <strong>Horaires :</strong> Lundi - Vendredi, 9h - 18h
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
