#!/usr/bin/env bash

set -ex

cat > /etc/systemd/system/nomad-server.service  << EOF
[Unit]
Description=Nomad Server
Wants=network.target
After=syslog.target network-online.target
[Service]
Type=simple
ExecStart=sudo nomad agent -server -bind 0.0.0.0 -data-dir ${persisted_mount_point}
Restart=on-failure
RestartSec=10
KillMode=process
[Install]
WantedBy=multi-user.target
EOF

FS_TYPE=\$(blkid -o value -s TYPE ${persisted_disk_name})
[ -z "\$FS_TYPE" ] && sudo mkfs.ext4 ${persisted_disk_name} || true
sudo mkdir -p ${persisted_mount_point}
sudo mount -t ext4 ${persisted_disk_name} ${persisted_mount_point}

sudo systemctl daemon-reload
sudo systemctl enable nomad-server
sudo systmectl start nomad-server
