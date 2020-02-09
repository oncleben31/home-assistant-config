# My Home Assistant config

![Project Maintenance][maintenance-shield]
[![License][license-shield]](LICENSE.md)

![Github workwlow][workflow-shield]
[![GitHub Activity][commits-shield]][commits]
[![GitHub Last Commit][last-commit-shield]][commits]

[![Discord francophone][discord-shield]][discord]
[![Community Forum][forum-shield]][forum]

Welcome to my Home Assistant configuration!

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

## Devices used

- Raspbery Pi v3 for hosting Hass.io
- Xiaomi devices:
  - Vacuum Roborock cleaner
  - Aqara gateway (not really used anymore as I migrate the sensor to the Conbee 2)
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
- Conbee 2 for managing Zigbee devices (Xiaomi, Hue and OSRAM)

## Automations

You can find in my automations and scripts the following features:

- Regular Home Assistant backup
- Monitoring of the availibility of the crtical systems of the house.
- Monitoring the quality of the internet connexion.
- Control thru Google Assistant of the Vacuum.
- Daily routines for cleaning the house with the Vacuum.
- Alarm management.
- Check and notification if lights could be switch off.
- Send notification in case of weather alert or rain expected.
- Send notification according to UV forecast condition.
- And many other things...

## Custom components used

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

(&#42;): integrations update managed with HACS

## Integrations configured thru HA GUI

The following integrations are not configured in YAML files. So you won't see it
in this repository:

- [ESPHome](https://www.home-assistant.io/components/esphome/) devices
  integration in HA.
- [OpenUV](https://www.home-assistant.io/components/openuv/) for UV sensors and
  alert automation with my swiming pool.
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

## Addons used

- [ESPHome](https://esphome.io)
- [InfluxDB](https://github.com/hassio-addons/addon-influxdb)
- [SSH & Web Terminal](https://github.com/hassio-addons/addon-ssh)
- [Unifi Controller](https://github.com/hassio-addons/addon-unifi): warning this
  one use a lot of memory and can be the root cause of issues on Raspberry Pi 3.
- [deCONZ](https://github.com/home-assistant/hassio-addons/tree/master/deconz)

## one more thing

I have and will add specific explanations in the wiki. So don't forget to visit
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
