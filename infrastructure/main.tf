terraform {
  backend "gcs" {
    bucket  = "vaticle-web-prod-terraform-state"
    prefix  = "terraform/state"
  }
}

provider "google" {
  project = "vaticle-web-prod"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_compute_address" "web_main_static_ip" {
  name = "web-main-static-ip"
}

resource "google_compute_instance" "web_main" {
  name                      = "web-main"
  machine_type              = "n1-standard-2"
  allow_stopping_for_update = true

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2004-lts"
    }
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
}
