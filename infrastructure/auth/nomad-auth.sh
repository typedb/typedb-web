#!/usr/bin/env bash

set -e

CA_FILE=/tmp/nomad-ca.pem
if [ ! -f $CA_FILE ]; then
  gcloud compute scp --zone=europe-west2-b nomad-server:/mnt/nomad-server/nomad-ca.pem $CA_FILE >/dev/null 2>&1
fi
IP=$(gcloud compute instances describe nomad-server --zone=europe-west2-b --format='get(networkInterfaces[0].accessConfigs[0].natIP)')
TOKEN=$(gcloud compute ssh nomad-server --zone=europe-west2-b --command='cat /mnt/nomad-server/token' 2>/dev/null | awk '/Secret ID/ {print $4}')
echo export NOMAD_CACERT=$CA_FILE
echo export NOMAD_ADDR=https://$IP:4646
echo export NOMAD_TOKEN=$TOKEN
