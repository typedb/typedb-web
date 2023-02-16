terraform {
  backend "gcs" {
    bucket = "vaticle-web-prod-terraform-state"
    prefix = "terraform/applications/typedb-web"
    credentials = "credentials/gcp/prod/credentials.json"
  }

  required_version = ">= 1.0.11, < 2.0.0"
}
