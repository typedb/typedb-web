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

resource "google_compute_disk" "web_nomad_server_disk" {
  name  = "web-nomad-server-disk"
  type  = "pd-ssd"
  physical_block_size_bytes = 4096
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
    network = "default"
  }

  metadata_startup_script = "${path.module}/startup-nomad-server.sh"
}

resource "google_compute_instance" "web_nomad_client" {
  name                      = "web-nomad-client"
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
    network = "default"
  }

  metadata_startup_script = "${path.module}/startup-nomad-client.sh"
}

