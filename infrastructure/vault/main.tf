terraform {
  backend "gcs" {
    bucket  = "vaticle-web-prod-terraform-state"
    prefix  = "terraform/vault"
  }
}

provider "google" {
  project = "vaticle-web-prod"
  region  = "europe-west2"
  zone    = "europe-west2-b"
}

resource "google_compute_firewall" "vault_api_firewall" {
  name    = "vault-api-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["8200"]
  }

  target_tags = ["vault"]
}

resource "google_compute_address" "vault_static_ip" {
  name = "vault-static-ip"
}

resource "google_compute_disk" "vault_additional" {
  name  = "vault-additional"
  type  = "pd-ssd"
}

resource "google_compute_instance" "vault" {
  name                      = "vault"
  machine_type              = "n1-standard-2"

  boot_disk {
    initialize_params {
      image = "vaticle-web-prod/vault-2c045b5b75bda2d726274cdbca3d4967708209b2"
    }
    device_name = "boot"
  }

  attached_disk {
    source = google_compute_disk.vault_additional.name
    device_name = "vault-additional"
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
      nat_ip = google_compute_address.vault_static_ip.address
    }
  }

  tags = ["vault"]

  metadata_startup_script = file("${path.module}/startup/startup-vault.sh")
}
