#!/usr/bin/env bash

set -ex

ROOT_FOLDER=/mnt/vault
sudo mkdir -p $ROOT_FOLDER
sudo mkdir -p $ROOT_FOLDER/data

cat > $ROOT_FOLDER/config.hcl << EOF
storage "raft" {
  path    = "$ROOT_FOLDER/data"
  node_id = "node"
}

listener "tcp" {
  address       = "0.0.0.0:8200"
  tls_cert_file = "$ROOT_FOLDER/vault.pem"
  tls_key_file  = "$ROOT_FOLDER/vault-key.pem"
}

api_addr = "https://0.0.0.0:8200"
cluster_addr = "https://127.0.0.1:8201"
disable_mlock = true
ui = true
EOF

cat > /usr/bin/format-vault-additional.sh << EOF
#!/usr/bin/env bash
FS_TYPE=$(blkid -o value -s TYPE /dev/disk/by-id/google-vault-additional)
[ -z "$FS_TYPE" ] && sudo mkfs.ext4 /dev/disk/by-id/google-vault-additional || true
EOF

cat > /etc/systemd/system/format-vault-additional.service << EOF
[Unit]
Description=Format vault additional disk
After=/dev/disk/by-id/google-vault-additional
Requires=/dev/disk/by-id/google-vault-additional
[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/bin/bash /usr/bin/format-vault-additional.sh
EOF

MOUNT_SCRIPT=$(systemd-escape -p --suffix=mount $ROOT_FOLDER/data)
cat > /etc/systemd/system/$MOUNT_SCRIPT << EOF
[Unit]
Description=Mount vault additional disk
Requires=format-vault-additional.service
After=format-vault-additional.service
[Mount]
What=/dev/disk/by-id/google-vault-additional
Where=$ROOT_FOLDER/data
Type=ext4
[Install]
WantedBy=multi-user.target
EOF

cat > /etc/systemd/system/vault.service << EOF
[Unit]
Description=Nomad Server
Wants=network.target
Requires=network-online.target $MOUNT_SCRIPT
After=network-online.target $MOUNT_SCRIPT
[Service]
Type=simple
ExecStart=sudo vault server -config=$ROOT_FOLDER/config.hcl
Restart=on-failure
RestartSec=10
[Install]
WantedBy=multi-user.target
EOF

openssl req -x509 -newkey rsa:4096 -nodes -subj "/CN=vault" -days 3650 -addext "subjectAltName=DNS:vault,DNS:localhost,IP:127.0.0.1" \
  -keyout $ROOT_FOLDER/vault-key.pem -out $ROOT_FOLDER/vault.pem

sudo systemctl daemon-reload
sudo systemctl enable format-vault-additional.service
sudo systemctl enable $MOUNT_SCRIPT
sudo systemctl enable vault.service
sudo systemctl start vault.service

sleep 30s
export VAULT_ADDR=https://127.0.0.1:8200
export VAULT_CACERT=$ROOT_FOLDER/vault.pem
vault operator init > $ROOT_FOLDER/init
for i in $(seq 5) ;
do
  UNSEAL_KEY=$(cat $ROOT_FOLDER/init | awk "/Unseal Key $i/ { print \$4 }")
  echo $UNSEAL_KEY >> $ROOT_FOLDER/unseal-keys
  vault operator unseal $UNSEAL_KEY
done
TOKEN=$(cat $ROOT_FOLDER/init | awk "/Initial Root Token/ { print \$4 }")
echo $TOKEN >> $ROOT_FOLDER/token
rm -f $ROOT_FOLDER/init

sleep 30s
export VAULT_TOKEN=$(cat $ROOT_FOLDER/token)
cfssl print-defaults csr | cfssl gencert -initca - | cfssljson -bare nomad-ca
vault secrets enable -path=nomad kv
vault kv put nomad/nomad-ca value=@nomad-ca.pem
vault kv put nomad/nomad-ca-key value=@nomad-ca-key.pem
rm -f nomad-ca*
