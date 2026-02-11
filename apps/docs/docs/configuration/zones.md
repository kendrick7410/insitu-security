---
sidebar_position: 2
---

# Zones de surveillance

Organisez vos appareils en zones logiques pour une gestion simplifiée.

## Qu'est-ce qu'une zone ?

Une zone regroupe plusieurs appareils selon leur emplacement ou fonction :
- Rez-de-chaussée
- Étage
- Extérieur
- Garage

## Créer une zone

1. App > Réglages > Zones
2. Appuyez sur **+ Nouvelle zone**
3. Nommez la zone
4. Choisissez une icône
5. Ajoutez les appareils

## Configuration par zone

### Mode d'armement

Chaque zone peut avoir un comportement différent :

| Mode | Total | Partiel | Nuit |
|------|-------|---------|------|
| Entrée | ✅ | ✅ | ❌ |
| RDC | ✅ | ✅ | ✅ |
| Étage | ✅ | ❌ | ❌ |
| Extérieur | ✅ | ✅ | ✅ |

### Délais personnalisés

Chaque zone peut avoir ses propres délais :
- Entrée principale : 30 sec
- Porte garage : 45 sec (plus loin)
- Autres : Immédiat

## Exemples de configuration

### Maison à un niveau

**Zones suggérées :**
- Périmètre (portes/fenêtres)
- Intérieur (mouvements)
- Garage

**Mode Nuit** : Périmètre uniquement

### Maison à deux niveaux

**Zones suggérées :**
- Entrée
- RDC
- Étage
- Extérieur

**Mode Nuit** : RDC + Extérieur

### Appartement

**Zones suggérées :**
- Entrée
- Salon
- Chambres

**Mode Partiel** : Entrée uniquement

## Automatisation par zone

Créez des scénarios :

**"Je pars"**
- Active toutes les zones
- Mode Total

**"Je rentre"**
- Désactive toutes les zones

**"Nuit"**
- Active RDC + Extérieur
- Désactive Étage

## Prochaines étapes

- [Configurer les notifications](./notifications.md)
- [Intégrations domotiques](./integrations.md)
