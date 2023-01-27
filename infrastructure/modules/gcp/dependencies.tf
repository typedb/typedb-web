terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.3.0"
    }

    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.7.0"
    }

    kubernetes = {
      source = "hashicorp/kubernetes"
      version = "2.15.0"
    }
  }

  required_version = ">= 1.0.11, < 2.0.0"
}
