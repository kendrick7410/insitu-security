---
sidebar_position: 4
---

# Intégrations domotiques

Connectez InSitu Security à vos autres appareils intelligents.

## Google Home

### Configuration

1. Ouvrez l'app Google Home
2. Appuyez sur **+** > Configurer un appareil
3. Sélectionnez **Fonctionne avec Google**
4. Cherchez "InSitu Security"
5. Connectez-vous avec votre compte

### Commandes vocales

```
"Ok Google, active l'alarme"
"Ok Google, désactive l'alarme"
"Ok Google, l'alarme est-elle activée ?"
"Ok Google, montre-moi la caméra du salon"
```

### Automatisations

Créez des routines :
- "Bonne nuit" → Active mode nuit
- "Je pars" → Active alarme + éteint lumières

## Amazon Alexa

### Configuration

1. Ouvrez l'app Alexa
2. Menu > Skills et jeux
3. Cherchez "InSitu Security"
4. Activer la skill
5. Liez votre compte

### Commandes vocales

```
"Alexa, demande à InSitu d'activer l'alarme"
"Alexa, demande à InSitu si l'alarme est activée"
"Alexa, montre la caméra d'entrée"
```

## Apple HomeKit

### Configuration

1. Ouvrez l'app Maison
2. Appuyez sur **+** > Ajouter un accessoire
3. Scannez le code HomeKit (dans l'app InSitu)
4. Suivez les instructions

### Raccourcis Siri

```
"Dis Siri, active l'alarme"
"Dis Siri, désactive l'alarme"
"Dis Siri, montre l'entrée"
```

### Scènes HomeKit

Intégrez dans vos scènes :
- "Départ" → Alarme + Lumières off + Thermostat baissé
- "Retour" → Alarme off + Lumières on

## IFTTT

Créez des applets personnalisés.

### Exemples

**Si alarme déclenchée → SMS au voisin**
```
IF InSitu Security "Alarm triggered"
THEN SMS "Alarme déclenchée chez moi"
```

**Si je quitte la zone → Active alarme**
```
IF Location "Exit home"
THEN InSitu Security "Arm system"
```

**Enregistrer dans Google Sheets**
```
IF InSitu Security "Any event"
THEN Google Sheets "Add row"
```

## Webhooks

Pour développeurs et intégrations avancées.

### Configuration

1. App > Réglages > Intégrations > Webhooks
2. Créez un nouveau webhook
3. URL de destination
4. Sélectionnez les événements

### Format JSON

```json
{
  "event": "alarm_triggered",
  "timestamp": "2025-02-11T10:30:00Z",
  "device_id": "sensor-001",
  "device_name": "Porte d'entrée",
  "zone": "Entrée"
}
```

### Événements disponibles

- `alarm_triggered`
- `alarm_disarmed`
- `door_opened`
- `motion_detected`
- `battery_low`
- `device_offline`

## API REST

Documentation complète : [api.insitusecurity.fr/docs](https://api.insitusecurity.fr/docs)

### Authentification

```bash
curl -X POST https://api.insitusecurity.fr/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"***"}'
```

### Récupérer l'état

```bash
curl https://api.insitusecurity.fr/v1/system/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Activer l'alarme

```bash
curl -X POST https://api.insitusecurity.fr/v1/alarm/arm \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"mode":"total"}'
```

## Limitations

- Max 50 requêtes API / heure (gratuit)
- Webhooks : Max 10 URLs
- IFTTT : Max 5 applets actifs simultanément

Plan Premium lève ces limitations.

## Dépannage

### Skill Alexa/Google ne répond pas

- Déconnectez et reconnectez la skill
- Vérifiez que l'alarme n'est pas en mode local uniquement
- Testez depuis l'app mobile d'abord

### Webhooks ne se déclenchent pas

- Vérifiez l'URL (HTTPS obligatoire)
- Testez avec RequestBin
- Consultez les logs dans l'app

## Prochaines étapes

- [Dépannage connexion](../troubleshooting/connection-issues.md)
- [Maintenance du système](../maintenance.md)
