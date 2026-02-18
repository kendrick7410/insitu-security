import Link from 'next/link';
import { Book, MessageCircle, Phone, Mail, Search } from 'lucide-react';

export default function SupportPage() {
  const quickLinks = [
    {
      icon: Book,
      title: 'Documentation',
      description: 'Guides d\'installation et manuels utilisateur',
      href: '/docs',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: MessageCircle,
      title: 'Chat en direct',
      description: 'Discutez avec notre équipe (9h-18h)',
      href: '#chat',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      description: '01 23 45 67 89 (Lun-Ven 9h-18h)',
      href: 'tel:+33123456789',
      color: 'bg-yellow text-gray-900',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'contact@insitusecurity.fr',
      href: 'mailto:contact@insitusecurity.fr',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const faqs = [
    {
      category: 'Installation',
      questions: [
        {
          q: 'Combien de temps prend l\'installation ?',
          a: 'En moyenne 30 minutes pour un pack complet. Aucun câblage nécessaire.',
        },
        {
          q: 'Puis-je installer moi-même ou dois-je faire appel à un pro ?',
          a: 'Nos systèmes sont conçus pour une installation DIY facile. Une installation pro est optionnelle.',
        },
      ],
    },
    {
      category: 'Technique',
      questions: [
        {
          q: 'Mon système fonctionne-t-il sans Internet ?',
          a: 'La sirène locale fonctionne toujours. Les notifications nécessitent Internet (WiFi ou 4G optionnel).',
        },
        {
          q: 'Quelle est l\'autonomie de la batterie de secours ?',
          a: 'La centrale dispose d\'une batterie de 24h. Les capteurs durent 2 ans avec une pile standard.',
        },
      ],
    },
    {
      category: 'Compte & Abonnement',
      questions: [
        {
          q: 'Y a-t-il un abonnement obligatoire ?',
          a: 'Non ! L\'app mobile de base est gratuite. Seuls les plans de maintenance sont optionnels.',
        },
        {
          q: 'Puis-je ajouter des appareils après l\'achat ?',
          a: 'Oui, jusqu\'à 50 appareils par centrale. Tous nos produits sont compatibles entre eux.',
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title">Centre d'aide</h1>
          <p className="section-subtitle">
            Nous sommes là pour vous aider
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-yellow focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="card dark:bg-gray-800 p-6 hover:scale-105 transition-transform"
            >
              <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-4`}>
                <link.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">{link.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{link.description}</p>
            </Link>
          ))}
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold dark:text-white text-center mb-8">Questions fréquentes</h2>

          <div className="space-y-8">
            {faqs.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold dark:text-white mb-4 text-yellow">{section.category}</h3>
                <div className="space-y-4">
                  {section.questions.map((item, qIdx) => (
                    <div key={qIdx} className="card dark:bg-gray-800 p-6">
                      <h4 className="font-bold text-lg mb-2 dark:text-white">{item.q}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="card dark:bg-gray-800 p-8 text-center bg-gradient-to-r from-yellow to-orange">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-gray-900 mb-6">
            Notre équipe est disponible pour vous aider
          </p>
          <Link href="/contact" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
