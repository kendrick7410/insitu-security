import Link from 'next/link';
import { Book, FileText, Wrench, AlertCircle } from 'lucide-react';

export default function DocsPage() {
  const docCategories = [
    {
      title: 'Installation',
      icon: Book,
      links: [
        { name: 'Centrale d\'alarme', href: '/docs/installation/centrale' },
        { name: 'Caméras', href: '/docs/installation/cameras' },
        { name: 'Capteurs', href: '/docs/installation/capteurs' },
        { name: 'Application mobile', href: '/docs/installation/app-mobile' },
      ],
    },
    {
      title: 'Configuration',
      icon: FileText,
      links: [
        { name: 'Premiers pas', href: '#' },
        { name: 'Zones de surveillance', href: '#' },
        { name: 'Notifications', href: '#' },
        { name: 'Intégrations', href: '#' },
      ],
    },
    {
      title: 'Dépannage',
      icon: Wrench,
      links: [
        { name: 'Problèmes de connexion', href: '#' },
        { name: 'Batterie', href: '#' },
        { name: 'Fausses alertes', href: '#' },
        { name: 'Caméras', href: '#' },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title">Documentation</h1>
          <p className="section-subtitle">
            Guides complets pour installer et utiliser votre système In Situ Security
          </p>
        </div>

        {/* Notice */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-12">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Documentation complète disponible</h3>
              <p className="text-gray-700 mb-3">
                Notre documentation technique complète sera bientôt disponible en ligne.
                En attendant, consultez les guides d'installation fournis avec vos produits.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pour toute question : <a href="mailto:support@insitusecurity.fr" className="text-blue-600 hover:underline">support@insitusecurity.fr</a> ou 01 23 45 67 89
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {docCategories.map((category, idx) => (
            <div key={idx} className="card dark:bg-gray-800 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-yellow rounded-lg flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-gray-900" />
                </div>
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>
              <ul className="space-y-2">
                {category.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-yellow transition-colors text-sm"
                    >
                      → {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/support" className="card dark:bg-gray-800 p-6 hover:shadow-xl transition-shadow">
            <h3 className="font-bold text-lg mb-2">Centre d'aide</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              FAQ, guides de dépannage et support technique
            </p>
          </Link>
          <Link href="/contact" className="card dark:bg-gray-800 p-6 hover:shadow-xl transition-shadow">
            <h3 className="font-bold text-lg mb-2">Nous contacter</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Besoin d'aide personnalisée ? Notre équipe est là pour vous
            </p>
          </Link>
        </div>

        {/* Download Section */}
        <div className="mt-12 card p-8 bg-gradient-to-r from-yellow to-orange text-center">
          <h2 className="text-2xl font-bold mb-4">Guides d'installation PDF</h2>
          <p className="text-gray-900 mb-6">
            Téléchargez les guides d'installation détaillés pour chaque produit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Guide Centrale (PDF)
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Guide Caméras (PDF)
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Guide Capteurs (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
