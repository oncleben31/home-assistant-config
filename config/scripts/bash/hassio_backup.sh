#!/bin/bash

# Inspired by https://blog.ktz.me/backing-up-home-assistant/
# And key based authentification activated on my Synology NAS by following instructions from
# https://blog.aaronlenoir.com/2018/05/06/ssh-into-synology-nas-with-ssh-key/

# create new snapshot
hassio snapshots new --name $(date +"%Y_%m_%d__%H_%M_%S")

# use rsync to copy only archives that dont already exist on NAS
rsync -rtvu --rsync-path=/usr/bin/rsync /backup/ nas:~/hassio-backup/

# delete snapshots older than 14 days to save disk space
find /backup/ -type f -name '*.tar' -mtime +14 -exec rm {} \;

echo Script competed
