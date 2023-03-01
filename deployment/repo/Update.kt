package com.vaticle.typedb.web.deployment.repo

import picocli.CommandLine
import picocli.CommandLine.Option
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*
import java.util.concurrent.Callable
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    exitProcess(CommandLine(Update()).execute(*args))
}

class Update : Callable<Int> {
    @Option(
            names = ["--gcp-project"],
            description = [
                "The location that the pre-existing GKE Cluster is deployed in.",
            ]
    )
    private lateinit var gcpProject: String

    @Option(
            names = ["--gcp-service-account-name"],
            description = [
                "The name of the GCP Service Account.",
            ],
    )
    private lateinit var gcpServiceAccountName: Optional<String>

    @Option(
        names = ["--gke-cluster"],
        description = [
            "The name of the pre-existing Kubernetes Cluster to deploy the application to.",
        ]
    )
    private lateinit var gkeCluster: String

    @Option(
            names = ["--gke-cluster-location"],
            description = [
                "The location that the pre-existing GKE Cluster is deployed in.",
            ],
            defaultValue = "europe-west2"
    )
    private lateinit var gkeClusterLocation: String

    @Option(
            names = ["--gke-service-account"],
            description = [
                "The GKE Kubernetes Service Account.",
            ],
            defaultValue = "gcp-service-account-2"
    )
    private lateinit var gkeServiceAccount: String

    @Option(
        names = ["--deployment-repo"],
        description = [
            "The full name of the GitHub repository holding the ArgoCD Helm Chart.",
            "Must be of the form <github user name>/<github repository title>"
        ]
    )
    private lateinit var deploymentRepo: String


    @Option(
        names = ["--deployment-repo-branch"],
        description = [
            "The branch name of the GitHub repository holding the ArgoCD Helm Chart.",
        ],
        defaultValue = "main"
    )

    private lateinit var deploymentRepoBranch: String

    @Option(
        names = ["--gke-namespace"],
        description = [
            "The GKE namespace to launch the application in.",
        ],
        defaultValue = "typedb-web"
    )
    private lateinit var argoCDAppGKENamespace: String

    @Option(
        names = ["--argocd-app-name"],
        description = [
            "The application name to assign to the image.",
        ],
        defaultValue = "typedb-web"
    )

    private lateinit var argoCDAppName: String

    @Option(
        names = ["--helm-chart"],
        description = [
            "The Helm Chart to deploy.",
            "To deploy a Helm Chart that launches a specific commit of the application, supply",
            "0.0.0-COMMIT_SHA",
            "where COMMIT_SHA is the SHA of the commit."
        ],
    )
    lateinit var helmChart: String

    private val workspace = Paths.get(System.getenv("BUILD_WORKSPACE_DIRECTORY"))
    private val deploymentHelmPackage: Path = Paths.get(
        workspace.toString(),
        "deployment", "repo", "template", "deployment-repo"
    )

    private val gcpSecretDockerCredentialsVersion = "1" // Helm expects this to be a string
    private val gcpSecretStrapiDBRootPasswordVersion = "1"
    private val gcpSecretStrapiDBUserPasswordVersion = "1"
    private val gcpSecretStrapiAppKeysVersion = "1"
    private val gcpSecretStrapiApiTokenSaltVersion = "1"
    private val gcpSecretStrapiTransferTokenSaltVersion = "1"
    private val gcpSecretStrapiAdminJwtSecretVersion = "1"
    private val gcpSecretStrapiJwtSecretVersion = "1"
    private val gcpSecretStrapiBackupEncryptionKeyVersion = "1"

    override fun call(): Int {
        val tempDeploymentDir = Files.createTempDirectory("deployment").toAbsolutePath()
        val repo = DeploymentRepo(tempDeploymentDir, deploymentRepoBranch)

        repo.clone(GithubTokenFactory.readFromEnvironment(), deploymentRepo)
        val helmValues = HelmValues(
            gcpProject = gcpProject,
            gcpServiceAccountName = gcpServiceAccountName.orElse("$gkeCluster-sa"),
            gcpSecretDockerCredentialsVersion = gcpSecretDockerCredentialsVersion,
            gcpSecretStrapiDBRootPasswordVersion = gcpSecretStrapiDBRootPasswordVersion,
            gcpSecretStrapiDBUserPasswordVersion = gcpSecretStrapiDBUserPasswordVersion,
            gcpSecretStrapiAppKeysVersion = gcpSecretStrapiAppKeysVersion,
            gcpSecretStrapiApiTokenSaltVersion = gcpSecretStrapiApiTokenSaltVersion,
            gcpSecretStrapiTransferTokenSaltVersion = gcpSecretStrapiTransferTokenSaltVersion,
            gcpSecretStrapiAdminJwtSecretVersion = gcpSecretStrapiAdminJwtSecretVersion,
            gcpSecretStrapiJwtSecretVersion = gcpSecretStrapiJwtSecretVersion,
            gcpSecretStrapiBackupEncryptionKeyVersion = gcpSecretStrapiBackupEncryptionKeyVersion,
            gkeName = gkeCluster,
            gkeLocation = gkeClusterLocation,
            gkeServiceAccount = gkeServiceAccount,
            deploymentRepo = deploymentRepo,
            argoCDAppGKENamespace = argoCDAppGKENamespace,
            argoCDAppName = argoCDAppName,
            helmChart = helmChart
        )
        repo.renderManifests(helmValues, deploymentHelmPackage)
        repo.gitCommitAndPush()

        return 0
    }
}
