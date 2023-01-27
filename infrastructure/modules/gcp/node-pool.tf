resource "google_container_node_pool" "primary_nodes" {
  name       = "${google_container_cluster.primary.name}-node-pool"
  location   = var.region
  node_locations = [var.zone]
  cluster    = google_container_cluster.primary.name
  node_count = var.num_nodes

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    labels = {
      env = var.project
    }

    machine_type = var.machine_type
    tags         = ["gke-node"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }

  management {
    auto_repair = var.auto_repair
    auto_upgrade = var.auto_upgrade
  }
}
