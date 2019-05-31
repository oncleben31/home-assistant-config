# My Home Assistant config

Welcome to my Home Assistant configuration!

Don't be scared by the non standard structure of the Home Assistant configuration folder.
I'm inspired by [the strucutre propsed by Franck Nijhof](https://github.com/frenck/home-assistant-config).

This system is very modular and very differently structured compared to other configurations you'll find online.
Basically, each file in the repository does 1 (one, uno, eins)
thing only! Search file with the name of the component, click through it, you'll get it pretty fast. The configuration.yaml is only used to bootstrap the system
and contains some minimal, but vital, settings.

You can watch [a video by Franck](https://www.youtube.com/watch?v=lndeybw21PY) explaining why is doing that way.

## Devices Used

- Raspbery Pi v3 for hosting Hass.io
- Xiaomi devices:
  - Vacuum Roborock cleaner
  - Aqara gateway and sensors
- Zwaves:
  - Switchs with energy monitoring
  - Fire detectors
- RFXCOM to access Oregon sensors
- Philips Hue bulbs, gateway and compatible Zigbee devices
- DIY with esp32 using [esphomeyaml](https://esphomelib.com/esphomeyaml/)
- Telegram
- Google home and Chromecast
- Renault Zoé my new electric car
- Linky electrcity monitoring system
- Plex server running on my NAS

## Automations
  
You can find in my automations and scripts the following features:

- Regular Home Assistant backup
- Monitoring of the availibility of the crtical systems of the house.
- Monitoring the quality of the internet connexion.
- Control thru Google Assistant of the Vacuum.
- Daily routines for cleaning the house with the Vacuum.
- Alarm management
- Check and notification if lights could be switch off.

## Custom components used

To help me I used the following custom compoents:

- [Hue](https://github.com/robmarkcole/Hue-sensors-HASS) integration to access more accessories compared to the offcial one. Thanks to **robmarkcole**
- [Linky](https://github.com/home-assistant/home-assistant/pull/20535) integration. Thanks to **PirionFr** and **Grea04**
- [Renault Zoé](https://github.com/epenet/hassRenaultZE) integration. Thanks to **epenet**
- [Custom updater](https://github.com/custom-components/custom_updater) to follow updates of custom components and cards
- [variable](https://github.com/rogro82/hass-variables) integration
thanks to **rogro82**.

## Addons used

- [Backup Hassio to Google Drive](https://github.com/samccauley/addon-hassiogooglebackup#readme) to manage backup automaticaly.
- [ESPHome](https://esphome.io)
- [InfluxDB](https://github.com/hassio-addons/addon-influxdb)
- [SSH & Web Terminal](https://github.com/hassio-addons/addon-ssh)
- [Unifi Controller](https://github.com/hassio-addons/addon-unifi)
