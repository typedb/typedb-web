package com.vaticle.typedb.web.deployment.repo

data class HelmValues(
    val gcpProject: String,
    val gcpServiceAccountName: String,
    val gcpSecretDockerCredentialsVersion: String,
    val gcpSecretStrapiDBRootPasswordVersion: String,
    val gcpSecretStrapiDBUserPasswordVersion: String,
    val gcpSecretStrapiAppKeysVersion: String,
    val gcpSecretStrapiApiTokenSaltVersion: String,
    val gcpSecretStrapiAdminJwtSecretVersion: String,
    val gcpSecretStrapiJwtSecretVersion: String,
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
        "infrastructure.gcp.secret_manager.docker_credentials.version" to gcpSecretDockerCredentialsVersion,
        "infrastructure.gcp.secret_manager.strapi_db_root_password.version" to gcpSecretStrapiDBRootPasswordVersion,
        "infrastructure.gcp.secret_manager.strapi_db_user_password.version" to gcpSecretStrapiDBUserPasswordVersion,
        "infrastructure.gcp.secret_manager.strapi_app_keys.version" to gcpSecretStrapiAppKeysVersion,
        "infrastructure.gcp.secret_manager.strapi_api_token_salt.version" to gcpSecretStrapiApiTokenSaltVersion,
        "infrastructure.gcp.secret_manager.strapi_admin_jwt_secret.version" to gcpSecretStrapiAdminJwtSecretVersion,
        "infrastructure.gcp.secret_manager.strapi_jwt_secret.version" to gcpSecretStrapiJwtSecretVersion,
        "infrastructure.gcp.service_account_name" to gcpServiceAccountName,
        "infrastructure.gke.name" to gkeName,
        "infrastructure.gke.location" to gkeLocation,
        "infrastructure.gke.service_account_name" to gkeServiceAccount,
        "deployment.application-name" to argoCDAppName,
        "deployment.namespace" to argoCDAppGKENamespace,
        "deployment.target-revision" to helmChart,
    )
}
