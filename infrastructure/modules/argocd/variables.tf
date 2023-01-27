variable "platform_deployment_repo" {
  type = string
}

variable "ssh_private_key_file" {
  type = string
}

variable "gke_auth_host" {
  type = string
}

variable "gke_cluster_ca_certificate" {
  type = string
}

variable "gke_auth_token" {
  type = string
}

variable "cluster_name" {
  type = string
}

variable "kubernetes_service_account" {
  type = string
}

variable "kubernetes_service_account_namespace" {
  type = string
}

variable "project" {
  type = string
}

variable "region" {
  type = string
}
