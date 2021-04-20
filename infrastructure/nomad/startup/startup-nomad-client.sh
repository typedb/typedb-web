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
  node_class = "${APPLICATION}"
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

vault {
  enabled = true
  address = "https://vault:8200"
  ca_file = "$ROOT_FOLDER/vault-ca.pem"
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
ExecStart=bash -c 'sudo nomad agent -config $ROOT_FOLDER/config.hcl -vault-token \$(cat $ROOT_FOLDER/vault-token)'
Restart=on-failure
RestartSec=10
[Install]
WantedBy=multi-user.target
EOF

gcloud compute scp --zone=europe-west2-b vault:/mnt/vault/vault.pem $ROOT_FOLDER/vault-ca.pem >/dev/null 2>&1
gcloud compute scp --zone=europe-west2-b vault:/mnt/vault/token $ROOT_FOLDER/vault-token >/dev/null 2>&1
export VAULT_ADDR=https://vault:8200
export VAULT_CACERT=$ROOT_FOLDER/vault-ca.pem
export VAULT_TOKEN=$(cat $ROOT_FOLDER/vault-token)
vault kv get -format=json nomad/nomad-ca | jq -r '.data.value' | sudo tee "$ROOT_FOLDER/nomad-ca.pem" >/dev/null
vault kv get -format=json nomad/nomad-ca-key | jq -r '.data.value' | sudo tee "$ROOT_FOLDER/nomad-ca-key.pem" >/dev/null
vault secrets enable -path=${APPLICATION} kv || true
cat > policy.hcl << EOF
path "${APPLICATION}/*" {
  capabilities = ["read"]
}
EOF
vault policy write ${APPLICATION} policy.hcl || true

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
