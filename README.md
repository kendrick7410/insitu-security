# InSitu Security - Monorepo

Système complet de site e-commerce pour équipements de sécurité connectés avec visualisation AR.

## 🏗️ Architecture

Ce monorepo contient 3 applications :

- **apps/web** : Site marketing Next.js 14 (App Router) - **PORT 3000**
- **apps/docs** : Documentation technique Docusaurus - **PORT 3001**
- **apps/ar** : Application WebAR de visualisation 3D - **PORT 8080**

## 🚀 Démarrage rapide

### Prérequis

- **Node.js 18+** (20+ recommandé pour Docusaurus)
- **pnpm 8+**

### Installation

```bash
# Installer pnpm si nécessaire (méthode standalone)
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc

# Ou via npm
npm install -g pnpm

# Installer les dépendances
pnpm install
```

### Développement

```bash
# Lancer toutes les apps en parallèle
pnpm dev

# Ou lancer individuellement
pnpm --filter web dev          # Next.js sur http://localhost:3000
pnpm --filter docs dev         # Docusaurus sur http://localhost:3001
pnpm --filter ar dev           # WebAR sur http://localhost:8080
```

**Note:** Docusaurus nécessite Node.js 20+. Si vous utilisez Node 18, seuls le site web et l'app AR fonctionneront.

### Build

```bash
# Build toutes les apps
pnpm build

# Build individuel
pnpm --filter web build
pnpm --filter docs build
pnpm --filter ar build
```

## 📦 Applications

### apps/web - Site Next.js ✅ **EN LIGNE**

Site e-commerce avec :
- ✅ **Logo InSitu Security** intégré
- ✅ **Catalogue produits** (7 produits : caméras, capteurs, centrale, sirène, clavier)
- ✅ **Packs complets** (3 packs avec réductions -15% à -25%)
- ✅ **Panier d'achat** avec Zustand + localStorage (persiste entre sessions)
- ✅ **Pages produits individuelles** avec détails complets
- ✅ **Système de paiement par facture** (envoi sous 24h, virement 30 jours)
- ✅ **Page AR** d'information sur la visualisation
- ✅ **Plans de maintenance** (Gratuit, Premium, Pro)
- ✅ **Support** et **Contact**
- ✅ Design responsive, couleurs jaune/orange, Tailwind CSS

**Stack technique :**
- Next.js 14 (App Router, TypeScript)
- Zustand pour state management
- Tailwind CSS
- Lucide React pour icônes

**URLs principales :**
- `/` - Accueil
- `/products` - Catalogue produits
- `/packs` - Packs complets
- `/cart` - Panier
- `/checkout` - Commande (paiement par facture)
- `/ar` - Visualisation AR
- `/maintenance` - Plans de maintenance
- `/support` - Centre d'aide
- `/docs` - Documentation technique

### apps/docs - Documentation Docusaurus

Documentation technique avec :
- ✅ **Guides d'installation** : Centrale, caméras, capteurs, claviers/sirènes, app mobile
- ✅ **Configuration** : Démarrage, zones, notifications, intégrations (Google Home, Alexa, HomeKit, IFTTT, API)
- ✅ **Dépannage complet** : Connexion, batteries, fausses alertes, problèmes caméras
- ✅ **Maintenance** : Routines, remplacement piles, tests
- ✅ **FAQ** exhaustive

### apps/ar - Application WebAR

Application WebXR existante pour placement 3D :
- ✅ Détection de surfaces AR
- ✅ Placement et manipulation d'objets 3D
- ✅ Sauvegarde de configuration
- ✅ Modèles 3D : camera.glb, sensor.glb, hub.glb, siren.glb, keypad.glb

**Important :** L'app AR doit tourner sur `localhost:8080` pour l'intégration avec Next.js en dev.

## 🔗 Intégration AR

En développement, Next.js redirige `/ar-app/*` vers `http://localhost:8080/*` via rewrites.

Pour tester :
1. Lancer l'app AR : `pnpm --filter ar dev`
2. Lancer le site : `pnpm --filter web dev`
3. Accéder à http://localhost:3000/ar

## 🎨 Design System

**Couleurs principales :**
- Jaune : `#FFA500`
- Orange : `#FF8C00`
- Gris : `#F9FAFB` (backgrounds)

**Classes Tailwind custom :**
- `.btn-primary` - Bouton principal (jaune)
- `.btn-secondary` - Bouton secondaire (blanc bordure)
- `.card` - Carte avec ombre
- `.section-title` - Titre de section
- `.section-subtitle` - Sous-titre de section

## 🚀 Déploiement sur Netlify

### Option 1 : Déploiement depuis l'interface Netlify (RECOMMANDÉ)

