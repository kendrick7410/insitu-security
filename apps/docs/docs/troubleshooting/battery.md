---
sidebar_position: 2
---

# Batterie et alimentation

Solutions aux problèmes de batterie et d'alimentation.

## Batterie se décharge trop vite

### Capteurs sans fil (< 6 mois d'autonomie)

**Fréquence reporting trop élevée**
- App > Appareil > Réglages avancés
- Interval de rapport : 15 min au lieu de 5 min
- Économise 30-40% de batterie

**Signal faible**
- Appareil trop loin = Consomme plus
- Solution : Rapprochez ou ajoutez répéteur

**Température extrême**
- Froid < 5°C réduit autonomie
- Chaud > 35°C réduit autonomie

### Centrale (batterie secours < 20h)

**Âge de la batterie**
- Durée de vie : 3-4 ans
- Remplacez si performance dégradée

**Test de capacité**
1. Débranchez le secteur
2. Notez l'heure
3. Observez combien de temps elle tient
4. Si < 20h = Remplacement nécessaire

## Appareil ne s'allume pas

### Caméra / Centrale

**Vérifiez l'alimentation**
- Prise fonctionne ? (testez autre appareil)
- Câble endommagé ?
- Adaptateur correct ?

**Test adaptateur**
- Tension : 5V ou 12V selon appareil
- Vérifiez inscription sur adaptateur
- Utilisez multimètre si possible

**Redémarrage forcé**
- Débranchez 30 secondes
- Maintenez bouton power pendant branchement
- Voyant doit s'allumer

### Capteur sans fil

**Pile installée correctement ?**
- Respectez polarité +/-
- Contacts propres (pas d'oxydation)
- Pile neuve (vérifiez date)

**Languette de protection retirée ?**
- Pile neuve = Languette plastique
- Tirez complètement

**Testez avec pile neuve**
- Même type exact (CR2032, CR123A...)
- Marque de qualité (Duracell, Energizer)

## "Batterie faible" alors que pile neuve

### Pile de mauvaise qualité

**Utilisez marques reconnues**
- ✅ Duracell, Energizer, Panasonic
- ❌ Piles génériques/discount

**Vérifiez la date**
- Piles ont date de péremption
- N'utilisez pas si > 5 ans

### Contacts oxydés

1. Retirez la pile
2. Nettoyez contacts avec alcool isopropylique
3. Séchez complètement
4. Réinstallez

### Défaut appareil

Si batterie neuve de qualité toujours faible :
- Contactez le support
- Remplacement sous garantie

## Centrale ne bascule pas sur batterie

### Test manuel

1. Activez l'alarme
2. Débranchez le secteur
3. Sirène doit continuer de fonctionner
4. Voyant passe orange (sur batterie)

### Si ne fonctionne pas

**Batterie non chargée**
- Laissez branché 24h avant test
- Voyant de charge doit être allumé

**Fusible batterie**
- Ouvrez centrale (2 vis)
- Vérifiez fusible batterie
- Remplacez si grillé (2A/250V)

**Batterie défectueuse**
- Voltage < 11V = Défectueuse
- Commandez remplacement

## Types de piles

### Capteurs d'ouverture
- **Type** : CR2032 (pile bouton)
- **Voltage** : 3V
- **Durée** : 2 ans

### Détecteurs de mouvement
- **Type** : CR123A
- **Voltage** : 3V
- **Durée** : 1-2 ans

### Télécommandes
- **Type** : CR2032
- **Voltage** : 3V
- **Durée** : 2-3 ans

### Clavier
- **Type** : 2x CR123A
- **Voltage** : 3V chacune
- **Durée** : 1-2 ans

## Batterie centrale de remplacement

### Caractéristiques

- **Type** : Plomb-acide scellée 12V 7Ah
- **Référence** : Consultez manuel
- **Prix** : ~40€

### Remplacement

⚠️ **Important** : Débranchez d'abord le secteur !

1. Ouvrez la centrale (2 vis)
2. Déconnectez batterie (cosses rouges/noires)
3. Retirez l'ancienne
4. Installez la nouvelle
5. Reconnectez (respectez polarité !)
6. Refermez
7. Rebranchez secteur
8. Laissez charger 24h

### Recyclage

♻️ **Ne jetez pas** la batterie usagée !

- Déposez en déchetterie
- Ou lors du remplacement (envoi retour gratuit)

## Économiser la batterie

### Optimisations

**Capteurs**
- Interval de rapport : 15-30 min
- Désactivez LED statut (économise 10%)

**Caméras**
- Enregistrement sur événement uniquement
- Baissez résolution si possible
- Vision nocturne auto (pas forcé)

**Centrale**
- Sirène : 2 min max (pas 5 min)
- Luminosité écran : Moyenne

### Mode économie d'énergie

App > Réglages > Système > Économie batterie

- Réduit polling
- Désactive features non-essentielles
- Activez si coupures fréquentes

## Prochaines étapes

- [Fausses alertes](./false-alarms.md)
- [Problèmes caméras](./camera-issues.md)
- [Maintenance régulière](../maintenance.md)
