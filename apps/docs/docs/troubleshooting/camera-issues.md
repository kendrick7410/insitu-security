---
sidebar_position: 4
---

# Problèmes caméras

Solutions spécifiques aux caméras InSitu Security.

## Image floue ou de mauvaise qualité

### Causes et solutions

**Objectif sale**
- Nettoyez avec chiffon microfibre
- Caméra extérieure : Pluie, poussière, pollen
- Fréquence : Mensuelle

**Mise au point incorrecte**
- Normalement auto-focus
- Redémarrez la caméra
- Si persiste : Contactez support

**Qualité vidéo trop basse**
- App > Caméra > Qualité
- Sélectionnez 1080p ou 4K
- ⚠️ Consomme plus de bande passante

**Mauvais éclairage**
- Vision nocturne active ?
- LED IR fonctionnelles ?
- Testez en pleine journée d'abord

## Vision nocturne ne fonctionne pas

### Symptômes
- Image noire la nuit
- Image très sombre
- Pas de basculement auto

### Solutions

**1. Vérifiez le mode**
- App > Caméra > Vision nocturne
- Mode : Automatique (recommandé)

**2. LED IR obstruées**
- Nettoyez LED infrarouges (petits points autour objectif)
- Pas de reflet sur vitre (si derrière fenêtre)

**3. Redémarrage**
- Débranchez 30 secondes
- Rebranchez
- Attendez basculement automatique

**4. Firmware**
- Vérifiez mise à jour disponible
- App > Caméra > Informations > Version

### Caméra extérieure - Vision couleur

La 4K extérieure a vision nocturne **couleur** :
- Nécessite projecteur LED activé
- App > Caméra > Projecteur nocturne : ON
- Consomme plus d'énergie

## Pas de vidéo en direct (live)

### Diagnostic

**1. Connexion Internet**
- Testez autre appareil sur même WiFi
- Speedtest : Min 2 Mbps

**2. Signal WiFi caméra**
- App > Caméra > Informations > Signal
- < 50% = Trop faible

**3. Caméra allumée ?**
- Voyant LED visible ?
- Branché correctement ?

### Solutions

**Améliorer WiFi**
- Rapprochez caméra de la box
- Ajoutez répéteur WiFi
- Changez canal WiFi (moins congestionné)

**Redémarrage complet**
1. Caméra : Débranchez 30 sec
2. Centrale : Redémarrez via app
3. Routeur : Redémarrez
4. Réessayez après 5 minutes

**Réinstaller caméra**
1. App > Caméra > Supprimer
2. Reset caméra (bouton 10 sec)
3. Rajoutez comme nouveau périphérique

## Enregistrements manquants

### Stockage local (carte SD)

**Carte pleine**
- App > Caméra > Stockage
- Si pleine : Anciens enregistrements écrasés
- Solution : Carte plus grande (128 Go)

**Carte défectueuse**
- Retirez et testez sur ordinateur
- Si erreurs : Remplacez
- Utilisez marque reconnue (SanDisk, Samsung)

**Format requis**
- Format tous les 6 mois
- App > Caméra > Stockage > Formater
- ⚠️ Efface tout !

### Stockage cloud

**Abonnement actif ?**
- Vérifiez : App > Compte > Abonnement
- Renouvelez si expiré

**Connexion Internet**
- Upload WiFi insuffisant
- Min 2 Mbps upload par caméra

**Quota atteint**
- Plan Basic : 30 jours
- Anciens effacés automatiquement
- Upgrade plan si besoin

## Audio ne fonctionne pas

### Audio bidirectionnel (parler)

**Permissions microphone**
- iOS : Réglages > Confidentialité > Micro
- Android : Paramètres > Apps > Autorisations

**Volume trop faible**
- Augmentez volume smartphone
- Parlez proche du micro

**Écho / Larsen**
- Baissez volume caméra
- Éloignez-vous haut-parleur

### Enregistrement audio

**Activé dans paramètres ?**
- App > Caméra > Audio
- Enregistrement audio : ON

**Qualité du micro**
- Caméra intérieure : Bon
- Caméra extérieure : Peut capter vent/pluie

## Détection de mouvement problématique

### Trop de notifications

Voir [Fausses alertes - Caméra](./false-alarms.md#caméra)

### Pas assez de notifications

**Sensibilité trop faible**
- App > Caméra > Sensibilité : Élevée
- Testez progressivement

**Zones mal configurées**
- Vérifiez zones de détection
- Doivent couvrir passages importants

**IA trop restrictive**
- Si détection IA : Personnes uniquement
- Désactivez si besoin d'animaux/véhicules

## Caméra se déconnecte souvent

### WiFi instable

**Signal fluctuant**
- Interférences (micro-ondes, Bluetooth)
- Murs épais
- Distance excessive

**Solutions**
- Répéteur WiFi
- Changez canal WiFi (6 ou 11 recommandés)
- Mode 2.4GHz forcé (pas auto)

### Alimentation

**Adaptateur insuffisant**
- Utilisez adaptateur fourni
- Si remplacé : Minimum 2A/5V

**Rallonge trop longue**
- Perte de voltage
- Max 3m de rallonge

### Surchauffe

**Caméra extérieure en plein soleil**
- Protection thermique = Déconnexion
- Repositionnez à l'ombre
- Ou ajoutez casquette/auvent

## Délai vidéo (lag)

### Live avec retard (> 5 sec)

**Bande passante**
- Baissez qualité : 720p au lieu de 1080p
- Fermez autres apps consommant data

**Distance réseau**
- À distance : Normal 2-5 sec
- Local : < 1 sec normal

**Serveurs surchargés**
- Rare mais possible
- Vérifiez [status.insitusecurity.fr](https://status.insitusecurity.fr)

## Codes d'erreur caméras

| Code | Signification | Solution |
|------|---------------|----------|
| CAM-001 | Connexion timeout | Vérifiez WiFi |
| CAM-002 | Carte SD erreur | Formatez ou remplacez |
| CAM-003 | Surchauffe | Repositionnez |
| CAM-004 | Firmware corrompu | Réinstallez firmware |
| CAM-005 | Objectif obstrué | Nettoyez |

## Réinitialisation complète

Si tous les essais échouent :

1. **Reset matériel**
   - Localisez bouton Reset (petit trou)
   - Maintenez 10 secondes (épingle)
   - Voyant clignote rapidement

2. **Réinstallation**
   - App > Supprimer caméra
   - Rajoutez comme neuve
   - Reconfigurez

3. **Support technique**
   - Si problème persiste
   - Possibilité défaut matériel
   - Remplacement sous garantie

## Prochaines étapes

- [Problèmes connexion](./connection-issues.md)
- [Optimiser stockage](../configuration/getting-started.md)
- [Maintenance caméras](../maintenance.md)
