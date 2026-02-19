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
        <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="px-4 py-4 md:py-6 md:container md:mx-auto">
            <div className="flex flex-col gap-3">
              {/* En-tête avec icône */}
              <div className="flex items-start space-x-3">
                <Cookie className="w-6 h-6 md:w-8 md:h-8 text-orange flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-base md:text-lg mb-1 dark:text-white">
                    Cookies 🍪
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    Nous utilisons des cookies pour améliorer votre expérience.{' '}
                    <Link href="/legal/cookies" className="text-orange hover:underline inline">
                      En savoir plus
                    </Link>
                  </p>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={acceptNecessary}
                    className="flex-1 px-3 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold text-sm"
                  >
                    Refuser
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 px-3 py-2.5 bg-gradient-to-r from-orange to-yellow text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
                  >
                    Accepter
                  </button>
                </div>
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-xs flex items-center justify-center space-x-2"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Personnaliser mes préférences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de personnalisation */}
      {showSettings && (
        <div className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[80] bg-white dark:bg-gray-800 md:rounded-2xl shadow-2xl md:max-w-2xl w-full max-h-screen md:max-h-[85vh] overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6 flex items-center justify-between z-10">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Cookie className="w-5 h-5 md:w-6 md:h-6 text-orange" />
              <h2 className="text-lg md:text-2xl font-bold dark:text-white">Paramètres cookies</h2>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 dark:text-white" />
            </button>
          </div>

          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
              Personnalisez vos préférences. Vous pouvez modifier ces paramètres à tout moment.
            </p>

            {/* Cookie nécessaire */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-5">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold dark:text-white text-sm md:text-base truncate">Strictement nécessaires</h3>
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded inline-block">
                      Toujours actifs
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Essentiels au fonctionnement (panier, session, sécurité).
              </p>
            </div>

            {/* Cookie analytics */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-5">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow/10 dark:bg-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-4 h-4 md:w-5 md:h-5 text-yellow" />
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white text-sm md:text-base">Analytiques</h3>
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
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Comprendre l'utilisation du site (Google Analytics).
              </p>
            </div>

            {/* Cookie personnalisation */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-5">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white text-sm md:text-base">Personnalisation</h3>
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
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Mémorisent vos préférences (mode sombre, filtres).
              </p>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 md:p-6 flex flex-col sm:flex-row gap-2 md:gap-3">
            <button
              onClick={acceptNecessary}
              className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold text-sm"
            >
              Nécessaires uniquement
            </button>
            <button
              onClick={saveCustom}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange to-yellow text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
