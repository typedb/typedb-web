# TODO:
# Use HTTPS
# Deploy nomad through bazel
# Restrict nomad ports for public access
terraform {
  backend "gcs" {
    bucket  = "vaticle-web-prod-terraform-state"
    prefix  = "terraform/state"
  }
}

provider "google" {
  project = "vaticle-web-prod"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}

resource "google_compute_network" "web_network" {
  name = "web-network"
}

resource "google_compute_firewall" "web_nomad_firewall" {
  name    = "web-nomad-firewall"
  network = google_compute_network.web_network.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = ["22", "4646", "4647", "4648"]
  }
}

resource "google_compute_disk" "web_nomad_server_disk" {
  name  = "web-nomad-server-disk"
  type  = "pd-ssd"
}

resource "google_compute_instance" "web_nomad_server" {
  name                      = "web-nomad-server"
  machine_type              = "n1-standard-2"

  boot_disk {
    initialize_params {
      image = "vaticle-web-prod/nomad-server"
    }
    device_name = "boot"
  }

  attached_disk {
    source = google_compute_disk.web_nomad_server_disk.name
    device_name = "nomad-server"
  }

  service_account {
    email = "grabl-prod@vaticle-web-prod.iam.gserviceaccount.com"
    scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  network_interface {
    network = google_compute_network.web_network.name
  }

  metadata_startup_script = "sudo systemctl start nomad-server.service"
}

resource "google_compute_address" "web_main_static_ip" {
  name = "web-main-static-ip"
}

resource "google_compute_firewall" "web_main_firewall" {
  name    = "web-main-firewall"
  network = google_compute_network.web_network.name

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  target_tags = ["web-main"]
}

resource "google_compute_instance" "web_main_nomad_client" {
  name                      = "web-main-nomad-client"
  machine_type              = "n1-standard-2"

  boot_disk {
    initialize_params {
      image = "vaticle-web-prod/nomad-client"
    }
    device_name = "boot"
  }

  service_account {
    email = "grabl-prod@vaticle-web-prod.iam.gserviceaccount.com"
    scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  network_interface {
    network = google_compute_network.web_network.name

    access_config {
      nat_ip = google_compute_address.web_main_static_ip.address
    }
  }

  tags = ["web-main"]

  metadata_startup_script = "sudo systemctl start nomad-client.service"
}
