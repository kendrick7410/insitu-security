'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Toujours true, non modifiable
    analytics: false,
    personalization: false,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Attendre 1 seconde avant d'afficher le bandeau pour une meilleure UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Charger les préférences sauvegardées
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        console.error('Error parsing cookie preferences', e);
      }
    }
  }, []);

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);

    // Ici, vous pourriez initialiser Google Analytics, etc. selon les préférences
    if (prefs.analytics) {
      console.log('Analytics enabled');
      // window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      personalization: true,
    });
  };

  const acceptNecessary = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      personalization: false,
    });
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay sombre */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 z-[70]"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Bandeau principal */}
      {!showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4 flex-1">
                <Cookie className="w-8 h-8 text-orange flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2 dark:text-white">
                    Nous utilisons des cookies 🍪
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser
                    le trafic du site et personnaliser le contenu. En cliquant sur "Accepter tout",
                    vous consentez à notre utilisation des cookies.
                  </p>
                  <Link
                    href="/legal/cookies"
                    className="text-sm text-orange hover:underline"
                  >
                    En savoir plus sur notre politique de cookies
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold text-sm flex items-center justify-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Personnaliser</span>
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold text-sm"
                >
                  Nécessaires uniquement
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-gradient-to-r from-orange to-yellow text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
                >
                  Accepter tout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de personnalisation */}
      {showSettings && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[80] bg-white dark:bg-gray-800 md:rounded-2xl shadow-2xl max-w-2xl w-full md:max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cookie className="w-6 h-6 text-orange" />
              <h2 className="text-2xl font-bold dark:text-white">Paramètres des cookies</h2>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 dark:text-white" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Personnalisez vos préférences en matière de cookies. Vous pouvez modifier ces paramètres
              à tout moment.
            </p>

            {/* Cookie nécessaire */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white">Cookies strictement nécessaires</h3>
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      Toujours actifs
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ces cookies sont essentiels au fonctionnement du site (panier, session, sécurité).
                Ils ne peuvent pas être désactivés.
              </p>
            </div>

            {/* Cookie analytics */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow/10 dark:bg-yellow/20 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-yellow" />
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white">Cookies analytiques</h3>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange/20 dark:peer-focus:ring-orange/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nous aident à comprendre comment vous utilisez le site pour l'améliorer (Google Analytics).
              </p>
            </div>

            {/* Cookie personnalisation */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white">Cookies de personnalisation</h3>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.personalization}
                    onChange={(e) =>
                      setPreferences({ ...preferences, personalization: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange/20 dark:peer-focus:ring-orange/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mémorisent vos préférences (mode sombre, filtres, langue) pour améliorer votre expérience.
              </p>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={acceptNecessary}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              Nécessaires uniquement
            </button>
            <button
              onClick={saveCustom}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange to-yellow text-white rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              Enregistrer mes préférences
            </button>
          </div>
        </div>
      )}
    </>
  );
}
