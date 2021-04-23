terraform {
  backend "gcs" {
    bucket  = "vaticle-web-prod-terraform-state"
    prefix  = "terraform/applications/web-docs"
  }
}

provider "google" {
  project = "vaticle-web-prod"
  region  = "europe-west2"
  zone    = "europe-west2-b"
}

resource "google_compute_address" "web_docs_static_ip" {
  name = "web-docs-static-ip"
}

resource "google_compute_firewall" "web_docs_firewall" {
  name    = "web-docs-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  target_tags = ["web-docs"]
}

resource "google_compute_instance" "web_docs" {
  name                      = "web-docs"
  machine_type              = "n1-standard-2"

  boot_disk {
    initialize_params {
      image = "vaticle-web-prod/nomad-client-77101614b940b872a97efa8ecca7783b2e4471a2"
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
    network = "default"

    access_config {
      nat_ip = google_compute_address.web_docs_static_ip.address
    }
  }

  tags = ["nomad-client", "web-docs"]

  metadata_startup_script = templatefile("${path.module}/../../nomad/startup/startup-nomad-client.sh", {
    APPLICATION = "web-docs"
  })
}
