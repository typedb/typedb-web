#!/usr/bin/env bash

set -ex

ROOT_FOLDER=/mnt/nomad-client
sudo mkdir -p $ROOT_FOLDER
sudo mkdir -p $ROOT_FOLDER/data

cat > $ROOT_FOLDER/config.hcl << EOF
region = "uk"
datacenter = "uk"

data_dir = "$ROOT_FOLDER/data"
bind_addr = "0.0.0.0"

client {
  enabled    = true
  servers    = ["nomad-server:4647"]
  node_class = "${NODE_CLASS}"
}

acl {
  enabled = true
}

tls {
  http = true
  rpc  = true

  ca_file   = "$ROOT_FOLDER/nomad-ca.pem"
  cert_file = "$ROOT_FOLDER/nomad-client.pem"
  key_file  = "$ROOT_FOLDER/nomad-client-key.pem"
}
EOF

cat > /etc/systemd/system/nomad-client.service << EOF
[Unit]
Description=Nomad Server
Wants=network.target
Requires=network-online.target
After=network-online.target
[Service]
Type=simple
ExecStart=sudo nomad agent -config $ROOT_FOLDER/config.hcl
Restart=on-failure
RestartSec=10
[Install]
WantedBy=multi-user.target
EOF

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
    -config=cfssl.json -hostname="client.uk.nomad,localhost,127.0.0.1" - | cfssljson -bare nomad-client
sudo mv nomad-client.pem $ROOT_FOLDER/nomad-client.pem
sudo mv nomad-client-key.pem $ROOT_FOLDER/nomad-client-key.pem

sudo systemctl daemon-reload
sudo systemctl enable nomad-client.service
sudo systemctl start nomad-client.service
