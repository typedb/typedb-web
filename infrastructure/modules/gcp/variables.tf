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

variable "auto_repair" {
  type = bool
}

variable "auto_upgrade" {
  type = bool
}

variable "kubernetes_sa_namespace" {
  type = string
}

variable "kubernetes_sa_name" {
  type = string
}

variable "docker_version" {
  type = number
}

variable "credentials_file" {
  type = string
}
