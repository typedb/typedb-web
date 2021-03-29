job "website" {
  # TODO: Change this
  region = "us"

  # TODO: Change this
  datacenters = ["us-west-1", "us-east-1"]

  type = "service"

  update {
    stagger      = "30s"
    max_parallel = 1
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
      driver = "java"

      config {
        jar_path = "local/server/server.jar"
      }

      artifact {
        source = "https://storage.googleapis.com/vaticle-engineers-test/server.tar.gz"
      }

      env {
        SERVER_ROOT = "local/server"
      }

      resources {
        cpu    = 500
        memory = 128
      }
    }
  }
}