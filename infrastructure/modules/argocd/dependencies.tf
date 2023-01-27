terraform {
  required_providers {
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.7.0"
    }

    argocd = {
      source = "oboukili/argocd"
      version = ">= 3.2.1"
    }

    local = {
      source = "hashicorp/local"
      version = "2.2.3"
    }
  }

  required_version = ">= 1.0.11, < 2.0.0"
}
