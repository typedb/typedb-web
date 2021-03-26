job "website" {
  # Specify this job should run in the region named "us". Regions
  # are defined by the Nomad servers' configuration.
  region = "us"

  # Spread the tasks in this job between us-west-1 and us-east-1.
  datacenters = ["us-west-1", "us-east-1"]

  type = "service"

  # Specify this job to have rolling updates, two-at-a-time, with
  # 30 second intervals.
  update {
    stagger      = "30s"
    max_parallel = 2
  }


  group "main" {
    count = 1

    network {
      port "http" {
        static = 80
      }

      port "https" {}
    }

    service {
      port = "http"

      check {
        type     = "http"
        path     = "/health"
        interval = "10s"
        timeout  = "2s"
      }
    }

    task "main" {
      driver = "docker"

      # Configuration is specific to each driver.
      config {
        image = "hashicorp/web-frontend"
      }

      env {
      }

      resources {
        cpu    = 500
        memory = 128
      }
    }
  }
}