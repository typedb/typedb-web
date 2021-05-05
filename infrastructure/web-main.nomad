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

      port "https" {
        static = 443
        to = 8080
      }
    }

    task "web-main" {
      driver = "java"

      config {
        jar_path = "local/web-main-${VERSION}/server.jar"
        jvm_options = ["-Dpidfile.path=/dev/null"]
        args = ["--resources=local/web-main-${VERSION}/resources", "--pages=local/web-main-${VERSION}/pages"]
      }

      artifact {
        source = "https://repo.grakn.ai/repository/artifact-snapshot/graknlabs_web_main/${VERSION}/web-main-${VERSION}.tar.gz"
      }

      template {
        data = <<EOH
{{ with secret "web/keystore" }}{{ .Data.value | base64Decode }}{{ end }}
EOH
        destination   = "local/keystore.jks"
      }

      template {
        data = <<EOH
LOCAL_PORT="8080"
KEYSTORE_FILE="local/keystore.jks"
KEYSTORE_PASSWORD="{{ with secret "web/keystore-password" }}{{ .Data.value }}{{ end }}"
EOH
        destination   = "local/environment"
        env = true
      }

      vault {
        policies = ["web-main"]
      }

      resources {
        cpu    = 1000
        memory = 2048
      }
    }
  }
}
