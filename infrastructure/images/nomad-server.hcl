region = "uk"
datacenter = "uk"

data_dir = "/mnt/nomad-server/data"
bind_addr = "0.0.0.0"

server {
  enabled = true
  bootstrap_expect = 1
  encrypt = "y4q2dq5fDgr0J3CFMxoDAwnebpi+hMSW9re9TrLGP+c="
}

acl {
  enabled = true
}

tls {
  http = true
  rpc  = true

  ca_file   = "/mnt/nomad-server/nomad-ca.pem"
  cert_file = "/mnt/nomad-server/server.pem"
  key_file  = "/mnt/nomad-server/server-key.pem"
}
