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

  metadata_startup_script = "sudo systemctl start nomad-server.service"
}

resource "google_compute_network" "web_main_network" {
  name = "web-main-network"
}

resource "google_compute_address" "web_main_static_ip" {
  name = "web-main-static-ip"
}

resource "google_compute_firewall" "web_main_firewall" {
  name    = "web-main-firewall"
  network = google_compute_network.web_main_network.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
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
    network = google_compute_network.web_main_network.name

    access_config {
      nat_ip = google_compute_address.web_main_static_ip.address
    }
  }

  metadata_startup_script = "sudo systemctl start nomad-client.service"
}

