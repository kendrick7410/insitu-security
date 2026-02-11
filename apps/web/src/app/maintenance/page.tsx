import { Check, Shield, Headphones, Wrench } from 'lucide-react';

export default function MaintenancePage() {
  const plans = [
    {
      name: 'Basique',
      price: 0,
      period: 'Gratuit',
      features: [
        'Garantie constructeur 2 ans',
        'Support par email',
        'Documentation en ligne',
        'Mises à jour firmware',
      ],
      cta: 'Inclus avec votre achat',
      highlighted: false,
    },
    {
      name: 'Premium',
      price: 9.99,
      period: '/ mois',
      features: [
        'Tout du plan Basique',
        'Extension de garantie 5 ans',
        'Support prioritaire 7j/7',
        'Remplacement express 48h',
        'Stockage cloud illimité (caméras)',
        'Télémaintenance à distance',
      ],
      cta: 'Souscrire maintenant',
      highlighted: true,
    },
    {
      name: 'Pro',
      price: 19.99,
      period: '/ mois',
      features: [
        'Tout du plan Premium',
        'Intervention sur site incluse (2x/an)',
        'Hotline dédiée 24/7',
        'Diagnostics préventifs',
        'Remplacement anticipé avant panne',
        'Consultation sécurité annuelle',
      ],
      cta: 'Contactez-nous',
      highlighted: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title">Plans de maintenance</h1>
          <p className="section-subtitle">
            Sécurité et sérénité pour votre système d'alarme
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`card p-8 ${
                plan.highlighted
                  ? 'ring-4 ring-yellow shadow-2xl transform scale-105'
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="bg-yellow text-gray-900 text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                  POPULAIRE
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price > 0 && <span className="text-gray-600">{plan.period}</span>}
                {plan.price === 0 && <span className="text-gray-600 ml-2">{plan.period}</span>}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Check className="w-5 h-5 text-yellow flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Why Maintenance */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Pourquoi souscrire à un plan de maintenance ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="font-bold text-lg mb-2">Tranquillité d'esprit</h3>
              <p className="text-gray-600 text-sm">
                Votre système fonctionne 24/7. Un support réactif garantit votre sécurité sans interruption.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="font-bold text-lg mb-2">Maintenance préventive</h3>
              <p className="text-gray-600 text-sm">
                Détection et résolution des problèmes avant qu'ils n'affectent votre sécurité.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="font-bold text-lg mb-2">Support expert</h3>
              <p className="text-gray-600 text-sm">
                Nos techniciens sont formés pour résoudre rapidement tous vos problèmes.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes</h2>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-2">
                Puis-je changer de plan en cours d'année ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les ajustements sont calculés au prorata.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-lg mb-2">
                Le plan gratuit est-il vraiment suffisant ?
              </h3>
              <p className="text-gray-600">
                Pour une utilisation basique, oui. Vous bénéficiez de la garantie 2 ans et des mises à jour. Les plans payants ajoutent confort et sérénité.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-lg mb-2">
                Que se passe-t-il en cas de panne hors garantie ?
              </h3>
              <p className="text-gray-600">
                Sans plan, vous devrez payer les réparations. Avec Premium/Pro, le remplacement est inclus. C'est là toute la valeur des plans payants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
