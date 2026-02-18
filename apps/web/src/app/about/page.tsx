import { Shield, Users, Clock, ArrowDown, Package, CheckCircle, Mail, Phone, MapPin, Target, Heart, Lightbulb, Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">

      {/* Section 1 - Hero */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            À propos de <span className="text-orange">nous</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 font-light mb-16 max-w-3xl mx-auto leading-relaxed">
            Deux amis, une vision commune :<br />
            rendre la sécurité accessible à tous
          </p>

          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 mx-auto text-orange opacity-60" />
            <p className="text-sm text-gray-500 mt-2">Notre histoire</p>
          </div>
        </div>
      </section>

      {/* Section 2 - L'origine / Le Pourquoi */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-gray-50 to-orange/5 px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Pourquoi <span className="text-orange">In Situ Security</span> ?
          </h2>

          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl mb-8">
            <Lightbulb className="w-16 h-16 text-orange mx-auto mb-8" />

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Tout a commencé par un constat simple : <strong>les systèmes de sécurité sont soit trop chers avec installation professionnelle obligatoire, soit de mauvaise qualité en DIY complet</strong>.
              </p>
              <p>
                Nous avons voulu créer une <strong>troisième voie</strong> : du matériel professionnel de qualité, que vous installez vous-même, avec un vrai accompagnement humain quand vous en avez besoin.
              </p>
              <p className="text-xl font-semibold text-orange">
                L'autonomie sans l'abandon. La qualité sans le prix excessif.
              </p>
            </div>
          </div>

          <div className="mt-12 animate-bounce text-center">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 3 - La philosophie "In Situ" */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-orange/5 to-yellow/5 px-4">
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Que signifie <span className="text-orange">"In Situ"</span> ?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Plus qu'un nom, une philosophie
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white to-orange/5 rounded-3xl p-10 shadow-xl border-2 border-orange/20">
              <Target className="w-16 h-16 text-orange mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Dans votre contexte</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>"In Situ"</strong> signifie littéralement "sur place, dans son milieu naturel". Votre maison ou entreprise est unique. Votre sécurité doit s'adapter à <strong>votre environnement réel</strong>, pas l'inverse.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-yellow/5 rounded-3xl p-10 shadow-xl border-2 border-yellow/20">
              <Heart className="w-16 h-16 text-orange mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Respect de vos lieux</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Nous croyons que la sécurité ne doit pas <strong>altérer l'esthétique</strong> de votre espace ni votre confort de vie. Elle doit s'intégrer naturellement, comme si elle avait toujours été là.
              </p>
            </div>
          </div>

          <div className="mt-12 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 4 - Nos valeurs en action */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-yellow/5 to-white px-4">
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Nos valeurs <span className="text-orange">en action</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Ce que nous promettons, ce que nous tenons
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-orange" />
              </div>
              <h3 className="font-bold text-xl mb-3">Disponibilité</h3>
              <p className="text-gray-600 leading-relaxed">
                Support technique <strong>réactif par email et téléphone</strong>. Nous répondons à vos questions avant, pendant et après l'installation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-orange" />
              </div>
              <h3 className="font-bold text-xl mb-3">Qualité garantie</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous sélectionnons <strong>rigoureusement chaque produit</strong>. Si un équipement ne nous convainc pas en test, il n'entre pas au catalogue.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-orange" />
              </div>
              <h3 className="font-bold text-xl mb-3">Transparence totale</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Prix clairs, sans frais cachés</strong>. Documentation complète. Vous savez exactement ce que vous achetez et comment l'installer.
              </p>
            </div>
          </div>

          <div className="mt-12 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 5 - L'équipe en profondeur */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-white to-orange/5 px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Rencontrez <span className="text-orange">l'équipe</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Deux personnalités complémentaires, une mission commune
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-white to-orange/5 rounded-3xl p-10 shadow-2xl border border-orange/20">
              <div className="w-32 h-32 bg-gradient-to-br from-orange to-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl font-bold text-white">LB</span>
              </div>
              <h3 className="font-bold text-2xl mb-2 text-center">Laurent Berckmans</h3>
              <p className="text-orange font-semibold text-sm mb-6 text-center tracking-wider">CO-FONDATEUR</p>

              <div className="space-y-4 text-gray-700">
                <p className="italic text-lg text-center mb-4">
                  "Posé, j'analyse la situation en détail avant d'agir."
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Plus de 10 ans d'expérience</strong> dans la sécurité et la domotique. Laurent s'occupe de la <strong>sélection des produits</strong> et du contrôle qualité. Son approche méthodique garantit que chaque équipement répond à nos standards.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-yellow/5 rounded-3xl p-10 shadow-2xl border border-yellow/20">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow to-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl font-bold text-white">JB</span>
              </div>
              <h3 className="font-bold text-2xl mb-2 text-center">Jérémie Baeck</h3>
              <p className="text-orange font-semibold text-sm mb-6 text-center tracking-wider">CO-FONDATEUR</p>

              <div className="space-y-4 text-gray-700">
                <p className="italic text-lg text-center mb-4">
                  "Discret, je trouve une solution à chaque difficulté."
                </p>
                <p className="text-sm leading-relaxed">
                  Expert en <strong>support client et résolution de problèmes</strong>. Jérémie gère le <strong>support technique</strong> et l'accompagnement des clients. Son calme et sa créativité permettent de trouver des solutions même aux cas les plus complexes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 animate-bounce text-center">
            <ArrowDown className="w-6 h-6 mx-auto text-orange/60" />
          </div>
        </div>
      </section>

      {/* Section 6 - Notre engagement + Localisation */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-orange/5 to-yellow/10 px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Notre <span className="text-orange">engagement</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <Award className="w-12 h-12 text-orange mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Qualité pro</h3>
              <p className="text-gray-600 text-sm">
                Équipements sélectionnés et testés
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-orange mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Livraison rapide</h3>
              <p className="text-gray-600 text-sm">
                Délais courts, stock permanent
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <Heart className="w-12 h-12 text-orange mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Support humain</h3>
              <p className="text-gray-600 text-sm">
                Accompagnement avant, pendant, après
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold mb-8 text-center">Nous trouver</h3>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Phone className="w-10 h-10 text-orange mx-auto mb-3" />
                <h4 className="font-bold mb-2">Téléphone</h4>
                <a href="tel:+3223547318" className="text-gray-700 hover:text-orange transition-colors">
                  +32 (0) 2 354 73 18
                </a>
                <p className="text-sm text-gray-500 mt-1">Lun-Ven 9h-18h</p>
              </div>

              <div className="text-center">
                <Mail className="w-10 h-10 text-orange mx-auto mb-3" />
                <h4 className="font-bold mb-2">Email</h4>
                <a href="mailto:contact@insitusecurity.be" className="text-gray-700 hover:text-orange transition-colors text-sm break-all">
                  contact@insitusecurity.be
                </a>
                <p className="text-sm text-gray-500 mt-1">Réponse sous 24h</p>
              </div>

              <div className="text-center">
                <MapPin className="w-10 h-10 text-orange mx-auto mb-3" />
                <h4 className="font-bold mb-2">Adresse</h4>
                <p className="text-gray-700 text-sm">
                  504/21 Chaussée de Wavre<br />
                  1390 Grez-Doiceau<br />
                  Belgique
                </p>
              </div>
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
