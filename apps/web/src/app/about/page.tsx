import { Target, Users, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title">À propos d'InSitu Security</h1>
          <p className="section-subtitle">
            Rendre la sécurité connectée accessible à tous
          </p>
        </div>

        {/* Mission */}
        <div className="card p-8 mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-gray-900" />
            </div>
            <h2 className="text-3xl font-bold">Notre mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Chez InSitu Security, nous croyons que tout le monde mérite un système de sécurité
            performant, facile à installer et sans coûts cachés.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nous avons créé une gamme de produits intelligents qui s'installent en 30 minutes,
            se contrôlent depuis votre smartphone et fonctionnent sans abonnement obligatoire.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="font-bold text-xl mb-3">Simplicité</h3>
            <p className="text-gray-600">
              Installation DIY en 30 minutes. Pas besoin d'électricien ou de câblage complexe.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="font-bold text-xl mb-3">Qualité</h3>
            <p className="text-gray-600">
              Produits certifiés, garantie 2 ans, support technique 7j/7.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="font-bold text-xl mb-3">Transparence</h3>
            <p className="text-gray-600">
              Pas d'abonnement caché. Vous achetez votre système, il est à vous.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Notre histoire</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              InSitu Security a été fondée en 2020 par une équipe d'ingénieurs passionnés
              par la domotique et la sécurité connectée. Frustrés par les systèmes d'alarme
              traditionnels coûteux et complexes, nous avons décidé de créer une alternative.
            </p>
            <p>
              Notre vision : un système d'alarme que n'importe qui peut installer en une
              après-midi, contrôler depuis son smartphone, et faire évoluer selon ses besoins.
              Sans abonnement forcé. Sans installation professionnelle obligatoire.
            </p>
            <p>
              Aujourd'hui, nous équipons des milliers de foyers en France et en Europe.
              Notre engagement : continuer à innover pour rendre la sécurité connectée
              accessible, performante et abordable.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow mb-2">2020</div>
            <div className="text-gray-600">Année de création</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow mb-2">10K+</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow mb-2">50+</div>
            <div className="text-gray-600">Appareils compatibles</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow mb-2">4.8/5</div>
            <div className="text-gray-600">Satisfaction client</div>
          </div>
        </div>

        {/* Team (Placeholder) */}
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Rejoignez l'aventure</h2>
          <p className="text-gray-600 mb-6">
            Nous recherchons des talents passionnés pour nous aider à démocratiser
            la sécurité connectée.
          </p>
          <a
            href="mailto:jobs@insitusecurity.fr"
            className="btn-primary inline-block"
          >
            Voir nos offres d'emploi
          </a>
        </div>
      </div>
    </div>
  );
}
