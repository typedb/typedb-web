####################
# Global variables #
####################
variable "project" {
    type = string
    description = "Project ID"
}

#####################
# Cluster variables #
#####################
variable "cluster_name" {
    type = string
    description = "Name of the GKE cluster. Must contain only lowercase letters, numbers or hyphens. Must be no more than 25 symbols long."
}

variable "zone" {
    type = string
    description = "Zone for the GKE cluster."
}

variable "num_nodes" {
    type = number
    description = "Fixed number of nodes for the GKE cluster"
}

variable "machine_type" {
    type = string
    description = "Type of the GKE cluster machines, as per https://cloud.google.com/compute/docs/machine-types"
}

variable "auto_repair" {
    type = bool
    description = "Whether nodes should auto-repair, as determined by https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-repair"
}

variable "auto_upgrade" {
    type = bool
    description = "Whether nodes should auto-upgrade when the control plane is updated, as per https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-upgrades"
}

variable "gcp_service_account_name" {
  type = string
  description = "The name attached to the GCP Service Account. This is the local-part of the Service Account email - i.e. the part before the '@'."
}

#########################
# VPC Network variables #
#########################
variable "region" {
    type = string
    description = "Region for the VPC network."
}

###########################
# Configuration variables #
###########################
variable "credentials_file" {
    type = string
    description = "Location of the credentials JSON file."
}

variable "ssh_private_key_file" {
    type = string
    description = "Location of the SSH Private Key file for ArgoCD."
}

variable "platform_deployment_repo" {
    type = string
    description = "Name of the GitHub repository that specifies the ArgoCD configuration. Must be of the form <github user>/<repo title>"
}
