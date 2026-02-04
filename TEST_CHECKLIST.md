# 🧪 TEST CHECKLIST - IN SITU SECURITY (Palier 1)

## ✅ BUGS CORRIGÉS AVANT CE TEST
- 🔴 **userData overwrite** → Flag isFallback maintenant préservé
- 🔴 **Delete place un objet** → Conflict UI/XR résolu
- 🔴 **Objets invisibles** → Cubes 30cm colorés
- 🔴 **Cache rescale objets** → Flag preservé au clonage
- ⚠️  **Alert debug** → Retiré

---

## 📋 CHECKLIST DE TEST RAPIDE (10 min)

### 1️⃣ DÉMARRAGE (2 min)
- [ ] Start button lance l'AR
- [ ] Croix bleue visible au centre
- [ ] Panneau catalogue en bas avec 5 icônes
- [ ] Message "Aim at wall/floor & tap to place"

### 2️⃣ PLACEMENT SOL (2 min)
- [ ] Regarde le sol → Rond vert apparaît
- [ ] Tap → **GROS CUBE ROUGE** apparaît (Camera)
- [ ] Flash vert lors du placement
- [ ] Change dans catalogue → **Sensor** (vert)
- [ ] Tap → **CUBE VERT** apparaît
- [ ] Place 3-4 objets différents au sol

### 3️⃣ PLACEMENT MUR (2 min)
- [ ] Lève téléphone vers mur
- [ ] Pas de rond vert (normal)
- [ ] **Tap quand même** → Cube apparaît devant toi
- [ ] Approche du mur → Cube est bien sur/près du mur
- [ ] Place 2-3 objets sur différents murs

### 4️⃣ SÉLECTION & INSPECTOR (2 min)
- [ ] Tap sur un cube placé → Inspector apparaît
- [ ] Nom de l'objet affiché
- [ ] **Rotation slider** → Cube tourne en temps réel
- [ ] **Scale slider** → Cube grandit/rétrécit
- [ ] Change nom → Nouveau nom sauvegardé
- [ ] Ferme inspector (X) → Inspector disparaît

### 5️⃣ ACTIONS OBJETS (2 min)
- [ ] Sélectionne objet → **Delete** → Objet disparaît (PAS de nouvel objet!)
- [ ] Sélectionne objet → **Duplicate** → Copie apparaît à côté
- [ ] Sélectionne objet → **Move** → Tap surface → Objet déplacé
- [ ] Ouvre **Liste** (📋) → Tous les objets listés
- [ ] Tap objet dans liste → Objet sélectionné
- [ ] **Clear All** → Tous les objets supprimés

---

## 🎯 RÉSULTATS ATTENDUS

### ✅ CE QUI DOIT MARCHER
1. **Placement**: Cubes 30cm colorés (rouge, vert, bleu, magenta, jaune)
2. **Sol ET Mur**: Placement fonctionne des deux façons
3. **Sélection**: Tap objet → Inspector
4. **Rotation/Scale**: Sliders fonctionnent en temps réel
5. **Delete**: Supprime SANS placer un nouvel objet
6. **Duplicate**: Crée copie à côté
7. **Move**: Déplace objet vers nouvelle position
8. **Liste**: Affiche tous les objets placés
9. **Compteur**: "Placed Objects (X)" s'incrémente
10. **Clear All**: Tout supprimer avec confirmation

### ⚠️ LIMITATIONS CONNUES
- **Modèles GLB**: Ne chargent pas → Cubes colorés fallback (OK pour test)
- **Mur détection**: Marche mieux sur murs texturés/éclairés
- **Mode mur**: Place à 1.5m fixe si pas de surface détectée

---

## 🐛 SI PROBLÈMES

### Objets ne s'affichent pas
- Vérifie le compteur "Placed Objects" s'incrémente
- Regarde AUTOUR de toi (objets peut-être derrière)
- Vérifie flash vert apparaît (= objet placé)

### Delete place un objet
- **DEVRAIT ÊTRE CORRIGÉ!** Si ça arrive encore:
  - Attends 0.5sec entre clic Delete et prochain tap
  - Copie le nouveau log et envoie-moi

### Objets trop petits
- **DEVRAIT ÊTRE CORRIGÉ!** Cubes = 30cm maintenant
- Si petits cubes réapparaissent, copie log

### Inspector ne s'ouvre pas
- Assure-toi de taper DIRECTEMENT sur le cube
- Pas sur le catalogue en même temps

---

## 📊 APRÈS LE TEST

Envoie-moi:
1. ✅ **Checklist complétée** (ce qui marche / ne marche pas)
2. 📋 **Log complet** (si problèmes)
3. 📸 **Screenshot** de l'app en AR (optionnel)
4. 💬 **Feedback général**

---

## 🚀 STATUT ACTUEL
**Version**: Palier 1 - v1.0
**Dernière mise à jour**: Bug userData + UI conflicts corrigés
**Prêt pour test**: ✅ OUI

**Rafraîchis la page et teste!** 💪
