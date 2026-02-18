import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">In Situ Security</h3>
            <p className="text-sm mb-4">
              Votre partenaire pour une sécurité connectée accessible à tous.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+3223547318" className="hover:text-yellow">
                  +32 (0) 2 354 73 18
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@insitusecurity.be" className="hover:text-yellow">
                  contact@insitusecurity.be
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Grez-Doiceau, Belgique</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Produits</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=camera" className="hover:text-yellow transition-colors">
                  Caméras
                </Link>
              </li>
              <li>
                <Link href="/products?category=sensor" className="hover:text-yellow transition-colors">
                  Capteurs
                </Link>
              </li>
              <li>
                <Link href="/products?category=hub" className="hover:text-yellow transition-colors">
                  Centrales
                </Link>
              </li>
              <li>
                <Link href="/packs" className="hover:text-yellow transition-colors">
                  Packs complets
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="hover:text-yellow transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-yellow transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/maintenance" className="hover:text-yellow transition-colors">
                  Plans de maintenance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow transition-colors">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-yellow transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-yellow transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-yellow transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="hover:text-yellow transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} In Situ Security. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
