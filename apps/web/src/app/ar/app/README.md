# 📱 In Situ Security - App AR WebXR

Application de réalité augmentée pour visualiser et placer les équipements de sécurité In Situ dans votre environnement réel.

## 🎯 Fonctionnalités

### Pour l'utilisateur
- ✅ **Visualisation AR** : Voir les produits en taille réelle dans son environnement
- ✅ **Placement intelligent** : Hit-test sur surfaces réelles (sol, murs, tables)
- ✅ **Catalogue intégré** : Tous les produits du site disponibles en AR
- ✅ **Manipulation** : Déplacer, tourner les objets placés
- ✅ **Configuration** : Placer plusieurs produits simultanément
- ✅ **Panier direct** : Ajouter la configuration au panier en un clic
- ✅ **Interface simple** : UI mobile optimisée avec DOM overlay

### Produits disponibles
- 📹 **Caméras** : Intérieure HD, Extérieure 4K
- 🚪 **Capteurs** : Ouverture, Détecteur mouvement PIR
- 🏠 **Centrale** : Hub d'alarme connecté
- 🔔 **Sirène** : Extérieure avec flash
- 🔢 **Clavier** : Code + badges RFID

## 🛠️ Stack Technique

- **WebXR Device API** : Session immersive-ar avec hit-test
- **Three.js** : Rendu 3D (scène, caméra, objets)
- **Next.js 14** : App Router, composant client
- **Zustand** : State management (panier partagé)
- **Tailwind CSS** : UI responsive
- **TypeScript** : Type safety

## 📋 Compatibilité

### Mobile requis
- ✅ **iOS** : iPhone 6s+ avec iOS 12+ (ARKit)
- ✅ **Android** : 7.0+ avec ARCore compatible
- ✅ **Navigateur** : Safari (iOS) ou Chrome (Android)

### Non supporté
- ❌ Desktop (WebXR AR uniquement mobile)
- ❌ Anciens smartphones sans ARCore/ARKit

## 🚀 Utilisation

### 1. Accès
```
URL: /ar/app (sur mobile uniquement)
Détection automatique : modal avertissement sur desktop
```

### 2. Démarrage
1. Cliquer "Démarrer l'expérience AR"
2. Autoriser l'accès caméra
3. Scanner l'environnement (pointer vers le sol)
4. Attendre détection surface (reticle orange apparaît)

### 3. Placement
1. Choisir un produit (menu bas)
2. Cliquer "Placer [produit]"
3. Pointer vers surface désirée
4. Tap pour confirmer placement
5. Répéter pour placer d'autres produits

### 4. Gestion
- **Supprimer** : Cliquer icône poubelle sur objet (liste droite)
- **Ajouter au panier** : Bouton "Ajouter au panier (X)" en bas
- **Quitter** : Bouton X en haut à droite

## 🏗️ Architecture

### Structure fichiers
```
/ar/app/
  ├── page.tsx          # Composant principal AR
  ├── README.md         # Cette doc

/hooks/
  └── useWebXR.ts       # Hook WebXR + Three.js

/store/
  └── cart.ts           # Zustand store (partagé)
```

### Composant principal (`page.tsx`)
```tsx
- État UI : menus, sélection, objets placés
- Détection support WebXR
- Interface DOM overlay
- Intégration panier
```

### Hook WebXR (`useWebXR.ts`)
```tsx
- Init Three.js (scene, camera, renderer)
- Session WebXR immersive-ar
- Hit-test pour placement
- Gestion objets 3D
- Cleanup proper
```

## 🎨 Design

### UI/UX Principes
- **Minimal** : Pas de surcharge visuelle
- **Intuitif** : Instructions contextuelles
- **Mobile-first** : Touch optimisé
- **Feedback** : États visuels clairs
- **Performance** : 60 FPS constant

### Couleurs
- Orange (#F5A000) : Reticle, CTA
- Blanc/Noir : UI overlay
- Couleurs produits : Identification rapide

## 🔧 Développement

### Installation
```bash
cd apps/web
pnpm install  # Installe three + @types/three
```

### Dev local
```bash
pnpm dev
# Ouvrir sur smartphone : http://[IP-LOCAL]:3000/ar/app
# Note: HTTPS requis pour WebXR → utiliser ngrok ou tunnel
```

### Build production
```bash
pnpm build
# Déployer sur Netlify (HTTPS automatique)
```

## 🐛 Debug

### Problèmes courants

**"AR non supportée"**
- Vérifier smartphone compatible ARCore/ARKit
- Utiliser navigateur natif (Safari iOS / Chrome Android)
- Pas WebView ou navigateur tiers

**"Impossible de démarrer l'AR"**
- Autoriser accès caméra
- Vérifier HTTPS (requis pour WebXR)
- Recharger page

**"Reticle ne s'affiche pas"**
- Déplacer téléphone lentement
- Pointer vers surface plane (sol, table)
- Améliorer éclairage de la pièce

**"Objets mal placés"**
- Améliorer détection surface (scanner plus)
- Vérifier échelle (0.1m = 10cm cube)
- Réinitialiser session AR

## 📊 Améliorations futures

### V1.1
- [ ] Modèles 3D réalistes (GLB/GLTF)
- [ ] Échelle ajustable par produit
- [ ] Rotation manuelle des objets
- [ ] Snapshot/screenshot configuration

### V1.2
- [ ] Sauvegarde configuration cloud
- [ ] Partage configuration (QR/lien)
- [ ] Mesures distance AR
- [ ] Guides placement intelligent

### V2.0
- [ ] Mode multi-utilisateur (collaboratif)
- [ ] IA suggestion placement optimal
- [ ] Export plan 2D depuis AR
- [ ] Estimation installation pro

## 📝 Notes développeur

### Performance
- Garder scène simple (< 50 objets)
- Dispose geometry/material après suppression
- Utiliser BufferGeometry pour optimisation
- Throttle events touch si nécessaire

### Sécurité
- Valider produits côté serveur avant panier
- Pas de données sensibles dans scene
- Cleanup proper session end

### Accessibilité
- Instructions texte claires
- Feedback haptique (vibrations)
- Contraste UI suffisant
- Taille touch targets (44px min)

## 🎓 Ressources

- [WebXR Device API](https://www.w3.org/TR/webxr/)
- [Three.js Docs](https://threejs.org/docs/)
- [ARCore Supported Devices](https://developers.google.com/ar/devices)
- [ARKit iOS](https://developer.apple.com/augmented-reality/)

---

**Créé avec ❤️ pour In Situ Security**
