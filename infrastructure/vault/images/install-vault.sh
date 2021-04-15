#!/usr/bin/env bash

set -ex

sudo snap install jq

curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install vault -y

ROOT_FOLDER=/mnt/vault
sudo mkdir -p $ROOT_FOLDER
sudo mkdir -p $ROOT_FOLDER/data
sudo mv /tmp/deployment/vault.hcl $ROOT_FOLDER/config.hcl

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
sudo systemctl disable format-vault-additional.service
sudo systemctl disable $MOUNT_SCRIPT
sudo systemctl disable vault.service
