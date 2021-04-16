job "web-main" {
  region = "uk"

  datacenters = ["uk"]

  type = "service"

  constraint {
    attribute = "${node.class}"
    value     = "web-main"
  }

  update {
    stagger      = "30s"
    max_parallel = 1
  }

  group "web-main" {
    count = 1

    network {
      mode = "bridge"

      port "http" {
        static = 80
        to = 8080
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
        KEYSTORE_FILE = "local/keystore.jks"
      }

      template {
        data = <<EOH
{{ with secret "web-main/keystore" }}
{{- .Data.value -}}
{{ end }}
EOH
        destination   = "local/keystore.jks"
      }

      template {
        data = <<EOH
KEYSTORE_PASSWORD="{{ with secret "web-main/keystore-password" }}{{ .Data.value }}{{ end }}"
EOH
        destination   = "local/keystore-password"
        env = true
      }

      resources {
        cpu    = 1000
        memory = 2048
      }
    }
  }
}