#!/bin/bash

# EN: Create snapshots, upload them on my NAS and clean local and old archives
#     Inspired by https://blog.ktz.me/backing-up-home-assistant/
#     Key based authentification activated on my Synology NAS by following instructions from https://blog.aaronlenoir.com/2018/05/06/ssh-into-synology-nas-with-ssh-key/
#     A partial snapshot for MariaDb is creataed with addon stopeed to avoid data corruption (see: https://github.com/home-assistant/addons/issues/1353)
#     WARNING: Don't forget to test regularly your backups with a restore !
#
# FR: Creation de sauvegardes, téléchargement sur mon NAS et supressions des anciennes archives locales
#     Inspiré de https://blog.ktz.me/backing-up-home-assistant/
#     Authentification par clé privée/publique activé sur mon NAS Synology en suivant les instructions de https://blog.aaronlenoir.com/2018/05/06/ssh-into-synology-nas-with-ssh-key/
#     Une sauvegarde partielle de MariaDB avec l'addon arrêté est créée pour éviter la corruption de donnée (cf: https://github.com/home-assistant/addons/issues/1353)
#     ATTENTION: Ne pas oublier de tester régulièrement vos sauvegardes avec une restauration !

# EN: Create new full snapshot
# FR: Création d'une sauvegarde complète
ha snapshots new --name $(date +"%Y_%m_%d__%H_%M_%S")

# EN: Create partial snapshot for MariaDB only with addon stopped to avoid database corruption
# FR: Création d'une sauvegarde partielle pour MariaDB uniquement avec l'addon arrêté afin d'éviter une corruption de la base de donnée
ha addons stop core_mariadb
ha snapshots new --addons core_mariadb --name $(date +"%Y_%m_%d__%H_%M_%S")_core_mariadb
ha addons start core_mariadb

# EN: Use rsync to copy only archives that dont already exist on my NAS
# FR: Utilise rsync pour copier les nouvelles sauvegardes sur mon NAS
rsync -rtvu --rsync-path=/usr/bin/rsync /backup/ nas:~/hassio-backup/snapshots/

# EN: Delete local snapshots older than 14 days to save disk space
# FR: Supprime les sauvegrdes locales de plus de 14 jours pour libérer de l'espace disque
find /backup/ -type f -name '*.tar' -mtime +14 -exec rm {} \;

echo Script competed
