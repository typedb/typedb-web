#!/usr/bin/env bash

set -ex

sudo snap install jq
sudo apt install -qy openjdk-11-jdk

curl -L -o cni-plugins.tgz https://github.com/containernetworking/plugins/releases/download/v0.9.1/cni-plugins-linux-amd64-v0.9.1.tgz
sudo mkdir -p /opt/cni/bin
sudo tar -C /opt/cni/bin -xzf cni-plugins.tgz

wget https://pkg.cfssl.org/R1.2/cfssl_linux-amd64 https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
chmod +x cfssl_linux-amd64 cfssljson_linux-amd64
sudo mv cfssl_linux-amd64 /usr/local/bin/cfssl
sudo mv cfssljson_linux-amd64 /usr/local/bin/cfssljson

curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install nomad -y

ROOT_FOLDER=/mnt/nomad-client
sudo mkdir -p $ROOT_FOLDER
sudo mkdir -p $ROOT_FOLDER/data
sudo mv /tmp/deployment/nomad-client.hcl $ROOT_FOLDER/config.hcl

cat > /etc/systemd/system/nomad-client.service << EOF
[Unit]
Description=Nomad Server
Wants=network.target
Requires=network-online.target
After=network-online.target
[Service]
Type=simple
EnvironmentFile=$ROOT_FOLDER/environment
ExecStart=/bin/bash -c "sudo nomad agent -config $ROOT_FOLDER/config.hcl -node-class \$NODE_CLASS"
Restart=on-failure
RestartSec=10
[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl disable nomad-client.service
