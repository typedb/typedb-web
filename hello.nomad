job "hello" {
  region = "global"

  datacenters = ["dc1"]

  type = "service"

  update {
    stagger      = "30s"
    max_parallel = 1
  }

  group "hello" {
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

    task "hello" {
      driver = "java"

      config {
        jar_path = "local/hello.jar"
      }

      artifact {
        source = "https://storage.googleapis.com/vaticle-engineers-test/hello.tar.gz"
      }

      resources {
        cpu    = 500
        memory = 128
      }
    }
  }
}