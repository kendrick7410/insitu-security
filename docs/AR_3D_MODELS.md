# Améliorations AR : Modèles 3D réalistes

> **Status actuel** : L'application AR utilise des cubes simples (BoxGeometry) pour représenter les produits.
> **Objectif futur** : Remplacer par des modèles 3D réalistes pour une meilleure expérience utilisateur.

---

## 📋 Options disponibles

### 🎯 **Option 1 : Modèles 3D GLB/GLTF** (Recommandé - le plus réaliste)

#### Description
Utiliser de vrais modèles 3D au format GLB/GLTF avec textures et détails réalistes.

#### Implémentation
```typescript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

const loadModel = (modelPath: string, position: THREE.Vector3) => {
  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;

    // Ajuster la taille (les modèles peuvent être trop grands)
    model.scale.set(0.1, 0.1, 0.1);

    // Positionner
    model.position.copy(position);

    // Ajouter à la scène
    scene.add(model);

    // Optionnel : ajouter des ombres
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });
};

// Utilisation
loadModel('/models/camera.glb', reticlePosition);
```

#### Modifications nécessaires dans le code
**Fichier : `/apps/web/src/hooks/useWebXR.ts`**

```typescript
// Ajouter l'import
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Dans le hook, créer le loader
const loaderRef = useRef<GLTFLoader>(new GLTFLoader());

// Modifier la fonction placeObject
const placeObject = async (productId: string, name: string, modelPath: string): Promise<PlacedObject | null> => {
  if (!reticleRef.current || !reticleRef.current.visible || !sceneRef.current) {
    return null;
  }

  const position = new THREE.Vector3();
  position.setFromMatrixPosition(reticleRef.current.matrix);

  // Charger le modèle 3D au lieu de créer un cube
  return new Promise((resolve) => {
    loaderRef.current.load(
      `/models/${modelPath}`,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.1, 0.1, 0.1);
        model.position.copy(position);

        sceneRef.current!.add(model);

        const placedObject: PlacedObject = {
          id: Date.now().toString(),
          productId,
          name,
          position,
          rotation: 0,
          mesh: model, // Stocker le groupe au lieu du mesh
        };

        resolve(placedObject);
      },
      undefined,
      (error) => {
        console.error('Erreur chargement modèle:', error);
        resolve(null);
      }
    );
  });
};
```

**Fichier : `/apps/web/src/app/ar/app/page.tsx`**

```typescript
// Modifier l'appel pour passer le modelPath
const handlePlaceObject = () => {
  const product = AR_PRODUCTS.find(p => p.id === selectedProduct.id);
  if (!product) return;

  // Récupérer le vrai produit pour avoir le ar3DModel
  const realProduct = products.find(p => p.id === product.id);
  const modelPath = realProduct?.ar3DModel || 'default.glb';

  const placedObj = placeObjectXR(
    selectedProduct.id,
    selectedProduct.name,
    modelPath // Au lieu de color
  );
  // ...
};
```

#### Structure des fichiers
```
apps/web/public/
└── models/
    ├── camera.glb      (caméras)
    ├── sensor.glb      (capteurs)
    ├── hub.glb         (centrale)
    ├── siren.glb       (sirène)
    ├── keypad.glb      (clavier)
    └── default.glb     (fallback)
```

#### Où trouver les modèles 3D

##### 🆓 Gratuit
- **Sketchfab** : https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount
  - Filtrer par "Downloadable" + "CC License"
  - Chercher : "security camera", "motion sensor", "alarm"

- **Poly Pizza** : https://poly.pizza
  - Ancien Google Poly, modèles gratuits
  - Format GLB déjà optimisé

- **Free3D** : https://free3d.com
  - Modèles gratuits, attention à la licence

##### 💰 Payant (professionnel)
- **TurboSquid** : https://www.turbosquid.com
  - Modèles haute qualité ($10-$100 par modèle)

- **CGTrader** : https://www.cgtrader.com
  - Prix variés, bonne qualité

##### 🎨 Créer soi-même
- **Blender** (gratuit) : https://www.blender.org
  - Logiciel 3D complet
  - Export direct en GLB/GLTF
  - Courbe d'apprentissage mais très puissant