1. **Connecte-toi sur [Netlify](https://app.netlify.com)**

2. **Importe ton projet depuis GitHub**
   - Clique sur "Add new site" > "Import an existing project"
   - Connecte ton compte GitHub
   - Sélectionne le repo `kendrick7410/insitu-security`
   - Sélectionne la branche `master`

3. **Configure le build pour le site web (apps/web)**

   **Build settings :**
   ```
   Base directory: apps/web
   Build command: npm run build
   Publish directory: apps/web/.next
   ```

   **OU utilise `netlify.toml` (déjà configuré)**

4. **Variables d'environnement** (optionnel)
   ```
   NEXT_PUBLIC_AR_APP_URL=https://votre-app-ar.netlify.app
   ```

5. **Deploy !**
   - Clique sur "Deploy site"
   - Netlify build et déploie automatiquement
   - Tu obtiendras une URL type : `https://random-name-123.netlify.app`

6. **Configure ton domaine personnalisé** (optionnel)
   - Site settings > Domain management
   - Add custom domain

### Option 2 : Déploiement CLI Netlify

```bash
# Installe Netlify CLI
npm install -g netlify-cli

# Connecte-toi
netlify login

# Depuis la racine du projet
netlify init

# Configure :
# - Base directory: apps/web
# - Build command: npm run build
# - Publish directory: apps/web/.next

# Deploy
netlify deploy --prod
```

### Déployer les 3 apps séparément

**Site web (apps/web) :**
```bash
netlify deploy --dir=apps/web/.next --prod
```

**Documentation (apps/docs) :**
```bash
cd apps/docs
npm run build
netlify deploy --dir=build --prod
```

**WebAR (apps/ar) :**
```bash
cd apps/ar
# Créer un build static si besoin
netlify deploy --dir=. --prod
```

## 📱 Mobile & HTTPS

**WebAR nécessite :**
- HTTPS en production (Netlify le fournit automatiquement ✅)
- ARCore (Android 7.0+) ou ARKit (iOS 11+)
- Permissions caméra

## 🛠️ Scripts disponibles

```bash
pnpm dev           # Lancer toutes les apps
pnpm build         # Builder toutes les apps
pnpm lint          # Linter toutes les apps
pnpm format        # Formatter avec Prettier
pnpm clean         # Nettoyer node_modules et builds
```

## 📂 Structure

```
insitusecurity/
├── apps/
│   ├── web/           # Next.js marketing site (48+ fichiers)
│   │   ├── src/
│   │   │   ├── app/           # Pages Next.js App Router
│   │   │   ├── components/    # Composants React
│   │   │   ├── data/          # Produits et types
│   │   │   ├── store/         # Zustand stores
│   │   │   └── lib/           # Utilitaires
│   │   ├── public/
│   │   │   └── images/
│   │   │       └── logo.png   # Logo InSitu Security
│   │   └── package.json
│   ├── docs/          # Docusaurus (20+ guides)
│   │   └── package.json
│   └── ar/            # WebAR app
│       └── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── netlify.toml       # Config Netlify
├── package.json
└── README.md
```

## 🔧 Configuration Netlify

Le fichier `netlify.toml` à la racine configure le déploiement :

```toml
[build]
  base = "apps/web"
  command = "npm run build"
  publish = "apps/web/.next"

[[redirects]]
  from = "/ar-app/*"
  to = "https://votre-app-ar.netlify.app/:splat"
  status = 200
```

## 📊 Catalogue produits

**7 Produits :**
- Caméra Intérieure HD (79,99€)
- Caméra Extérieure 4K (149,99€)
- Capteur d'Ouverture (24,99€)
- Détecteur de Mouvement PIR (34,99€)
- Centrale d'Alarme (199,99€)
- Sirène Extérieure (89,99€)
- Clavier à Code (49,99€)

**3 Packs :**
- Pack Starter - 299,99€ (-15%)
- Pack Family - 549,99€ (-20%)
- Pack Pro - 899,99€ (-25%)

## 💳 Système de paiement

**Paiement par facture :**
- Facture envoyée par email sous 24h
- Paiement par virement bancaire (RIB inclus)
- Délai de paiement : 30 jours
- Expédition après réception du paiement
- Possibilité de payer par chèque

## 🐛 Troubleshooting

### Le panier ne persiste pas
- Vérifier que le client autorise localStorage
- Regarder la console pour erreurs Zustand

### L'AR ne se lance pas
- Vérifier que l'app AR tourne sur port 8080
- Vérifier les rewrites dans `next.config.js`
- En production, s'assurer d'avoir HTTPS

### Hot reload lent
- Turbo cache peut nécessiter un clean : `pnpm clean`
- Redémarrer les dev servers

### Docusaurus ne démarre pas
- Nécessite Node.js 20+
- Upgrade Node ou skip docs en dev

## 📄 Licence

Propriétaire - InSitu Security © 2025

## 👥 Support

- Email : contact@insitusecurity.fr
- Téléphone : 01 23 45 67 89
- Documentation : https://docs.insitusecurity.fr

## 🎯 Statut du projet

- ✅ Site web Next.js complet et fonctionnel
- ✅ Logo intégré
- ✅ Paiement par facture configuré
- ✅ Documentation Docusaurus complète
- ✅ App WebAR intégrée
- ✅ Git repository à jour sur GitHub
- 🚀 **Prêt pour déploiement Netlify !**
