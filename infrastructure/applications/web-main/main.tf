terraform {
  backend "gcs" {
    bucket  = "vaticle-web-prod-terraform-state"
    prefix  = "terraform/applications/web-main"
  }
}

provider "google" {
  project = "vaticle-web-prod"
  region  = "europe-west2"
  zone    = "europe-west2-b"
}

resource "google_compute_address" "web_main_static_ip" {
  name = "web-main-static-ip"
}

resource "google_compute_firewall" "web_main_firewall" {
  name    = "web-main-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  target_tags = ["web-main"]
}

resource "google_compute_instance" "web_main" {
  name                      = "web-main"
  machine_type              = "n1-standard-2"

  boot_disk {
    initialize_params {
      image = "vaticle-web-prod/nomad-client-2c045b5b75bda2d726274cdbca3d4967708209b2"
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
      nat_ip = google_compute_address.web_main_static_ip.address
    }
  }

  tags = ["nomad-client", "web-main"]

  metadata_startup_script = templatefile("${path.module}/../../nomad/startup/startup-nomad-client.sh", {
    APPLICATION = "web-main"
  })
}
