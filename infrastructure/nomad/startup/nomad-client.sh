#!/usr/bin/env bash

set -ex

ROOT_FOLDER=/mnt/nomad-client

for SECRET in nomad-ca nomad-ca-key
do
  curl -s "https://secretmanager.googleapis.com/v1/projects/vaticle-web-prod/secrets/$SECRET/versions/latest:access" \
    --request "GET" \
    --header "authorization: Bearer $(gcloud auth print-access-token)" \
    --header "content-type: application/json" \
    --header "x-goog-user-project: vaticle-web-prod" | jq -r '.payload.data' | base64 -d | sudo tee "$ROOT_FOLDER/$SECRET.pem" >/dev/null
done
cat > cfssl.json << EOF
{
  "signing": {
    "default": {
      "expiry": "87600h",
      "usages": ["signing", "key encipherment", "server auth", "client auth"]
    }
  }
}
EOF
echo '{}' | cfssl gencert -ca=$ROOT_FOLDER/nomad-ca.pem -ca-key=$ROOT_FOLDER/nomad-ca-key.pem \
    -config=cfssl.json -hostname="client.uk.nomad,localhost,127.0.0.1" - | cfssljson -bare client
sudo mv client.pem $ROOT_FOLDER/client.pem
sudo mv client-key.pem $ROOT_FOLDER/client-key.pem

echo "NODE_CLASS=${NODE_CLASS}" >> $ROOT_FOLDER/environment

sudo systemctl enable nomad-client.service
sudo systemctl start nomad-client.service
