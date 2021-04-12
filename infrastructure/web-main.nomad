job "web-main" {
  region = "global"

  datacenters = ["dc1"]

  type = "service"

  update {
    stagger      = "30s"
    max_parallel = 1
  }

  group "web-main" {
    count = 1

    network {
      port "http" {
        static = 80
      }
    }

    task "web-main" {
      driver = "java"

      config {
        jar_path = "local/web-main/server.jar"
        jvm_options = ["-Dpidfile.path=/dev/null"]
      }

      artifact {
        source = "https://storage.googleapis.com/vaticle-engineers-test/web-main.tar.gz"
      }

      env {
        PAGES_ROOT = "local/web-main/pages"
      }

      resources {
        cpu    = 500
        memory = 1024
      }
    }
  }
}