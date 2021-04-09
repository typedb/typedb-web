#!/usr/bin/env bash

set -ex

sudo apt install -qy openjdk-11-jdk

sudo mkdir -p /etc/nomad-client
sudo mv /tmp/deployment/client.hcl /etc/nomad-client/client.hcl

sudo mkdir /mnt/nomad-client

curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install nomad -y

cat > /etc/systemd/system/nomad-client.service  << EOF
[Unit]
Description=Nomad Server
Wants=network.target
Requires=network-online.target
After=network-online.target
[Service]
Type=simple
ExecStart=sudo nomad agent -config /etc/nomad-client/client.hcl
Restart=on-failure
RestartSec=10
[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable nomad-client.service
