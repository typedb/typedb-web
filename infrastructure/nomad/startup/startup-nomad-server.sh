#!/usr/bin/env bash

set -ex

ROOT_FOLDER=/mnt/nomad-server

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
    -config=cfssl.json -hostname="server.uk.nomad,localhost,127.0.0.1" - | cfssljson -bare nomad-server
sudo mv nomad-server.pem $ROOT_FOLDER/nomad-server.pem
sudo mv nomad-server-key.pem $ROOT_FOLDER/nomad-server-key.pem

sudo systemctl enable format-nomad-server-additional.service
sudo systemctl enable $(systemd-escape -p --suffix=mount $ROOT_FOLDER/data)
sudo systemctl enable nomad-server.service
sudo systemctl start nomad-server.service
sleep 30s
nomad acl bootstrap -address=https://127.0.0.1:4646 -ca-cert=$ROOT_FOLDER/nomad-ca.pem > $ROOT_FOLDER/token