#### Avantages
- ✅ Rendu ultra-réaliste
- ✅ Textures, matériaux, détails
- ✅ Possibilité d'animations
- ✅ Format standard web (GLB/GLTF)
- ✅ Bon pour le marketing/démo

#### Inconvénients
- ❌ Fichiers plus lourds (100KB-2MB par modèle)
- ❌ Temps de chargement initial
- ❌ Coût si achat de modèles
- ❌ Ou temps si création manuelle

#### Estimation
- **Temps dev** : ~4-6h (intégration + tests)
- **Temps modèles** : Variable
  - Achat : 1-2h de recherche, ~$50-$200 total
  - Création : 3-8h par modèle (si compétences Blender)
- **Poids total** : ~500KB-2MB (tous modèles)

---

### 🔧 **Option 2 : Formes géométriques composites**

#### Description
Combiner plusieurs formes Three.js (cubes, cylindres, sphères) pour créer des représentations stylisées des produits.

#### Exemples de code

**Caméra de surveillance**
```typescript
const createCamera = (color: string) => {
  const group = new THREE.Group();

  // Corps principal
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.06, 0.04),
    new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.5,
      roughness: 0.5
    })
  );

  // Objectif
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.03),
    new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.2
    })
  );
  lens.rotation.z = Math.PI / 2;
  lens.position.z = 0.035;

  // Support
  const mount = new THREE.Mesh(
    new THREE.SphereGeometry(0.015),
    new THREE.MeshStandardMaterial({ color: 0x444444 })
  );
  mount.position.y = -0.04;

  group.add(body, lens, mount);
  return group;
};
```

**Capteur de mouvement**
```typescript
const createMotionSensor = (color: string) => {
  const group = new THREE.Group();

  // Corps
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.08, 0.03),
    new THREE.MeshStandardMaterial({ color: color })
  );

  // Lentille PIR (demi-sphère)
  const lensGeometry = new THREE.SphereGeometry(0.015, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
  const lens = new THREE.Mesh(
    lensGeometry,
    new THREE.MeshStandardMaterial({
      color: 0x331111,
      transparent: true,
      opacity: 0.8
    })
  );
  lens.position.set(0, 0.01, 0.02);

  group.add(body, lens);
  return group;
};
```

**Centrale d'alarme (Hub)**
```typescript
const createHub = (color: string) => {
  const group = new THREE.Group();

  // Boîtier
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.08, 0.04),
    new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.3,
      roughness: 0.7
    })
  );

  // Écran LCD
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.08, 0.03),
    new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      emissive: 0x004400
    })
  );
  screen.position.set(0, 0.01, 0.021);

  // Boutons
  for (let i = 0; i < 3; i++) {
    const button = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 0.003),
      new THREE.MeshStandardMaterial({ color: 0x666666 })
    );
    button.rotation.x = Math.PI / 2;
    button.position.set(-0.03 + i * 0.03, -0.02, 0.021);
    group.add(button);
  }

  group.add(box, screen);
  return group;
};
```

**Sirène**
```typescript
const createSiren = (color: string) => {
  const group = new THREE.Group();

  // Base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.06, 0.02),
    new THREE.MeshStandardMaterial({ color: 0xcccccc })
  );

  // Corps principal
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.06),
    new THREE.MeshStandardMaterial({ color: color })
  );
  body.position.y = 0.04;

  // Flash LED
  const flash = new THREE.Mesh(
    new THREE.SphereGeometry(0.015),
    new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.5
    })
  );
  flash.position.y = 0.08;

  group.add(base, body, flash);
  return group;
};
```

**Clavier à code**
```typescript
const createKeypad = (color: string) => {
  const group = new THREE.Group();

  // Plaque principale
  const plate = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.12, 0.01),
    new THREE.MeshStandardMaterial({ color: color })
  );

  // Grille de boutons (3x4)
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      const button = new THREE.Mesh(
        new THREE.BoxGeometry(0.015, 0.015, 0.005),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
      );
      button.position.set(
        -0.02 + col * 0.02,
        0.04 - row * 0.02,
        0.008
      );
      group.add(button);
    }
  }

  // Écran
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.06, 0.015),
    new THREE.MeshStandardMaterial({
      color: 0x001100,
      emissive: 0x00ff00,
      emissiveIntensity: 0.3
    })
  );
  screen.position.set(0, 0.045, 0.006);

  group.add(plate, screen);
  return group;
};
```

