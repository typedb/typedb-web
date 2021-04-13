region = "uk"
datacenter = "uk"

data_dir = "/mnt/nomad-client/data"
bind_addr = "0.0.0.0"

client {
  enabled = true
  servers = ["nomad-server:4647"]
}

acl {
  enabled = true
}

tls {
  http = true
  rpc  = true

  ca_file   = "/mnt/nomad-client/nomad-ca.pem"
  cert_file = "/mnt/nomad-client/client.pem"
  key_file  = "/mnt/nomad-client/client-key.pem"
}
