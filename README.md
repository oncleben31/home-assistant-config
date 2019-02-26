# My Home Assistant config

Welcome to my Home Assistant configuration!

Don't be scared by the non standard strusture of the Home Assistant configuration folder.
I'm inspired by [the strucutre propsed by Franck Nijhof](https://github.com/frenck/home-assistant-config).

This system is very modular and very differently structured compared to other configurations you'll find online.
Basically, each file in the repository does 1 (one, uno, eins)
thing only! Click through it, you'll get it pretty fast. he configuration.yaml is only used to bootstrap the system
and contains some minimal, but vital, settings.

You can watch [a video by Franck](https://www.youtube.com/watch?v=lndeybw21PY) explaining why is doing that way.

## Devices Used:
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
