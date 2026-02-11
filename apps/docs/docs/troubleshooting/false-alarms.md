---
sidebar_position: 3
---

# Fausses alertes

Solutions pour éviter et corriger les fausses alertes.

## Détecteur de mouvement

### Déclenchements intempestifs

**Animaux domestiques**

✅ **Si petit animal (< 15kg)**
- Mode anti-animaux activé par défaut
- Vérifiez : App > Détecteur > Réglages

✅ **Si gros chien (> 15kg)**
- Montez détecteur plus haut (2,5m)
- Inclinez davantage vers le bas
- Réduisez sensibilité

**Sources de chaleur**

❌ **Évitez**
- Radiateurs, cheminées
- Fenêtres ensoleillées
- Climatisation/ventilation

**Objets en mouvement**
- Rideaux près ventilation
- Plantes mobiles
- Ballons, jouets suspendus

### Solutions

**1. Repositionnement**
- Orientez pour détecter traversée (pas face-à-face)
- Éloignez fenêtres et sources chaleur
- Testez différents emplacements

**2. Ajustez sensibilité**
- App > Détecteur > Sensibilité
- Commencez "Moyenne" et ajustez
- Trop basse = Ne détecte pas assez
- Trop haute = Trop sensible

**3. Zones de détection**
- Masquez zones problématiques
- App > Détecteur > Zones
- Excluez fenêtres, radiateurs

## Capteur d'ouverture

### Notifications intempestives

**Mauvais alignement**

Capteur et aimant doivent être :
- Face à face (logos alignés)
- Distance < 20mm
- Fixation solide (pas de jeu)

**Test d'alignement**
1. Ouvrez porte/fenêtre
2. LED verte = Détection
3. Fermez lentement
4. LED s'éteint quand aligné

**Porte/fenêtre qui "bouge"**
- Vent fait vibrer
- Porte mal fermée
- Solution : Réglages isolation, ou délai

**Vibrations**
- Passage voitures
- Travaux voisins
- Solution : Réduire sensibilité

### Solutions

**1. Délai de déclenchement**
- App > Capteur > Délai
- 2-3 secondes = Ignore vibrations courtes

**2. Refixation**
- Vérifiez vis/adhésif
- Replacez si décalé
- Testez ouverture/fermeture

**3. Mode intelligent**
- Ignore déclenchements < 1 sec
- App > Capteur > Mode intelligent : ON

## Caméra

### Notifications mouvement excessives

**Détection trop sensible**

❌ **Sources fréquentes**
- Arbres dans le cadre
- Route passante
- Animaux sauvages
- Ombres qui bougent
- Reflets soleil

**Ajustements**

**1. Zones de détection**
- App > Caméra > Zones de détection
- Dessinez uniquement zones importantes
- Excluez arbres, routes, ciel

**2. Sensibilité**
- App > Caméra > Sensibilité : Faible/Moyenne
- Testez progressivement

**3. Détection IA (4K extérieure)**
- Active : Personne/Véhicule uniquement
- Ignore : Animaux, ombres, pluie

**4. Horaires**
- Notifications OFF durant journée
- ON durant absence uniquement

### Enregistrements vides

**Délai de déclenchement**
- Mouvement détecté → 2 sec → Enregistrement
- Personne déjà partie = Vidéo vide

**Solutions**
- Pré-enregistrement : ON (garde 3 sec avant)
- Enregistrement continu (consomme stockage)

## Problèmes de zones

### Alarme se déclenche alors que désactivée

**Mode partiel actif**
- Vérifiez : App > Accueil > Mode
- Partiel = Certaines zones actives

**Délai d'entrée trop court**
- Augmentez : App > Réglages > Délai entrée
- 30 → 45 secondes

**Mauvaise attribution zone**
- Capteur dans mauvaise zone
- App > Appareil > Zone
- Réattribuez correctement

### Alarme ne se déclenche pas

**Zone mal configurée**
- Zone désactivée dans mode actuel ?
- App > Zones > [Zone] > Modes

**Appareil non assigné**
- Appareil sans zone = Ignoré
- App > Appareil > Assigner à zone

## Calendrier et automatisations

### Alarme s'active toute seule

**Automatisation programmée**
- Vérifiez : App > Automatisations
- Désactivez si non souhaitée

**Géolocalisation**
- Mode "Je pars" automatique
- App > Réglages > Géolocalisation
- Désactivez si problème

### Alarme ne s'active pas automatiquement

**Permission localisation**
- iOS : Réglages > Confidentialité > Localisation
- Android : Paramètres > Apps > Autorisations

**Radius trop petit**
- App > Automatisations > Zone maison
- Augmentez rayon détection

## Optimisation générale

### Période d'apprentissage

Les premières semaines :
1. Notez toutes les fausses alertes
2. Identifiez les patterns
3. Ajustez progressivement
4. Normal d'avoir quelques ajustements

### Test et validation

Après chaque ajustement :
- Testez sur 24-48h
- Documentez les améliorations
- Affinez si nécessaire

### Support

Si fausses alertes persistent :
- Consultez historique détaillé
- Contactez support avec logs
- Nous ajustons à distance si possible

## Prochaines étapes

- [Problèmes connexion](./connection-issues.md)
- [Problèmes caméras](./camera-issues.md)
- [Configuration zones](../configuration/zones.md)
