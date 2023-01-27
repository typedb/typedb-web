resource "kubernetes_namespace" "workload_id" {
  metadata {
    name = var.workload_id_namespace
  }
}

resource "kubernetes_service_account" "workload_id" {
  metadata {
    name = var.workload_id_kubernetes_sa
    namespace = kubernetes_namespace.workload_id.metadata.0.name
    annotations = {
      "iam.gke.io/gcp-service-account" = var.gcp_service_account_email
    }
  }
  automount_service_account_token = true
}


resource "google_project_iam_binding" "workload_identity-role" {
  project = var.project
  role    = "roles/iam.workloadIdentityUser"
  members  = [
    "serviceAccount:${var.project}.svc.id.goog[${kubernetes_service_account.workload_id.metadata.0.namespace}/${kubernetes_service_account.workload_id.metadata.0.name}]",
    "serviceAccount:${var.gcp_service_account_email}"
  ]
}
