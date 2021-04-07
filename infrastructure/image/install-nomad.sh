#!/usr/bin/env bash

set -ex

curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install nomad

mkdir /opt/grabl
tar -xvf /tmp/deployment/grabl-linux.tar.gz -C /opt/grabl

sudo apt-get update -qy
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt install -qy openjdk-8-jdk openjdk-8-jre

sudo mkdir /opt/certificates/

cat > /etc/systemd/system/grabl.service  << EOF
[Unit]
Description=Grabl
Wants=network.target
After=syslog.target network-online.target
[Service]
Type=simple
ExecStart=/opt/grabl/grabl-linux/grabl prod
EnvironmentFile=/opt/grabl/grabl.env
Restart=on-failure
RestartSec=10
KillMode=process
[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl disable grabl
