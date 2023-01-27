variable "project" {
  type = string
}

variable "cluster_name" {
  type = string
}

variable "region" {
  type = string
}

variable "zone" {
  type = string
}

variable "num_nodes" {
  type = number
}

variable "machine_type" {
  type = string
}

variable "workload_id_namespace" {
  type = string
}

variable "workload_id_kubernetes_sa" {
  type = string
}

variable "auto_repair" {
  type = bool
}

variable "auto_upgrade" {
  type = bool
}

variable "docker_version" {
  type = number
}

variable "credentials_file" {
  type = string
}

variable "gcp_service_account_email" {
  type = string
}
