#!/usr/bin/env bash

set -ex

ROOT_FOLDER=/mnt/nomad-server
sudo mkdir -p $ROOT_FOLDER
sudo mkdir -p $ROOT_FOLDER/data

cat > $ROOT_FOLDER/config.hcl << EOF
region = "uk"
datacenter = "uk"

data_dir = "$ROOT_FOLDER/data"
bind_addr = "0.0.0.0"

server {
  enabled = true
  bootstrap_expect = 1
}

acl {
  enabled = true
}

tls {
  http = true
  rpc  = true

  ca_file   = "$ROOT_FOLDER/nomad-ca.pem"
  cert_file = "$ROOT_FOLDER/nomad-server.pem"
  key_file  = "$ROOT_FOLDER/nomad-server-key.pem"
}

vault {
  enabled = true
  address = "https://vault:8200"
  ca_file = "$ROOT_FOLDER/vault-ca.pem"
}
EOF

cat > /usr/bin/format-nomad-server-additional.sh << EOF
#!/usr/bin/env bash
FS_TYPE=$(blkid -o value -s TYPE /dev/disk/by-id/google-nomad-server-additional)
[ -z "$FS_TYPE" ] && sudo mkfs.ext4 /dev/disk/by-id/google-nomad-server-additional || true
EOF

cat > /etc/systemd/system/format-nomad-server-additional.service << EOF
[Unit]
Description=Format nomad server additional disk
After=/dev/disk/by-id/google-nomad-server-additional
Requires=/dev/disk/by-id/google-nomad-server-additional
[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/bin/bash /usr/bin/format-nomad-server-additional.sh
EOF

MOUNT_SCRIPT=$(systemd-escape -p --suffix=mount $ROOT_FOLDER/data)
cat > /etc/systemd/system/$MOUNT_SCRIPT << EOF
[Unit]
Description=Mount nomad server additional disk
Requires=format-nomad-server-additional.service
After=format-nomad-server-additional.service
[Mount]
What=/dev/disk/by-id/google-nomad-server-additional
Where=$ROOT_FOLDER/data
Type=ext4
[Install]
WantedBy=multi-user.target
EOF

cat > /etc/systemd/system/nomad-server.service << EOF
[Unit]
Description=Nomad Server
Wants=network.target
Requires=network-online.target $MOUNT_SCRIPT
After=network-online.target $MOUNT_SCRIPT
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

sudo systemctl daemon-reload
sudo systemctl enable format-nomad-server-additional.service
sudo systemctl enable $MOUNT_SCRIPT
sudo systemctl enable nomad-server.service
sudo systemctl start nomad-server.service

sleep 30s
export NOMAD_ADDR=https://127.0.0.1:4646
export NOMAD_CACERT=$ROOT_FOLDER/nomad-ca.pem
nomad acl bootstrap | awk '/Secret ID/ {print $4}' > $ROOT_FOLDER/token
