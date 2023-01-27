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
  docker_version = local.docker_version
  credentials_file = var.credentials_file
  workload_id_kubernetes_sa = local.workload_id_kubernetes_sa
  workload_id_namespace = local.workload_id_namespace
  gcp_service_account_email = "${var.gcp_service_account_name}@${var.project}.iam.gserviceaccount.com"
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
  kubernetes_service_account           = local.workload_id_kubernetes_sa
  kubernetes_service_account_namespace = local.workload_id_namespace
}