#### Implémentation dans useWebXR.ts

```typescript
// Fonction factory pour créer les objets selon le type
const createProductMesh = (category: string, color: string): THREE.Object3D => {
  switch (category) {
    case 'camera':
      return createCamera(color);
    case 'sensor':
      return createMotionSensor(color);
    case 'hub':
      return createHub(color);
    case 'siren':
      return createSiren(color);
    case 'keypad':
      return createKeypad(color);
    default:
      // Fallback : cube simple
      return new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshStandardMaterial({ color })
      );
  }
};

// Modifier placeObject
const placeObject = (productId: string, name: string, category: string, color: string) => {
  // ...
  const mesh = createProductMesh(category, color);
  mesh.position.copy(position);
  sceneRef.current.add(mesh);
  // ...
};
```

#### Avantages
- ✅ Aucun fichier externe nécessaire
- ✅ Très léger (code uniquement)
- ✅ Rapide à charger
- ✅ Customizable facilement (couleurs, tailles)
- ✅ Bon compromis visuel/performance

#### Inconvénients
- ❌ Moins réaliste que des vrais modèles
- ❌ Demande créativité pour chaque objet
- ❌ Limité dans les détails

#### Estimation
- **Temps dev** : ~2-3h (création formes + intégration)
- **Poids** : 0 KB (juste du code)
- **Performance** : Excellente

---

### 🖼️ **Option 3 : Sprites 2D (Billboards)**

#### Description
Afficher des images PNG avec transparence qui font toujours face à la caméra.

#### Implémentation

```typescript
const createSprite = (iconPath: string, scale: number = 0.1) => {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(iconPath);

  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false
  });

  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(scale, scale, 1);

  return sprite;
};

// Utilisation
const cameraSprite = createSprite('/icons/camera-3d.png', 0.15);
cameraSprite.position.copy(reticlePosition);
scene.add(cameraSprite);
```

#### Structure des fichiers
```
apps/web/public/
└── icons/
    ├── camera-3d.png
    ├── sensor-3d.png
    ├── hub-3d.png
    ├── siren-3d.png
    └── keypad-3d.png
```

#### Création des icônes
- **Figma/Illustrator** : Créer icônes vectorielles
- **Export PNG** : 512x512px avec transparence
- **Style** : Isométrique ou vue 3/4 pour effet 3D

#### Avantages
- ✅ Très simple à implémenter
- ✅ Léger (~10-50KB par icône)
- ✅ Facile à créer/modifier (juste des images)
- ✅ Toujours lisible (face à la caméra)

#### Inconvénients
- ❌ Pas vraiment 3D (flat)
- ❌ Ne tourne pas avec la perspective
- ❌ Moins immersif

#### Estimation
- **Temps dev** : ~30min (intégration)
- **Temps design** : ~2-3h (création icônes)
- **Poids total** : ~100-200KB

---

### 🎨 **Option 4 : Formes colorées + Labels**

#### Description
Formes géométriques simples avec couleurs spécifiques et labels texte pour identification.

#### Implémentation

```typescript
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const createLabeledObject = (
  geometry: THREE.BufferGeometry,
  color: string,
  label: string,
  icon: string
) => {
  const group = new THREE.Group();

  // Forme principale avec couleur du produit
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.3,
      roughness: 0.7
    })
  );

  // Label texte au-dessus (canvas texture)
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = 256;
  canvas.height = 64;

  context.fillStyle = '#ffffff';
  context.font = 'bold 40px Arial';
  context.textAlign = 'center';
  context.fillText(icon, 128, 45);

  const texture = new THREE.CanvasTexture(canvas);
  const labelMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true
  });

  const labelSprite = new THREE.Sprite(labelMaterial);
  labelSprite.scale.set(0.1, 0.025, 1);
  labelSprite.position.y = 0.08;

  group.add(mesh, labelSprite);
  return group;
};

// Exemples d'utilisation
const camera = createLabeledObject(
  new THREE.CylinderGeometry(0.03, 0.03, 0.06),
  '#3B82F6', // Bleu
  'Caméra',
  '📹'
);

const sensor = createLabeledObject(
  new THREE.BoxGeometry(0.06, 0.06, 0.03),
  '#10B981', // Vert
  'Capteur',
  '🚪'
);
```

