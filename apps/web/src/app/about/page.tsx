import { Shield, Users, Clock, Heart, CheckCircle, Award } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: Clock, title: 'Disponibilité', desc: 'Toujours à votre écoute' },
    { icon: Shield, title: 'Réactivité', desc: 'Réponse rapide à vos besoins' },
    { icon: CheckCircle, title: 'Ponctualité', desc: 'Respect des délais' },
    { icon: Heart, title: 'Convivialité', desc: 'Relation humaine privilégiée' },
    { icon: Award, title: 'Soin apporté', desc: 'Travail de qualité' },
    { icon: Users, title: 'Budget respecté', desc: 'Transparence tarifaire' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-orange">InSitu</span> Security
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seules les entreprises de sécurité avec des valeurs humaines fortes et engageantes
            pourront vous apporter confiance et satisfaction.
          </p>
        </div>

        {/* Mission */}
        <div className="card p-8 mb-12 bg-gradient-to-br from-orange/10 to-yellow/10">
          <h2 className="text-3xl font-bold mb-6 text-center">Notre mission</h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Le sentiment de sécurité est un pilier essentiel pour chacun d'entre nous.
              Notre mission vise à vous faire retrouver cette sensation de sécurité ou vous
              permettre de la conserver grâce à des solutions rationnelles et efficaces.
            </p>
            <p>
              Vivre une effraction reste traumatisant pour beaucoup de personnes. Prenez le
              temps d'entreprendre la sécurisation de votre habitation ou de votre entreprise
              à tête reposée. Évitez les solutions « toute faite » ou « en kit » qui privilégient
              la rapidité d'installation à l'efficacité d'un système bien pensé.
            </p>
            <p className="text-xl font-semibold text-orange text-center mt-6">
              Notre mission : Garantir votre sérénité
            </p>
          </div>
        </div>

        {/* Nos valeurs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Nos valeurs</h2>
          <p className="text-center text-gray-600 mb-8">
            Au-delà de la qualité de nos prestations, nos clients apprécient particulièrement :
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="card p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notre expertise */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card p-8 text-center">
            <div className="text-5xl font-bold text-orange mb-2">+20 ans</div>
            <p className="text-gray-700 font-semibold">d'expérience</p>
          </div>
          <div className="card p-8 text-center">
            <div className="text-5xl font-bold text-orange mb-2">100%</div>
            <p className="text-gray-700 font-semibold">Matériel de qualité</p>
          </div>
          <div className="card p-8 text-center">
            <div className="text-5xl font-bold text-orange mb-2">1000+</div>
            <p className="text-gray-700 font-semibold">Clients satisfaits</p>
          </div>
        </div>

        {/* Notre garantie */}
        <div className="card p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Notre garantie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Fiabilité</h3>
                <p className="text-gray-600 text-sm">
                  La fiabilité de nos installations repose sur la sélection des produits et
                  l'expérience acquise au fil des nombreuses missions qui nous ont été confiées.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Étude personnalisée</h3>
                <p className="text-gray-600 text-sm">
                  Seule une étude personnalisée et détaillée faite par un technicien vous
                  guidera vers le bon choix pour votre sécurité.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Soin apporté</h3>
                <p className="text-gray-600 text-sm">
                  Chaque installation est réalisée avec le plus grand soin, dans le respect
                  de votre environnement et de vos contraintes.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Budget respecté</h3>
                <p className="text-gray-600 text-sm">
                  Nous nous engageons à respecter le budget établi lors du devis, sans
                  surprise ni dépassement injustifié.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Équipe fondatrice */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Notre équipe fondatrice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange to-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">LB</span>
              </div>
              <h3 className="font-bold text-xl mb-1">Laurent Berckmans</h3>
              <p className="text-orange font-semibold mb-3">CO-FONDATEUR</p>
              <p className="text-gray-600 italic">
                "Posé, j'analyse la situation en détail avant d'agir."
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow to-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">JB</span>
              </div>
              <h3 className="font-bold text-xl mb-1">Jérémie Baeck</h3>
              <p className="text-orange font-semibold mb-3">CO-FONDATEUR</p>
              <p className="text-gray-600 italic">
                "Discret, je trouve une solution à chaque difficulté."
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card p-8 bg-gradient-to-r from-orange to-yellow text-center">
          <h2 className="text-3xl font-bold mb-6">Nous contacter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-gray-900">
            <div>
              <h3 className="font-bold mb-2">📞 Téléphone</h3>
              <a href="tel:+3223547318" className="hover:underline">
                +32 (0) 2 354 73 18
              </a>
            </div>
            <div>
              <h3 className="font-bold mb-2">📧 Email</h3>
              <a href="mailto:contact@insitusecurity.be" className="hover:underline">
                contact@insitusecurity.be
              </a>
            </div>
            <div>
              <h3 className="font-bold mb-2">📍 Adresse</h3>
              <p className="text-sm">
                504/21 Chaussée de Wavre<br />
                1390 Grez-Doiceau<br />
                Belgique
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
