#!/usr/bin/env bash

set -ex

sudo mkdir -p /etc/nomad-server
sudo mv /tmp/deployment/nomad-server.hcl /etc/nomad-server/config.hcl

curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install nomad -y

cat > /tmp/format-nomad-server-disk.sh << EOF
#!/usr/bin/env bash
FS_TYPE=$(blkid -o value -s TYPE /dev/disk/by-id/google-nomad-server)
[ -z "$FS_TYPE" ] && sudo mkfs.ext4 /dev/disk/by-id/google-nomad-server || true
EOF

cat > /etc/systemd/system/format-nomad-server-disk.service << EOF
[Unit]
Description=Format nomad server disk
After=/dev/disk/by-id/google-nomad-server
Requires=/dev/disk/by-id/google-nomad-server
[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/bin/bash /tmp/format-nomad-server-disk.sh
EOF

cat > /etc/systemd/system/nomad-server-disk.mount << EOF
[Unit]
Description=Mount nomad server disk
Requires=format-nomad-server-disk.service
After=format-nomad-server-disk.service
[Mount]
What=/dev/disk/by-id/google-nomad-server
Where=/mnt/nomad-server
Type=ext4
[Install]
WantedBy=multi-user.target
EOF

cat > /etc/systemd/system/nomad-server.service  << EOF
[Unit]
Description=Nomad Server
Wants=network.target
Requires=network-online.target nomad-server-disk.mount
After=network-online.target nomad-server-disk.mount
[Service]
Type=simple
ExecStart=sudo nomad agent -config /etc/nomad-server/config.hcl
Restart=on-failure
RestartSec=10
[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable nomad-server-disk.mount
sudo systemctl enable nomad-server.service
