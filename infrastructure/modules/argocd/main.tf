data "kubectl_file_documents" "namespace" {
    content = file("${path.module}/argocd-config/namespaces.yaml")
}

data "kubectl_file_documents" "argocd_install" {
    content = file("${path.module}/argocd-config/install.yaml")
}

data "kubectl_file_documents" "git_secret" {
    content = templatefile(
        "${path.module}/argocd-config/git-secret.yaml",
        {
            platform_deployment_repo = var.platform_deployment_repo
            ssh_private_key = indent(4, file(var.ssh_private_key_file))
        }
    )
}

data "kubectl_file_documents" "argo_rollouts" {
    content = file("${path.module}/argocd-config/argo-rollouts.yaml")
}

data "kubectl_file_documents" "external_secrets_operator" {
    content = file("${path.module}/argocd-config/external-secrets-operator.yaml")
}

data "kubectl_file_documents" "cluster_secret_store" {
    content = templatefile(
        "${path.module}/argocd-config/cluster-secret-store.yaml",
        {
            cluster_name = var.cluster_name
            kubernetes_service_account = var.kubernetes_service_account
            kubernetes_service_account_namespace = var.kubernetes_service_account_namespace
            project = var.project
            region = var.region
        }
    )
}

data "kubectl_file_documents" "deployment" {
    content = templatefile(
        "${path.module}/argocd-config/deployment.yaml",
        {
            platform_deployment_repo = var.platform_deployment_repo
        }
    )
}


resource "kubectl_manifest" "namespace" {
    count     = length(data.kubectl_file_documents.namespace.documents)
    yaml_body = element(data.kubectl_file_documents.namespace.documents, count.index)
}

resource "kubectl_manifest" "argocd_install" {
    depends_on = [
      kubectl_manifest.namespace,
    ]
    count     = length(data.kubectl_file_documents.argocd_install.documents)
    yaml_body = element(data.kubectl_file_documents.argocd_install.documents, count.index)
    override_namespace = "argocd"
}

resource "kubectl_manifest" "git_secret" {
    depends_on = [
      kubectl_manifest.argocd_install,
    ]
    count     = length(data.kubectl_file_documents.git_secret.documents)
    yaml_body = element(data.kubectl_file_documents.git_secret.documents, count.index)
    sensitive_fields = [ "stringData.sshPrivateKey" ]
}

resource "kubectl_manifest" "argo_rollouts" {
    depends_on = [
        kubectl_manifest.argocd_install,
    ]
    count     = length(data.kubectl_file_documents.argo_rollouts.documents)
    yaml_body = element(data.kubectl_file_documents.argo_rollouts.documents, count.index)
}

resource "kubectl_manifest" "external_secrets_operator" {
    depends_on = [
        kubectl_manifest.argocd_install,
    ]
    count     = length(data.kubectl_file_documents.external_secrets_operator.documents)
    yaml_body = element(data.kubectl_file_documents.external_secrets_operator.documents, count.index)
}

resource "kubectl_manifest" "cluster_secret_store" {
    depends_on = [
        kubectl_manifest.argocd_install,
    ]
    count     = length(data.kubectl_file_documents.cluster_secret_store.documents)
    yaml_body = element(data.kubectl_file_documents.cluster_secret_store.documents, count.index)
}

resource "kubectl_manifest" "deployment" {
    depends_on = [
        kubectl_manifest.argo_rollouts,
        kubectl_manifest.cluster_secret_store,
        kubectl_manifest.external_secrets_operator
    ]
    count     = length(data.kubectl_file_documents.deployment.documents)
    yaml_body = element(data.kubectl_file_documents.deployment.documents, count.index)
}
