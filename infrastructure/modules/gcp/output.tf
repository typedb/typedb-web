output "service_account_name" {
  value = google_service_account.workload-identity-user-sa.account_id
}

output "gke_auth_host" {
  value = module.gke_auth.host
}

output "gke_cluster_ca_certificate" {
  value = module.gke_auth.cluster_ca_certificate
}

output "gke_auth_token" {
  value = module.gke_auth.token
}

output "service_account_namespace" {
  value = kubernetes_namespace.sa.metadata.0.name
}
