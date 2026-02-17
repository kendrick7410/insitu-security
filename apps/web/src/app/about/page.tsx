import { Shield, Users, Clock, Heart, CheckCircle, Award, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    { icon: Clock, title: 'Disponibilité', desc: 'Toujours à votre écoute' },
    { icon: Shield, title: 'Réactivité', desc: 'Réponse rapide à vos besoins' },
    { icon: Users, title: 'Budget respecté', desc: 'Transparence tarifaire' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-orange">In Situ</span> Security
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre environnement est unique. Votre sécurité doit l'être aussi.<br />
            Vous installez votre sécurité. Nous vous accompagnons à chaque étape.
          </p>
        </div>

        {/* Le concept In Situ Security */}
        <div className="card p-8 mb-12 bg-gradient-to-br from-yellow/10 to-orange/10 border-l-4 border-orange">
          <h2 className="text-3xl font-bold mb-6 text-center">Le concept In Situ Security</h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong className="text-orange">In Situ Security</strong>, c'est une approche différente de la sécurité : <strong>vous achetez du matériel de qualité professionnelle chez nous, et vous l'installez vous-même</strong>.
            </p>
            <p>
              Pourquoi "In Situ" ? Parce que nos systèmes sont conçus pour <strong>s'intégrer naturellement dans votre environnement</strong>, sans en altérer l'esthétique ni le confort. Chaque installation respecte vos lieux et votre mode de vie, qu'il s'agisse de votre habitation ou de votre entreprise.
            </p>
            <p>
              Cette approche vous offre :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Autonomie totale</strong> : vous maîtrisez votre installation, à votre rythme</li>
              <li><strong>Économies significatives</strong> : pas de frais d'installation professionnelle obligatoires</li>
              <li><strong>Équipements de qualité</strong> : nous sélectionnons rigoureusement chaque produit</li>
              <li><strong>Accompagnement complet</strong> : documentation claire, support technique réactif, service de maintenance</li>
              <li><strong>Aide sur place si besoin</strong> : nous restons disponibles pour vous assister lors de l'installation si vous le souhaitez</li>
            </ul>
            <p className="text-xl font-semibold text-orange text-center mt-6 italic">
              Votre sécurité, votre installation, notre expertise.
            </p>
          </div>
        </div>

        {/* CTA Produits */}
        <div className="text-center mb-12">
          <Link
            href="/products"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange to-yellow text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Package className="w-6 h-6" />
            <span>Découvrir nos produits</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Caméras, capteurs, centrales... Tout pour votre installation
          </p>
        </div>

        {/* Mission */}
        <div className="card p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Notre mission</h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed text-center">
            <p className="text-xl">
              La sécurité est essentielle à votre tranquillité d'esprit. Notre mission est de vous aider à la préserver grâce à des <strong>solutions fiables, accessibles et durables</strong>.
            </p>
            <p className="text-2xl font-bold text-orange mt-8">
              Garantir votre sérénité, chaque jour.
            </p>
          </div>
        </div>

        {/* Nos valeurs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Nos valeurs</h2>
          <p className="text-center text-gray-600 mb-8">
            Au-delà de la qualité de nos produits, nos clients apprécient particulièrement :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((value, idx) => (
              <div key={idx} className="card p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-gray-900" />
                </div>
                <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notre garantie */}
        <div className="card p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Notre garantie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Produits de qualité</h3>
                <p className="text-gray-600 text-sm">
                  Nous sélectionnons rigoureusement nos équipements pour vous garantir fiabilité et durabilité.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Délais courts</h3>
                <p className="text-gray-600 text-sm">
                  Livraison rapide et mise en service efficace pour assurer votre sécurité sans attente.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Accompagnement disponible</h3>
                <p className="text-gray-600 text-sm">
                  Support technique et possibilité d'installation professionnelle sur demande.
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
