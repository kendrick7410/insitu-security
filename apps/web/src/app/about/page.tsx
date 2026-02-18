import { Shield, Users, Clock, ArrowDown, Package, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    { icon: Clock, title: 'Disponibilité', desc: 'Toujours à votre écoute' },
    { icon: Shield, title: 'Réactivité', desc: 'Réponse rapide à vos besoins' },
    { icon: Users, title: 'Budget respecté', desc: 'Transparence tarifaire' },
  ];

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">

      {/* Section 1 - Hero */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-orange">In Situ</span> Security
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 font-light mb-6 max-w-3xl mx-auto leading-relaxed">
            Votre environnement est unique.<br />
            Votre sécurité doit l'être aussi.
          </p>
          <p className="text-xl text-gray-500 mb-16">
            Vous installez votre sécurité. Nous vous accompagnons à chaque étape.
          </p>

          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 mx-auto text-orange opacity-60" />
            <p className="text-sm text-gray-500 mt-2">Découvrir notre histoire</p>
          </div>
        </div>
      </section>

      {/* Section 2 - Le Concept */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-gray-50 to-orange/5 px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-orange">Le concept</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <Package className="w-20 h-20 text-orange mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Vous achetez</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Du matériel de qualité professionnelle sélectionné avec soin
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <CheckCircle className="w-20 h-20 text-orange mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Vous installez</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Autonomie totale à votre rythme avec nos guides détaillés
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <Shield className="w-20 h-20 text-orange mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Nous accompagnons</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Support technique et aide sur place si besoin
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange to-yellow text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Package className="w-6 h-6" />
              <span>Découvrir nos produits</span>
            </Link>
          </div>

          <div className="mt-16 animate-bounce text-center">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 3 - Mission */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-orange/5 to-yellow/5 px-4">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Notre <span className="text-orange">mission</span>
          </h2>

          <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl border-2 border-orange/10">
            <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed mb-8 font-light">
              La sécurité est essentielle à votre tranquillité d'esprit.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Notre mission est de vous aider à la préserver grâce à des solutions <strong>fiables, accessibles et durables</strong>.
            </p>
            <div className="text-3xl md:text-4xl font-bold text-orange">
              Garantir votre sérénité, chaque jour.
            </div>
          </div>

          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 4 - Nos Valeurs */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-yellow/5 to-white px-4">
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Nos <span className="text-orange">valeurs</span>
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Au-delà de la qualité de nos produits
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-orange to-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <value.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">{value.title}</h3>
                <p className="text-gray-600 text-lg">{value.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 5 - Équipe */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-white to-orange/5 px-4">
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            Notre <span className="text-orange">équipe</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-32 h-32 bg-gradient-to-br from-orange to-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl font-bold text-white">LB</span>
              </div>
              <h3 className="font-bold text-2xl mb-2">Laurent Berckmans</h3>
              <p className="text-orange font-semibold text-sm mb-4 tracking-wider">CO-FONDATEUR</p>
              <p className="text-gray-600 text-lg italic leading-relaxed">
                "Posé, j'analyse la situation en détail avant d'agir."
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow to-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl font-bold text-white">JB</span>
              </div>
              <h3 className="font-bold text-2xl mb-2">Jérémie Baeck</h3>
              <p className="text-orange font-semibold text-sm mb-4 tracking-wider">CO-FONDATEUR</p>
              <p className="text-gray-600 text-lg italic leading-relaxed">
                "Discret, je trouve une solution à chaque difficulté."
              </p>
            </div>
          </div>

          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 6 - Contact */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-orange/5 to-yellow/10 px-4">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nous <span className="text-orange">contacter</span>
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Une question ? Un projet ? Parlons-en !
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <Phone className="w-12 h-12 text-orange mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-3">Téléphone</h3>
              <a
                href="tel:+3223547318"
                className="text-gray-700 hover:text-orange transition-colors text-lg"
              >
                +32 (0) 2 354 73 18
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <Mail className="w-12 h-12 text-orange mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-3">Email</h3>
              <a
                href="mailto:contact@insitusecurity.be"
                className="text-gray-700 hover:text-orange transition-colors break-all"
              >
                contact@insitusecurity.be
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <MapPin className="w-12 h-12 text-orange mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-3">Adresse</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                504/21 Chaussée de Wavre<br />
                1390 Grez-Doiceau<br />
                Belgique
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-orange to-yellow text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Package className="w-6 h-6" />
              <span>Voir les produits</span>
            </Link>

            <Link
              href="/ar"
              className="inline-flex items-center justify-center space-x-2 bg-white border-2 border-orange text-orange px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Shield className="w-6 h-6" />
              <span>Essayer l'AR</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
