---
sidebar_position: 1
---

# Problèmes de connexion

Solutions aux problèmes WiFi et de connexion réseau.

## Centrale ne se connecte pas au WiFi

### Symptômes
- Voyant rouge fixe
- "Impossible de connecter" dans l'app
- Timeout de configuration

### Solutions

**1. Vérifiez le réseau**
- Utilisez le WiFi 2.4GHz (pas 5GHz)
- SSID visible (pas de réseau caché)
- Mot de passe correct (attention Maj/min)

**2. Rapprochez-vous**
- Configurez à moins de 3m de la box
- Éloignez des interférences (micro-ondes, Bluetooth)

**3. Réinitialisez le WiFi**
- Maintenez bouton Reset 5 secondes
- Voyant bleu clignote = prêt
- Recommencez la configuration

**4. Redémarrez la box Internet**
- Débranchez 30 secondes
- Rebranchez et attendez 2 minutes
- Réessayez

## Appareil montre "Hors ligne"

### Capteur sans fil

**Vérifiez la batterie**
- App > Appareil > Vérifier niveau batterie
- Remplacez si < 20%

**Distance excessive**
- Max 100m de la centrale
- Les murs épais réduisent la portée
- Solution : Ajoutez un répéteur

**Interférences**
- Éloignez des appareils Bluetooth
- Changez de canal WiFi sur la box

### Caméra

**Signal WiFi faible**
- App > Caméra > Signal
- Si < 50% : Rapprochez ou ajoutez répéteur

**Redémarrage**
- Débranchez 10 secondes
- Rebranchez
- Attendez 1 minute

## Connexion instable (déconnexions fréquentes)

### Diagnostic

1. **Testez la connexion Internet**
   - Ouvrez navigateur web
   - Testez sur d'autres appareils
   - Si lent partout = Problème box/FAI

2. **Vérifiez le signal**
   - App > Réglages > Appareils
   - Signal < 60% = Trop faible

### Solutions

**Améliorer le WiFi**
- Positionnez la box en hauteur
- Éloignez des obstacles métalliques
- Changez de canal (app box Internet)

**Répéteur WiFi**
- Placez à mi-chemin box ↔ centrale
- Configurez avec même SSID
- Relancez la connexion

**Mode Ethernet (centrale)**
- Branchez câble Ethernet
- Connexion plus stable
- WiFi reste en backup

## App mobile ne se connecte pas

### À la maison

**Même réseau WiFi**
- Smartphone sur même WiFi que centrale
- Pas en 4G/5G

**Réinstaller l'app**
1. Désinstallez
2. Redémarrez le téléphone
3. Réinstallez depuis store
4. Reconnectez-vous

### À distance

**Vérifiez Internet**
- La centrale doit avoir Internet
- Voyant vert = Connectée

**Compte cloud**
- Vérifiez que compte cloud est actif
- Réglages > Compte > Statut

**Firewall/Proxy**
- Certains réseaux d'entreprise bloquent
- Essayez depuis un autre réseau

## Notifications retardées

### Causes courantes

**Internet lent**
- Testez vitesse : [fast.com](https://fast.com)
- Min 2 Mbps upload recommandé

**Économie batterie smartphone**
- Désactivez pour InSitu Security
- iOS : Réglages > Batterie
- Android : Paramètres > Apps > Batterie

**Serveurs de notification**
- Rare, mais possible
- Vérifiez [status.insitusecurity.fr](https://status.insitusecurity.fr)

## Impossible de voir les caméras en live

### Local (chez vous)

**Bande passante**
- 1 caméra = ~2 Mbps
- 3 caméras = ~6 Mbps
- Baissez qualité si lent

**Redémarrage**
1. Caméra : Débranchez 10 sec
2. App : Fermez et rouvrez
3. Réessayez

### À distance

**Upload Internet insuffisant**
- Testez sur [speedtest.net](https://speedtest.net)
- Min 5 Mbps upload pour 1 caméra

**VPN activé**
- Certains VPN bloquent le streaming
- Désactivez temporairement

## Codes d'erreur

| Code | Signification | Solution |
|------|---------------|----------|
| E001 | WiFi timeout | Réinitialisez connexion |
| E002 | Mot de passe incorrect | Vérifiez et réessayez |
| E003 | Appareil introuvable | Vérifiez alimentation |
| E004 | Serveur inaccessible | Vérifiez Internet |
| E005 | Batterie critique | Remplacez immédiatement |

## Support avancé

Si le problème persiste :

1. **Collectez les infos**
   - Code d'erreur
   - Modèle appareil
   - Screenshot si possible

2. **Contactez-nous**
   - 📞 01 23 45 67 89
   - 💬 Chat support
   - 📧 support@insitusecurity.fr

3. **Logs système**
   - App > Réglages > Support > Exporter logs
   - Envoyez au support
