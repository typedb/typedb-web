job "web-docs" {
  region = "uk"

  datacenters = ["uk"]

  type = "service"

  constraint {
    attribute = "${node.class}"
    value     = "web-docs"
  }

  update {
    stagger      = "30s"
    max_parallel = 1
  }

  group "web-docs" {
    count = 1

    network {
      mode = "bridge"

      port "https" {
        static = 443
        to = 8080
      }
    }

    task "web-docs" {
      driver = "exec"

      config {
        command = "/usr/bin/which"
        args    = ["git"]
      }

      vault {
        policies = ["web-docs"]
      }

      resources {
        cpu    = 1000
        memory = 2048
      }
    }
  }
}
