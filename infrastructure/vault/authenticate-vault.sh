#!/usr/bin/env bash

set -e

CA_FILE=/tmp/vault-ca.pem
gcloud compute scp --zone=europe-west2-b vault:/mnt/vault/vault.pem $CA_FILE >/dev/null 2>&1
IP=$(gcloud compute instances describe vault --zone=europe-west2-b --format='get(networkInterfaces[0].accessConfigs[0].natIP)')
TOKEN=$(gcloud compute ssh vault --zone=europe-west2-b --command='cat /mnt/vault/token' 2>/dev/null)

echo export VAULT_CACERT=$CA_FILE
echo export VAULT_ADDR=https://$IP:8200
echo export VAULT_TLS_SERVER_NAME=vault
echo export VAULT_TOKEN=$TOKEN
