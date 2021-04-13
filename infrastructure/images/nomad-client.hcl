region = "uk"
datacenter = "uk"

data_dir = "/mnt/nomad-client/data"
bind_addr = "0.0.0.0"

client {
  enabled = true
  servers = ["nomad-server:4647"]
}
