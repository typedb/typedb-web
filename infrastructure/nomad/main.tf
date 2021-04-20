terraform {
  backend "gcs" {
    bucket  = "vaticle-web-prod-terraform-state"
    prefix  = "terraform/nomad"
  }
}

provider "google" {
  project = "vaticle-web-prod"
  region  = "europe-west2"
  zone    = "europe-west2-b"
}

resource "google_compute_firewall" "nomad_server_http_firewall" {
  name    = "nomad-server-http-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["4646"]
  }

  target_tags = ["nomad-server"]
}

resource "google_compute_firewall" "nomad_server_rpc_firewall" {
  name    = "nomad-server-rpc-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["4647"]
  }

  target_tags = ["nomad-server"]
  source_tags = ["nomad-client"]
}

resource "google_compute_address" "nomad_server_static_ip" {
  name = "nomad-server-static-ip"
}

resource "google_compute_disk" "nomad_server_additional" {
  name  = "nomad-server-additional"
  type  = "pd-ssd"
}

resource "google_compute_instance" "nomad_server" {
  name                      = "nomad-server"
  machine_type              = "n1-standard-2"

  boot_disk {
    initialize_params {
      image = "vaticle-web-prod/nomad-server-2c045b5b75bda2d726274cdbca3d4967708209b2"
    }
    device_name = "boot"
  }

  attached_disk {
    source = google_compute_disk.nomad_server_additional.name
    device_name = "nomad-server-additional"
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
      nat_ip = google_compute_address.nomad_server_static_ip.address
    }
  }

  tags = ["nomad-server"]

  metadata_startup_script = file("${path.module}/startup/startup-nomad-server.sh")
}
