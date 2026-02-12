'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Scan, Package, ShoppingCart, RotateCw, Trash2, X } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWebXR } from '@/hooks/useWebXR';

// Types pour les produits AR
type ARProduct = {
  id: string;
  name: string;
  category: 'camera' | 'sensor' | 'hub' | 'siren' | 'keypad';
  color: string;
  icon: string;
};

type PlacedObject = {
  id: string;
  productId: string;
  name: string;
  position: any;
  rotation: number;
  mesh?: any;
};

// Catalogue simplifié pour AR
const AR_PRODUCTS: ARProduct[] = [
  { id: 'cam-001', name: 'Caméra Intérieure', category: 'camera', color: '#3B82F6', icon: '📹' },
  { id: 'cam-002', name: 'Caméra Extérieure', category: 'camera', color: '#1E40AF', icon: '📷' },
  { id: 'sen-001', name: 'Capteur Ouverture', category: 'sensor', color: '#10B981', icon: '🚪' },
  { id: 'sen-002', name: 'Détecteur Mouvement', category: 'sensor', color: '#059669', icon: '👁️' },
  { id: 'hub-001', name: 'Centrale Alarme', category: 'hub', color: '#F59E0B', icon: '🏠' },
  { id: 'sir-001', name: 'Sirène', category: 'siren', color: '#EF4444', icon: '🔔' },
  { id: 'key-001', name: 'Clavier Code', category: 'keypad', color: '#8B5CF6', icon: '🔢' },
];

