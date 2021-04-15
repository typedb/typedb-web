#!/usr/bin/env bash

set -ex

ROOT_FOLDER=/mnt/vault
sudo mkdir -p $ROOT_FOLDER
sudo mkdir -p $ROOT_FOLDER/data

cat > $ROOT_FOLDER/config.hcl << EOF
storage "raft" {
  path    = "/mnt/vault/data"
  node_id = "node"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = true
}

api_addr = "http://0.0.0.0:8200"
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

sudo systemctl daemon-reload
sudo systemctl enable format-vault-additional.service
sudo systemctl enable $MOUNT_SCRIPT
sudo systemctl enable vault.service
sudo systemctl start vault.service

sleep 30s
vault operator init > $ROOT_FOLDER/token
for i in $(seq 3) ;
do
  UNSEAL_KEY=$(cat $ROOT_FOLDER/token | awk "/Unseal Key $i/ { print \$4 }")
  vault operator unseal $UNSEAL_KEY
done
