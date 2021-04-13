#!/usr/bin/env bash

IP=$(gcloud compute instances describe nomad-server --zone=europe-west2-b --format='get(networkInterfaces[0].accessConfigs[0].natIP)')
TOKEN=$(gcloud compute ssh nomad-server --zone=europe-west2-b --command='cat /mnt/nomad-server/token' 2>/dev/null | awk '/Secret ID/ {print $4}')
echo export NOMAD_ADDR=https://$IP:4646
echo export NOMAD_TOKEN=$TOKEN
