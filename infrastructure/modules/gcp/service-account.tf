resource "kubernetes_namespace" "sa" {
  metadata {
    name = var.kubernetes_sa_namespace
  }
}

resource "kubernetes_service_account" "sa" {
  metadata {
    name = var.kubernetes_sa_name
    namespace = kubernetes_namespace.sa.metadata.0.name
    annotations = {
      "iam.gke.io/gcp-service-account" = "${var.cluster_name}-sa@${var.project}.iam.gserviceaccount.com"
    }
  }
  automount_service_account_token = true
}

resource "google_service_account" "workload-identity-user-sa" {
  account_id = "${var.cluster_name}-sa"
  display_name = "${var.cluster_name} Service Account"
  project = var.project
  depends_on = [kubernetes_namespace.sa]
}

resource "google_project_iam_binding" "workload_identity-role" {
  project = var.project
  role    = "roles/iam.workloadIdentityUser"
  members  = [
    "serviceAccount:${var.project}.svc.id.goog[${kubernetes_service_account.sa.metadata.0.namespace}/${kubernetes_service_account.sa.metadata.0.name}]",
    "serviceAccount:${google_service_account.workload-identity-user-sa.account_id}@${google_service_account.workload-identity-user-sa.project}.iam.gserviceaccount.com"
  ]
}

resource "google_project_iam_member" "owner-role" {
  role = "roles/owner"
  member = "serviceAccount:${google_service_account.workload-identity-user-sa.email}"
  project = var.project
  depends_on = [kubernetes_namespace.sa]
}
