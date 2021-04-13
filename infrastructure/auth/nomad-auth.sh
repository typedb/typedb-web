#!/usr/bin/env bash

TOKEN=$(gcloud compute ssh nomad-server --zone europe-west2-b --command 'cat /mnt/nomad-server/token' 2>/dev/null | awk '/Secret ID/ {print $4}')
echo export NOMAD_TOKEN=$TOKEN
