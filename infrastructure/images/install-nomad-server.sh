#!/usr/bin/env bash

set -ex

curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install nomad -y

sudo mkdir -p /opt/nomad

cat > /etc/systemd/system/nomad.service  << EOF
[Unit]
Description=Nomad Server
Wants=network.target
After=syslog.target network-online.target
[Service]
Type=simple
ExecStart=sudo nomad agent -server -bind 0.0.0.0 -data-dir /opt/nomad
Restart=on-failure
RestartSec=10
KillMode=process
[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl disable nomad
