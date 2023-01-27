resource "google_container_cluster" "primary" {
  name     = var.cluster_name
  location = var.region
  node_locations = [var.zone]

  # Deletes initial node pool
  # Replaces with separately managed node pool
  remove_default_node_pool = true
  initial_node_count       = 1

  private_cluster_config {
    enable_private_nodes = true
    master_ipv4_cidr_block = "10.10.10.0/28"
    #NOTE: the private endpoint *is* still enabled, this prevents the public endpoint from being disabled (see https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/container_cluster#enable_private_endpoint)
    enable_private_endpoint = false
  }
  
  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name

  workload_identity_config {
    workload_pool = "${var.project}.svc.id.goog"
  }
}

module "gke_router" {
  source  = "terraform-google-modules/cloud-router/google"
  name    = "${var.cluster_name}-router"
  network = google_compute_network.vpc.name
  project = var.project
  region  = var.region
  version = "1.3.0"

  nats = [{
    name = "${var.cluster_name}-gateway"
    source_subnetwork_ip_ranges_to_nat = "LIST_OF_SUBNETWORKS"
    subnetworks = [{
      name = google_compute_subnetwork.subnet.name
      source_ip_ranges_to_nat = ["ALL_IP_RANGES"]
    }]
  }]
}

resource "time_sleep" "wait_30_secs" {
  depends_on = [
    google_container_cluster.primary
  ]
  create_duration = "30s"
}

module "gke_auth" {
  depends_on = [ time_sleep.wait_30_secs ]
  source = "terraform-google-modules/kubernetes-engine/google//modules/auth"
  project_id = var.project
  cluster_name = google_container_cluster.primary.name
  location = google_container_cluster.primary.location
  use_private_endpoint = false
}
