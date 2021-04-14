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
      "usages": ["signing", "key encipherment", "server auth"]
    }
  }
}
EOF
echo '{}' | cfssl gencert -ca=$ROOT_FOLDER/nomad-ca.pem -ca-key=$ROOT_FOLDER/nomad-ca-key.pem \
    -config=cfssl.json -hostname="server.uk.nomad,localhost,127.0.0.1" - | cfssljson -bare server
sudo mv server.pem $ROOT_FOLDER/server.pem
sudo mv server-key.pem $ROOT_FOLDER/server-key.pem
sudo ls -al $ROOT_FOLDER
sudo ls -al $ROOT_FOLDER/data

sudo systemctl start nomad-server.service
nomad acl bootstrap > $ROOT_FOLDER/token
