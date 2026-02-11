# InSitu Security - Monorepo

Système complet de site e-commerce pour équipements de sécurité connectés avec visualisation AR.

## 🏗️ Architecture

Ce monorepo contient 3 applications :

- **apps/web** : Site marketing Next.js 14 (App Router)
- **apps/docs** : Documentation technique Docusaurus
- **apps/ar** : Application WebAR de visualisation 3D

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Installer pnpm si nécessaire
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

### apps/web - Site Next.js

Site e-commerce avec :
- Catalogue produits et packs
- Panier d'achat (Zustand + localStorage)
- Visualisation AR
- Pages support/maintenance/contact
- Design responsive (Tailwind CSS)

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
- `/ar` - Visualisation AR
- `/maintenance` - Plans de maintenance
- `/support` - Centre d'aide
- `/docs` - Documentation technique

### apps/docs - Documentation Docusaurus

Documentation technique avec :
- Guides d'installation par produit
- Troubleshooting
- API et intégrations
- FAQ technique

### apps/ar - WebAR Application

Application WebXR existante pour placement 3D :
- Détection de surfaces AR
- Placement et manipulation d'objets 3D
- Sauvegarde de configuration

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

## 📱 Mobile & HTTPS

**WebAR nécessite :**
- HTTPS en production
- ARCore (Android 7.0+) ou ARKit (iOS 11+)
- Permissions caméra

Pour tester en local sur mobile :
1. Utiliser ngrok ou similaire pour HTTPS
2. Ou déployer sur environnement staging avec HTTPS

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
│   ├── web/           # Next.js marketing site
│   │   ├── src/
│   │   │   ├── app/           # Pages Next.js App Router
│   │   │   ├── components/    # Composants React
│   │   │   ├── data/          # Produits et types
│   │   │   ├── store/         # Zustand stores
│   │   │   └── lib/           # Utilitaires
│   │   ├── public/            # Assets statiques
│   │   └── package.json
│   ├── docs/          # Docusaurus
│   │   └── package.json
│   └── ar/            # WebAR app
│       └── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── README.md
```

## 🚢 Déploiement

### Next.js (Vercel recommandé)

```bash
cd apps/web
vercel
```

**Variables d'environnement :**
- `NEXT_PUBLIC_AR_APP_URL` - URL de l'app AR en production

### Docusaurus (Vercel/Netlify)

```bash
cd apps/docs
pnpm build
# Déployer le dossier build/
```

### WebAR App

Déployer sur serveur avec HTTPS. Doit être accessible depuis le domaine principal ou un sous-domaine.

## 🔧 Configuration

### Ajouter un nouveau produit

Éditer `/apps/web/src/data/products.ts` :

```typescript
{
  id: 'prod-xxx',
  slug: 'mon-produit',
  name: 'Mon Produit',
  category: 'camera',
  price: 99.99,
  shortDescription: '...',
  features: ['...'],
  images: ['/images/mon-produit.jpg'],
  ar3DModel: 'model.glb', // optionnel
}
```

### Ajouter un nouveau pack

Éditer `/apps/web/src/data/packs.ts` :

```typescript
{
  id: 'pack-xxx',
  slug: 'mon-pack',
  name: 'Mon Pack',
  products: ['prod-1', 'prod-2'], // IDs des produits
  price: 199.99,
  discount: 15,
  description: '...',
  features: ['...'],
  image: '/images/mon-pack.jpg',
}
```

## 🐛 Troubleshooting

**Le panier ne persiste pas :**
- Vérifier que le client autorise localStorage
- Regarder la console pour erreurs Zustand

**L'AR ne se lance pas :**
- Vérifier que l'app AR tourne sur port 8080
- Vérifier les rewrites dans `next.config.js`
- En production, s'assurer d'avoir HTTPS

**Hot reload lent :**
- Turbo cache peut nécessiter un clean : `pnpm clean`
- Redémarrer les dev servers

## 📄 Licence

Propriétaire - InSitu Security © 2025

## 👥 Support

- Email : contact@insitusecurity.fr
- Téléphone : 01 23 45 67 89
- Documentation : http://localhost:3001 (en dev)
