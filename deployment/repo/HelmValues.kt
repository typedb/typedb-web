package com.vaticle.typedb.web.deployment.repo

data class HelmValues(
    val gcpProject: String,
    val gcpServiceAccountName: String,
    val gcpSecretDockerVersion: String,
    val gkeName: String,
    val gkeLocation: String,
    val gkeServiceAccount: String,
    val deploymentRepo: String,
    val argoCDAppGKENamespace: String,
    val argoCDAppName: String,
    val helmChart: String,
) {
    fun asMap(): Map<String, String> = mapOf(
            "infrastructure.gcp.project_id" to gcpProject,
            "infrastructure.gcp.secret_manager.docker.version" to gcpSecretDockerVersion,
            "infrastructure.gcp.service_account_name" to gcpServiceAccountName,
            "infrastructure.gke.name" to gkeName,
            "infrastructure.gke.location" to gkeLocation,
            "infrastructure.gke.service_account_name" to gkeServiceAccount,
            "deployment.application-name" to argoCDAppName,
            "deployment.namespace" to argoCDAppGKENamespace,
            "deployment.target-revision" to helmChart,
    )
}
