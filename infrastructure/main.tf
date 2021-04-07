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
  allow_stopping_for_update = true

  boot_disk {
    initialize_params {
      image = "vaticle-web-prod/nomad-server"
    }
    device_name = "boot"
  }

  attached_disk {
    source = google_compute_disk.web_nomad_server_disk.name
    device_name = "nomad"
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

  metadata_startup_script = templatefile("${path.module}/startup-nomad-server.sh", {
    persisted_disk_name = "/dev/disk/by-id/google-nomad"
    persisted_mount_point = "/mnt/nomad"
  })
}

resource "google_compute_address" "web_main_static_ip" {
  name = "web-main-static-ip"
  region  = "europe-west1"
}