#### Variante : Formes symboliques

```typescript
// Caméra = cône (représente l'objectif)
const cameraShape = new THREE.ConeGeometry(0.04, 0.08, 8);
cameraShape.rotateX(-Math.PI / 2); // Pointer vers l'avant

// Capteur = pyramide
const sensorShape = new THREE.ConeGeometry(0.05, 0.06, 4);

// Hub = boîte arrondie
const hubShape = new THREE.BoxGeometry(0.1, 0.08, 0.05);

// Sirène = dôme
const sirenShape = new THREE.SphereGeometry(0.05, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);

// Clavier = plaque
const keypadShape = new THREE.BoxGeometry(0.08, 0.12, 0.01);
```

#### Avantages
- ✅ Rapide à implémenter
- ✅ Léger (code + canvas)
- ✅ Visuellement propre
- ✅ Couleurs de marque respactées
- ✅ Identification facile (icône + couleur)

#### Inconvénients
- ❌ Abstrait
- ❌ Pas de détails réalistes

#### Estimation
- **Temps dev** : ~1-2h
- **Poids** : ~0 KB (généré dynamiquement)
- **Performance** : Excellente

---

## 📊 Tableau comparatif

| Critère | GLB/GLTF | Géométries | Sprites | Colorées |
|---------|----------|------------|---------|----------|
| **Réalisme** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Performance** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Facilité** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Poids** | ❌ 500KB-2MB | ✅ 0 KB | ✅ ~100KB | ✅ 0 KB |
| **Temps dev** | ⏱️ 4-6h | ⏱️ 2-3h | ⏱️ 30min | ⏱️ 1-2h |
| **Coût** | 💰 $50-200 | ✅ Gratuit | ✅ Gratuit | ✅ Gratuit |
| **Maintenance** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Marketing** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |

---

## 🎯 Recommandation par phase

### Phase 1 : MVP amélioré (maintenant)
**Option 2 ou 4** : Formes géométriques composites ou colorées
- Rapide à implémenter (1-3h)
- Amélioration visuelle immédiate
- Aucun coût
- Bon pour tests utilisateurs

### Phase 2 : Version pro (après validation)
**Option 1** : Modèles GLB/GLTF réalistes
- Investir dans des vrais modèles 3D
- Meilleur rendu pour démos commerciales
- Différenciation concurrentielle
- ROI sur l'image de marque

### Alternative hybride
Combiner **Option 4** (base) + **Option 1** (chargement progressif)
```typescript
// Afficher forme colorée immédiatement
const placeholder = createLabeledObject(geometry, color, icon);
scene.add(placeholder);

// Charger le vrai modèle en arrière-plan
loader.load('/models/camera.glb', (gltf) => {
  scene.remove(placeholder);
  scene.add(gltf.scene);
});
```

---

## 📝 Notes d'implémentation

### Configuration Three.js pour meilleur rendu

```typescript
// Améliorer l'éclairage
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 2, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Activer les ombres sur le renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Améliorer le tone mapping
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
```

### Optimisation des performances

```typescript
// Limiter le nombre d'objets affichés
const MAX_OBJECTS = 10;

// Utiliser des LOD (Level of Detail)
const lod = new THREE.LOD();
lod.addLevel(highDetailMesh, 0);
lod.addLevel(mediumDetailMesh, 2);
lod.addLevel(lowDetailMesh, 5);

// Disposer les objets supprimés
const removeObject = (object: PlacedObject) => {
  if (object.mesh) {
    scene.remove(object.mesh);

    // Libérer la mémoire
    object.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }
};
```

---

## 🚀 Prochaines étapes

Quand tu décides d'implémenter une option :

1. **Choisir l'option** selon phase du projet
2. **Créer une branche** : `git checkout -b feature/ar-3d-models`
3. **Implémenter** selon le code ci-dessus
4. **Tester** sur plusieurs appareils (iPhone, Android)
5. **Optimiser** les performances si nécessaire
6. **Merger** dans master

---

**Créé le** : 2026-02-12
**Dernière mise à jour** : 2026-02-12
**Status** : 📋 Documentation pour implémentation future
