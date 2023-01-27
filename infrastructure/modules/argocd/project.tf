provider "kubectl" {
  host                   = var.gke_auth_host
  cluster_ca_certificate = var.gke_cluster_ca_certificate
  token                  = var.gke_auth_token
  load_config_file       = true
}
