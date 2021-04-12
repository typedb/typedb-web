data_dir = "/mnt/nomad-client"
bind_addr = "0.0.0.0"

client {
  enabled = true
  servers = ["nomad-server:4647"]
}

region = "uk"
datacenter = "uk"
