import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-9xl font-bold text-yellow mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page introuvable</h2>
        <p className="text-xl text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center">
          <Home className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
