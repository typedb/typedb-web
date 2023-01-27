provider "google" {
  project = var.project
  region = var.region
  credentials = file(var.credentials_file)
}

provider "kubectl" {
  host                   = module.gke_auth.host
  cluster_ca_certificate = module.gke_auth.cluster_ca_certificate
  token                  = module.gke_auth.token
  load_config_file       = true
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
}
