storage "raft" {
  path    = "/mnt/vault/data"
  node_id = "node"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
}

api_addr = "http://0.0.0.0:8200"
cluster_addr = "https://127.0.0.1:8201"
disable_mlock = true
ui = true
