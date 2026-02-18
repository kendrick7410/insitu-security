'use client';

import { Eye, Smartphone, Maximize, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ARPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showDesktopWarning, setShowDesktopWarning] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      return mobileKeywords.some(keyword => userAgent.includes(keyword));
    };
    setIsMobile(checkMobile());
  }, []);

  const handleARLaunch = () => {
    if (!isMobile) {
      setShowDesktopWarning(true);
      return;
    }
    // On mobile, redirect to AR app
    window.location.href = process.env.NODE_ENV === 'development' ? '/ar-app/' : '/ar/app';
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Eye className="w-20 h-20 text-yellow mx-auto mb-6" />
          <h1 className="section-title dark:text-white">Visualisation en Réalité Augmentée</h1>
          <p className="section-subtitle dark:text-gray-300">
            Placez virtuellement nos équipements de sécurité chez vous avant d'acheter
          </p>
        </div>

        {/* How it works */}
        <div className="card dark:bg-gray-800 p-8 mb-8 dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Comment ça marche ?</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 dark:text-white dark:text-white">Ouvrez sur votre smartphone</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  L'expérience AR nécessite un smartphone Android (ARCore) ou iOS (ARKit)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Scannez votre espace</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Pointez votre caméra vers le sol et déplacez-vous lentement pour détecter les surfaces
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Placez vos équipements</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choisissez un produit et tapez sur une surface pour le placer. Ajustez la position et l'angle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card dark:bg-gray-800 p-6">
            <Smartphone className="w-10 h-10 text-yellow mb-4" />
            <h3 className="font-bold text-lg mb-2 dark:text-white">Compatible avec</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• iPhone 6s et versions ultérieures (iOS 11+)</li>
              <li>• Android 7.0+ avec ARCore</li>
              <li>• Connexion HTTPS requise</li>
            </ul>
          </div>

          <div className="card dark:bg-gray-800 p-6">
            <Maximize className="w-10 h-10 text-yellow mb-4" />
            <h3 className="font-bold text-lg mb-2 dark:text-white">Fonctionnalités</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Placement précis sur les surfaces</li>
              <li>• Rotation et ajustement de taille</li>
              <li>• Plusieurs objets simultanés</li>
              <li>• Sauvegarde de votre configuration</li>
            </ul>
          </div>
        </div>

        {/* Launch Button */}
        <div className="card dark:bg-gray-800 p-8 text-center bg-gradient-to-r from-yellow to-orange">
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-gray-900 mb-6">
            {isMobile
              ? "Cliquez sur le bouton ci-dessous pour lancer l'expérience AR"
              : "Ouvrez cette page sur votre smartphone pour lancer l'expérience AR"
            }
          </p>
          <button
            onClick={handleARLaunch}
            className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Lancer l'expérience AR
          </button>
        </div>

        {/* Desktop Warning Modal */}
        {showDesktopWarning && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="w-16 h-16 text-orange" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                Expérience AR uniquement sur mobile
              </h3>
              <p className="text-gray-700 text-center mb-6">
                La réalité augmentée nécessite un smartphone équipé d'ARCore (Android) ou ARKit (iOS).
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Pour accéder à l'expérience AR :
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>📱 Scannez le QR code avec votre smartphone</li>
                  <li>📧 Ou envoyez-vous le lien par email</li>
                  <li>💬 Ou copiez l'URL dans votre navigateur mobile</li>
                </ul>
              </div>
              <button
                onClick={() => setShowDesktopWarning(false)}
                className="btn-primary w-full mt-6"
              >
                J'ai compris
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
