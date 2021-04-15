#!/usr/bin/env bash

set -ex

ROOT_FOLDER=/mnt/vault

sudo systemctl enable format-vault-additional.service
sudo systemctl enable $(systemd-escape -p --suffix=mount $ROOT_FOLDER/data)
sudo systemctl enable vault.service
sudo systemctl start vault.service

sleep 30s
vault operator init > $ROOT_FOLDER/token
for i in $(seq 3) ;
do
  UNSEAL_KEY=$(cat $ROOT_FOLDER/token | awk "/Unseal Key $i/ { print \$4 }")
  vault operator unseal $UNSEAL_KEY
done
