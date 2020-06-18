# My Home Assistant config

![Project Maintenance][maintenance-shield]
[![License][license-shield]](LICENSE.md)

[![Github workwlow][workflow-shield]][workflow]
[![GitHub Activity][commits-shield]][commits]
[![GitHub Last Commit][last-commit-shield]][commits]

[![Discord francophone][discord-shield]][discord]
[![Community Forum][forum-shield]][forum]

Welcome to my Home Assistant configuration!
Bienvenue chez ma configuration Home Assistant !

You will find English README content [here](#for-english-speaking-users).

Vous trouverez le contenu francophone du README [ici](#pour-les-francophones).

## Pour les francophones

Ne soyez pas effrayés par la structure non standard de cette configuration pour
Home-Assistant. J'ai été inspiré par [la structure propsée par Franck Nijhof](https://github.com/frenck/home-assistant-config).

Cette approche est très modulaire et très différente dans sa strucutre des autres
configurations que vous trouverez sur Internet.

L'idée c'est que chaque fichier dans ce dépôt ne fait qu'une seule chose !
Vous pouvez ainsi chercher le fichier qui correspond à un composant, cliquez et
vous trouverez rapidement l'information.
Le fichier `configuration.yaml` n'est utilisé que pour amorcer le système et
contient des paramètres minimaux, mais vitaux.

Si vous êtes à l'aise en anglais je conseille le visionnage [de la video de Franck](https://www.youtube.com/watch?v=lndeybw21PY)
eexpliquant pourquoi il a fait ces choix.

J'ai essayé d'ajouter des commentaires et des liens vers la documentation pour
chaque fichier YAML quand cela à une valeur ajoutée.

Attention: ma décision d'avoir une documentation bilingue en ajoutant le français
est récente. Donc la partie francophone n'est pas encore complète.

### Appareils utilisés

- Raspbery Pi v3 pour héberger HassOS
- Les objets Xiaomi:
  - Robot aspirateur Roborock cleaner
  - Pleins de capteurs et interrupteurs
- Zwaves:
  - Prises avec contrôle de la consomation
  - Détecteurs incendies
- RFXCOM pour accéder à des capteur Oregon
- Ampoules Philips Hue et appareils Zigbee compatibles
- Quelques objets DIY à base d'esp32 en utilisant [ESPHome](https://esphome.io)
- Telegram pour les notifications
- Google home et Chromecast
- Renault Zoé ma voiture électrique
- Linky
- Serveur Plex qui tourne sur mon NAS
- Conbee 2 pour controler mes appareils Zigbee (Xiaomi, Hue and OSRAM)
- UPC Back-UPS pour protéger des coupures électriques mon Raspberry Pi, mon
  switch et mon NAS.
- Un Sonoff POW R2 gérer la pompe de filtration de ma piscine (in progress)
- Un NAS Synology
- Une imprimante Brother

### Automations

Vous trouverez dans mes scripts et automations les fonctionalités suivantes:

- Un backup régulier de ma configuration Home-Assistant.
- Surveiller la disponibilité des appareils critiques de ma maison.
- Surveiller la qualité de ma connexion Internet.
- Piloter le robot Aspirteur à partir de Google Home.
- Les routines quotidiennes pour nettoyer avec le robot aspirateur.
- Gestion d'un alarme (besoin de retravailler cette partie).
- Vérification et notification si des lumières devraient être éteintes
- Envoie une notification en cas d'alerte météo ou de pluie attendue
- Envoie un notification si j'ai oublié de brancher ma voiture électrique
- Piloter le calendrier de la pompte de filtration de la piscine.
- Et pleins d'autre choses...

### les _Custom components_ utilisés

Les custom components qui m'aident:

- Intégration [Linky](https://github.com/home-assistant/home-assistant/pull/20535)
  . Grace à **PirionFr** et **Grea04**.
- [hassRenaultZE](https://github.com/epenet/hassRenaultZE)&#42;: pour surveiller
  l'état de la batterie de ma Zoé. Merci à **epenet**.
- [HACS](https://github.com/custom-components/hacs)&#42; pour gérer la mise à jour
  des composants utilisés.
- intégration [variable](https://github.com/rogro82/hass-variables)&#42; merci à
  **rogro82**.
- [pool-pump](https://github.com/exxamalte/home-assistant-customisations/tree/master/pool-pump)
  pour piloter la pompe de filtration de ma piscine. Merci à **exxamalte**

(&#42;): intégrations gérées avec HACS

### Integrations configurées via l'IHM dans HA

Les integrations suivantes ne sont pas configurées dans les fichiers YAML.
Vous ne les verrez donc pas dans ce dépôt:

- [ESPHome](https://www.home-assistant.io/components/esphome/) pour intégrer des
  ESP ou SONOFF.
- [IFTTT](https://www.home-assistant.io/components/ifttt/) utilisé pour piloter
  le robot aspirateur par la voix.
- [Google Cast](https://www.home-assistant.io/components/cast/) utilisé pour
  envoyer des message TTS sur ma Google Home
- [Unifi](https://www.home-assistant.io/components/unifi/) pour détecter
  présence et surveiller les sytèmes sur mon réseau.
- [Cloud](https://www.home-assistant.io/components/cloud/) pour lier certains
  appareil à Google Home et soutenir HA.
- [Plex](https://www.home-assistant.io/integrations/plex/) pour connceter mon
  serveur Plex
- [deCONZ](https://www.home-assistant.io/integrations/deconz/) pour piloter mes
  appareils Zigbee.
- [Météo-France](https://www.home-assistant.io/integrations/meteo_france/) pour
  avoir la météo, les alertes météo et la prévision de pluie dans l'heure.
- [Zone](https://www.home-assistant.io/integrations/zone) pour gérer les zones
  utilisées dans certaines automations.
- [Network UPS Tool (NUT)](https://www.home-assistant.io/integrations/nut) pour
  surveiller mon UPC Back-UPS.
- [Brother](https://www.home-assistant.io/integrations/brother/) pour avoir
  l'état de mon imprimante.

### Addons utilisés

- [InfluxDB](https://github.com/hassio-addons/addon-influxdb) désactivé depuis
  que le SSD relié à mon Raspberry ne fonctionne plus.
- [SSH & Web Terminal](https://github.com/hassio-addons/addon-ssh)
- [Unifi Controller](https://github.com/hassio-addons/addon-unifi): attention
  celui là consomme beaucoup de mémoire et peu être la cause racine de problème
  sur un Rasberry Pi 3.
- [deCONZ](https://github.com/home-assistant/hassio-addons/tree/master/deconz)

### One more thing

J'ai ajouté d'autres information spécifiques dans le [wiki](https://github.com/oncleben31/home-assistant-config/wiki). 
N'oubliez pas de le visiter. Attention pas encore traduit.

## For English speaking users

Don't be scared by the non standard structure of the Home Assistant
configuration folder.
I'm inspired by [the strucutre propsed by Franck Nijhof](https://github.com/frenck/home-assistant-config).

This system is very modular and very differently structured compared to other
configurations you'll find online.

Basically, each file in the repository does 1 (one, uno, eins) thing only!
Search file with the name of the component, click through it, you'll get it
pretty fast. The `configuration.yaml` is only used to bootstrap the system and
contains some minimal, but vital, settings.

You can watch [a video by Franck](https://www.youtube.com/watch?v=lndeybw21PY)
explaining why is doing that way.

I try to add comments and link with external documentations for each YAML file
when needed.

### Devices used

- Raspbery Pi v3 for hosting HassOS
- Xiaomi devices:
  - Vacuum Roborock cleaner
  - Lot of sensors and switchs
- Zwaves:
  - Switchs with energy monitoring
  - Fire detectors
- RFXCOM to access Oregon sensors
- Philips Hue bulbs and compatible Zigbee devices
- DIY with esp32 using [ESPHome](https://esphome.io)
- Telegram
- Google home and Chromecast
- Renault Zoé my electric car
- Linky electrcity monitoring system
- Plex server running on my NAS
- Conbee 2 for managing Zigbee devices (Xiaomi, Hue and OSRAM)
- UPC Back-UPS to protect against power failure my Raspberry Pi, my switch and
  my NAS.
- Sonoff POW R2 for managing the swiming pool pump (in progress)
- NAS Synology

### Automations

You can find in my automations and scripts the following features:

- Regular Home Assistant backup
- Monitoring of the availibility of the crtical systems of the house.
- Monitoring the quality of the internet connexion.
- Control thru Google Assistant of the Vacuum.
- Daily routines for cleaning the house with the Vacuum.
- Alarm management (need rework).
- Check and notification if lights could be switch off.
- Send notification in case of weather alert or rain expected.
- Send notification if I forget to plug the electrical car.
- Manage the pool pump schedule.
- And many other things...

### Custom components used

To help me I used the following custom components:

- [Linky](https://github.com/home-assistant/home-assistant/pull/20535)
  integration. Thanks to **PirionFr** and **Grea04**.
- [hassRenaultZE](https://github.com/epenet/hassRenaultZE)&#42;: to follow battery
  status of my Zoé eletric car thanks to **epenet**.
- [HACS](https://github.com/custom-components/hacs)&#42; to follow updates of custom
  components and cards.
- [variable](https://github.com/rogro82/hass-variables)&#42; integration thanks to
  **rogro82**.
- [spotcast](https://github.com/fondberg/spotcast)&#42; to start playing spotify
  on a Google cast device thanks to **fondberg**.
- [pool-pump](https://github.com/exxamalte/home-assistant-customisations/tree/master/pool-pump)
  to manage the swiming pool pump thanks to **exxamalte**

(&#42;): integrations update managed with HACS

### Integrations configured thru HA GUI

The following integrations are not configured in YAML files. So you won't see it
in this repository:

- [ESPHome](https://www.home-assistant.io/components/esphome/) devices
  integration in HA.
- [IFTTT](https://www.home-assistant.io/components/ifttt/) used for piloting the
  vacuum robot from the Google Home.
- [Google Cast](https://www.home-assistant.io/components/cast/) used for some
  TTS messages in the house.
- [Unifi](https://www.home-assistant.io/components/unifi/) for presence
  detection and system monitoring.
- [Cloud](https://www.home-assistant.io/components/cloud/) to expose some
  entities to Google Assistant and support HA project ;-)
- [Plex](https://www.home-assistant.io/integrations/plex/) to connect my Plex
  server.
- [deCONZ](https://www.home-assistant.io/integrations/deconz/) to manage Zigbee
  devices.
- [Météo-France](https://www.home-assistant.io/integrations/meteo_france/) to
  have weather alerts and rain forecast within the hour.
- [Zone](https://www.home-assistant.io/integrations/zone) to manage the different
  zones used by automations.
- [Network UPS Tool (NUT)](https://www.home-assistant.io/integrations/nut) to
  monitor my UPC Back-UPS.
- [Brother](https://www.home-assistant.io/integrations/brother/) to have a status
  of my new printer.

### Addons used

- [InfluxDB](https://github.com/hassio-addons/addon-influxdb) deactivated due to
  hardware issue
- [SSH & Web Terminal](https://github.com/hassio-addons/addon-ssh)
- [Unifi Controller](https://github.com/hassio-addons/addon-unifi): warning this
  one use a lot of memory and can be the root cause of issues on Raspberry Pi 3.
- [deCONZ](https://github.com/home-assistant/hassio-addons/tree/master/deconz)

### One more thing

I have and will add specific explanations in the [wiki](https://github.com/oncleben31/home-assistant-config/wiki). So don't forget to visit
it.

[commits-shield]: https://img.shields.io/github/commit-activity/y/oncleben31/home-assistant-config
[commits]: https://github.com/oncleben31/home-assistant-config/commits/master
[discord-shield]: https://img.shields.io/discord/542746125292273674?label=Discord%20francophone&logo=discord
[discord]: https://discord.gg/JeTFJzE$
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg
[forum]: https://community.home-assistant.io/?u=oncleben31
[last-commit-shield]: https://img.shields.io/github/last-commit/oncleben31/home-assistant-config.svg
[license-shield]: https://img.shields.io/github/license/oncleben31/home-assistant-config.svg
[maintenance-shield]: https://img.shields.io/maintenance/yes/2020.svg
[workflow-shield]: https://github.com/oncleben31/home-assistant-config/workflows/Home%20Assistant%20configuration/badge.svg
[workflow]: https://github.com/oncleben31/home-assistant-config/actions
