---
sidebar_position: 3
---

# Installation des capteurs

Guide pour installer les capteurs d'ouverture et détecteurs de mouvement.

## Capteur d'Ouverture

Détecte l'ouverture des portes et fenêtres.

### Contenu

- 1x Capteur principal (avec pile CR2032)
- 1x Aimant
- Adhésifs double-face
- Vis et chevilles (fixation permanente)

### Où installer ?

**Prioritaires :**
- 🚪 Porte d'entrée principale
- 🪟 Fenêtres rez-de-chaussée
- 🚪 Porte de garage
- 🪟 Baies vitrées

**Secondaires :**
- Fenêtres étages supérieurs
- Portes intérieures sensibles
- Portail jardin

### Installation étape par étape

1. **Jumelage d'abord !**
   - Ouvrez l'app > Ajouter un capteur
   - Retirez la languette de protection de la pile
   - Le capteur clignote = détecté

2. **Positionnement**
   - Capteur sur la **partie fixe** (cadre)
   - Aimant sur la **partie mobile** (porte/fenêtre)
   - **Alignement** : logos face à face
   - **Distance** : max 20mm entre capteur et aimant

3. **Fixation**

   **Option A : Adhésif (temporaire)**
   - Nettoyez les surfaces
   - Collez le capteur et l'aimant
   - Appuyez 30 secondes

   **Option B : Vis (permanent)**
   - Marquez les trous
   - Percez si nécessaire
   - Vissez les supports

4. **Test**
   - Ouvrez/fermez la porte
   - Vérifiez la notification
   - LED verte = détection OK

:::tip Astuce
Testez d'abord avec l'adhésif pour trouver le bon emplacement, puis vissez définitivement.
:::

### Réglages

Dans l'app :
- **Nom** : "Porte d'entrée", "Fenêtre salon"...
- **Mode** : Surveillance immédiate ou différée
- **Notification** : ON si accès sensible
- **Compteur** : Nombre d'ouvertures (optionnel)

## Détecteur de Mouvement PIR

Détecte les mouvements par infrarouge passif.

### Contenu

- 1x Détecteur PIR (avec pile CR123A)
- 1x Support orientable
- Adhésifs et vis

### Où installer ?

**Emplacements stratégiques :**
- 🏠 Couloir central (passage obligé)
- 🏠 Escalier
- 🏠 Salon (coin pour vue large)
- 🏠 Sous-sol/cave

**À éviter :**
- ❌ Face à une fenêtre (soleil = fausses alertes)
- ❌ Près d'une source de chaleur (radiateur, cheminée)
- ❌ Derrière un meuble
- ❌ Trop haut (> 2,5m)

### Installation

1. **Jumelage**
   - App > Ajouter un détecteur
   - Retirez la languette pile
   - Attendez la détection (LED clignote)

2. **Hauteur de fixation**
   - **Optimal** : 2-2,2 mètres du sol
   - Inclinaison légère vers le bas

3. **Orientation**
   - Angle de détection : **120°**
   - Portée : **12 mètres**
   - Privilégiez détection de **traversée** (pas face à face)

4. **Fixation**
   - Vissez ou collez le support
   - Clipsez le détecteur
   - Orientez pour couvrir la zone

5. **Test de portée**
   - Mode test (dans l'app)
   - Marchez dans la zone
   - LED clignote à chaque détection

### Réglages anti-animaux

Le détecteur ignore les animaux < 15kg par défaut.

Si vous avez un gros chien (> 15kg) :
- Montez le détecteur plus haut (2,5m)
- Inclinez davantage vers le bas
- Réduisez la sensibilité dans l'app

### Modes de détection

| Mode | Usage | Comportement |
|------|-------|--------------|
| **Permanent** | Sécurité maximale | Détection 24/7 |
| **Nuit seule** | Pendant sommeil | Actif 22h-7h |
| **Absence** | Quand vous partez | Actif quand alarme enclenchée |

## Autonomie des piles

- **Capteur d'ouverture** : 2 ans (pile CR2032)
- **Détecteur mouvement** : 1-2 ans (pile CR123A)

L'app vous prévient 2 semaines avant épuisement.

:::tip Économiser la batterie
Réduisez la fréquence de reporting dans l'app (15 min au lieu de 5 min).
:::

## Dépannage

### Fausses alertes mouvement

- Vérifiez qu'il n'y a pas de source de chaleur variable
- Éloignez des fenêtres ensoleillées
- Réduisez la sensibilité
- Mode anti-animaux activé ?

### Capteur ne détecte pas

- Vérifiez l'alignement capteur/aimant (< 20mm)
- Remplacez la pile
- Réinitialisez (bouton reset 5 sec)

### Délai de notification trop long

- Vérifiez la portée (max 100m de la centrale)
- Signal faible ? Ajoutez un répéteur
- Normal : 2-5 secondes de latence

## Prochaines étapes

- [Installer claviers et sirènes](./keypads-sirens.md)
- [Configurer les zones](../configuration/zones.md)
- [Éviter les fausses alertes](../troubleshooting/false-alarms.md)
