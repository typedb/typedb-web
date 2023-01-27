module "gcp" {
  source = "./modules/gcp"

  project = var.project
  cluster_name = var.cluster_name
  region = var.region
  zone = var.zone
  num_nodes = var.num_nodes
  machine_type = var.machine_type
  auto_repair = var.auto_repair
  auto_upgrade = var.auto_upgrade
  kubernetes_sa_namespace = local.kubernetes_sa_namespace
  kubernetes_sa_name = local.kubernetes_sa_name
  docker_version = local.docker_version
  credentials_file = var.credentials_file
}

module "argocd" {
  source = "./modules/argocd"

  gke_auth_host = module.gcp.gke_auth_host
  gke_auth_token = module.gcp.gke_auth_token
  gke_cluster_ca_certificate = module.gcp.gke_cluster_ca_certificate
  platform_deployment_repo = var.platform_deployment_repo
  ssh_private_key_file = var.ssh_private_key_file
  cluster_name              = var.cluster_name
  project                   = var.project
  region                    = var.region
  kubernetes_service_account           = local.kubernetes_sa_name
  kubernetes_service_account_namespace = local.kubernetes_sa_namespace
}