export default function ARAppPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<ARProduct | null>(null);
  const [placedObjects, setPlacedObjects] = useState<PlacedObject[]>([]);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addToCart = useCartStore(state => state.addItem);

  // Capturer les erreurs
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Error caught:', event.error);
      setError(event.error?.message || 'Unknown error');
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Erreur</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange text-white px-6 py-3 rounded-lg"
          >
            Recharger
          </button>
        </div>
      </div>
    );
  }

  // Charger Eruda pour debug mobile
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    script.onload = () => {
      (window as any).eruda?.init();
      console.log('Eruda console mobile activée');
    };
    document.head.appendChild(script);

    return () => {
      try {
        if (script.parentNode) {
          document.head.removeChild(script);
        }
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, []);

  // Utiliser le hook WebXR
  const { isSupported, isActive, startSession, placeObject: placeObjectXR, removeObject, setOnSelect } = useWebXR();

  const startAR = async () => {
    if (!canvasRef.current || !isSupported) return;

    try {
      // Configurer le callback de placement avant de démarrer
      setOnSelect(handlePlaceObject);

      await startSession(canvasRef.current);
    } catch (error) {
      console.error('Erreur démarrage AR:', error);
      alert('Impossible de démarrer l\'AR. Vérifiez que votre appareil est compatible.');
    }
  };

  const handlePlaceObject = () => {
    try {
      console.log('handlePlaceObject called, selectedProduct:', selectedProduct);

      if (!selectedProduct) {
        console.log('Aucun produit sélectionné');
        return;
      }

      const product = AR_PRODUCTS.find(p => p.id === selectedProduct.id);
      if (!product) {
        console.error('Produit non trouvé dans AR_PRODUCTS');
        return;
      }

      console.log('Placement de:', product.name);
      const placedObj = placeObjectXR(selectedProduct.id, selectedProduct.name, product.color);

      if (placedObj) {
        setPlacedObjects(prev => [...prev, placedObj]);
        console.log('Objet placé avec succès:', placedObj.name);
      } else {
        console.log('Placement échoué - reticle non visible?');
      }
    } catch (error) {
      console.error('Erreur dans handlePlaceObject:', error);
    }
  };

  const deleteObject = (id: string) => {
    try {
      const objToRemove = placedObjects.find(obj => obj.id === id);
      if (objToRemove) {
        removeObject(objToRemove);
      }
      setPlacedObjects(prev => prev.filter(obj => obj.id !== id));
    } catch (error) {
      console.error('Erreur dans deleteObject:', error);
    }
  };

  const addAllToCart = () => {
    try {
      placedObjects.forEach(obj => {
        addToCart(obj.productId, 'product');
      });
      alert(`${placedObjects.length} produit(s) ajouté(s) au panier !`);
    } catch (error) {
      console.error('Erreur dans addAllToCart:', error);
    }
  };

  if (isSupported === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Scan className="w-16 h-16 text-yellow mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Vérification compatibilité AR...</p>
        </div>
      </div>
    );
  }

  if (isSupported === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="max-w-md text-center">
          <Camera className="w-20 h-20 text-orange mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">AR non supportée</h1>
          <p className="text-gray-600 mb-6">
            Votre appareil ne supporte pas la réalité augmentée WebXR.
          </p>
          <p className="text-sm text-gray-500">
            Requis: iOS 12+ avec Safari ou Android avec ARCore
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Canvas AR */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: 'none' }}
      />

      {/* Overlay UI (DOM Overlay pour WebXR) */}
      <div id="ar-overlay" className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-none">

          {!isActive ? (
            // Écran de démarrage simplifié
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 flex items-center justify-center pointer-events-auto">
              <div className="text-center text-white px-6">
                <Camera className="w-24 h-24 mx-auto mb-6 text-yellow" />
                <h1 className="text-3xl font-bold mb-4">
                  <span className="text-orange">In Situ</span> Security AR
                </h1>

                <p className="text-sm mb-4">Sélection rapide :</p>
                <select
                  value={selectedProduct?.id || ''}
                  onChange={(e) => {
                    const prod = AR_PRODUCTS.find(p => p.id === e.target.value);
                    setSelectedProduct(prod || null);
                  }}
                  className="mb-6 px-4 py-2 rounded-lg text-gray-900 font-semibold"
                >
                  <option value="">-- Choisir un produit --</option>
                  {AR_PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>{p.icon} {p.name}</option>
                  ))}
                </select>

                <button
                  onClick={startAR}
                  disabled={!selectedProduct}
                  className="bg-yellow text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Scan className="inline w-6 h-6 mr-2" />
                  Démarrer l'AR
                </button>

                <p className="text-sm text-gray-400 mt-6">
                  Tapez sur l'écran pour placer les objets
                </p>
              </div>
            </div>
          ) : (
            // Interface AR active
            <>
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-white text-sm font-semibold">AR Active</span>
                  </div>
                  <button
                    onClick={() => window.history.back()}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Instructions centrées */}
              {placedObjects.length === 0 && !showProductMenu && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-sm text-white px-6 py-4 rounded-xl">
                    <p className="text-lg font-semibold">👇 Choisissez un produit ci-dessous</p>
                  </div>
                </div>
              )}

              {/* Menu sélection produit (bas) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                <div className="bg-white rounded-t-3xl shadow-2xl">

                  {/* Toggle menu */}
                  <button
                    onClick={() => setShowProductMenu(!showProductMenu)}
                    className="w-full py-4 flex items-center justify-center space-x-2 border-b border-gray-200"
                  >
                    <Package className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-900">
                      {selectedProduct ? selectedProduct.name : 'Choisir un produit'}
                    </span>
                    <RotateCw className={`w-4 h-4 text-gray-400 transition-transform ${showProductMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Liste produits */}
                  {showProductMenu && (
                    <div className="max-h-64 overflow-y-auto p-4 space-y-2">
                      {AR_PRODUCTS.map(product => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowProductMenu(false);
                          }}
                          className={`w-full p-4 rounded-xl flex items-center space-x-3 transition-all ${
                            selectedProduct?.id === product.id
                              ? 'bg-yellow/20 border-2 border-yellow'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                            style={{ backgroundColor: product.color + '20' }}
                          >
                            {product.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="p-4 border-t border-gray-200 space-y-3">
                    {selectedProduct && (
                      <button
                        onClick={placeObject}
                        className="w-full bg-yellow text-gray-900 py-3 rounded-xl font-bold hover:bg-orange transition-colors"
                      >
                        📍 Placer {selectedProduct.name}
                      </button>
                    )}

                    {placedObjects.length > 0 && (
                      <div className="flex space-x-2">
                        <button
                          onClick={addAllToCart}
                          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>Ajouter au panier ({placedObjects.length})</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Liste objets placés (côté droit) */}
              {placedObjects.length > 0 && (
                <div className="absolute right-4 top-20 space-y-2 pointer-events-auto">
                  {placedObjects.map(obj => (
                    <div
                      key={obj.id}
                      className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg flex items-center space-x-2"
                    >
                      <span className="text-sm font-medium text-gray-900">{obj.name}</span>
                      <button
                        onClick={() => deleteObject(obj.id)}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
