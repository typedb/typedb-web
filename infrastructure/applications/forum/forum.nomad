job "forum" {
  region = "uk"

  datacenters = ["uk"]

  type = "service"

  constraint {
    attribute = "${node.class}"
    value     = "forum"
  }

  update {
    stagger      = "30s"
    max_parallel = 1
  }

  group "forum" {
    count = 1

    network {
      mode = "bridge"

      port "https" {
        static = 443
        to = 8080
      }
    }

    task "forum" {
      driver = "docker"

      image = "ruigrakn/discourse:app"

      resources {
        cpu    = 1000
        memory = 2048
      }
    }
  }
}
