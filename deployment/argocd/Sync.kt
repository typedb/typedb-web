package com.vaticle.typedb.web.deployment.argocd

import picocli.CommandLine
import picocli.CommandLine.Option
import java.nio.file.Path
import java.nio.file.Paths
import java.util.concurrent.Callable
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    exitProcess(CommandLine(Sync()).execute(*args))
}

class Sync : Callable<Int> {
    @Option(
        names = ["--gcp-service-account-credentials"],
        description = ["The JSON credentials for the GCP Service Account."],
    )
    private var gcpServiceAccountCredentials: String? = null

    @Option(
        names = ["--gcp-service-account-credentials-file"],
        description = ["The file path to the JSON credentials for the GCP Service Account."],
    )
    private var gcpServiceAccountCredentialsFile: String? = null

    @Option(
        names = ["--gke-cluster"],
        description = ["The name of the pre-existing GKE Cluster to deploy to."]
    )
    private lateinit var gkeCluster: String

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
        description = ["The branch name of the GitHub repository holding the ArgoCD Helm Chart."],
        defaultValue = "main"
    )
    private lateinit var deploymentBranch: String

    @Option(
        names = ["--gke-namespace"],
        description = ["The GKE namespace to launch the application in."],
        defaultValue = "typedb-web"
    )
    private lateinit var gkeNamespace: String

    @Option(
        names = ["--argocd-app-name"],
        description = ["The name to assign to the ArgoCD application that manages the application image."],
        defaultValue = "typedb-web"
    )
    private lateinit var argoCDAppName: String

    @Option(
        names = ["--argocd-deployment-name"],
        description = ["The name to assign to the ArgoCD application that manages the application deployment."],
        defaultValue = "deployment"
    )
    private lateinit var deploymentAppName: String

    @Option(
        names = ["--kubernetes-connection-port"],
        description = ["The port to use locally when connecting to Kubernetes."],
    )
    private var kubernetesConnectionPort = 8081

    @Option(
        names = ["--gke-cluster-location"],
        description = ["The location that the pre-existing GKE Cluster is deployed in."],
        defaultValue = "europe-west2"
    )
    private lateinit var gkeClusterLocation: String

    @Option(
        names = ["--gcp-project"],
        description = ["The GCP project that the pre-existing GKE Cluster is in."],
    )
    private lateinit var gcpProject: String

    private val workspace = Paths.get(System.getenv("BUILD_WORKSPACE_DIRECTORY"))
    private val deploymentManifest: Path = Paths.get(
        workspace.toString(),
        "deployment", "argocd", "template", "deployment.yaml"
    )

    override fun call(): Int {
        if (gcpServiceAccountCredentials.isNullOrBlank() && gcpServiceAccountCredentialsFile.isNullOrBlank()) {
            throw IllegalArgumentException("One of --gcp-service-account-credentials or --gcp-service-account-credentials-file must be set")
        }
        val cloud = ArgoCD(
            cluster = gkeCluster,
            gkeNamespace = gkeNamespace,
            mainAppName = argoCDAppName,
            deploymentAppName = deploymentAppName,
            gcpProject = gcpProject,
            clusterRegion = gkeClusterLocation,
        )
        println(appURL(cloud))
        return 0
    }

    private fun appURL(argoCD: ArgoCD): String {
        val credentials = gcpServiceAccountCredentials?.takeIf { it.isNotBlank() }
            ?: Paths.get(gcpServiceAccountCredentialsFile!!).toFile().readText()

        return argoCD.deploy(
            deploymentManifestTemplate = deploymentManifest,
            gcpCredentials = credentials,
            deploymentRepo = deploymentRepo,
            deploymentBranch = deploymentBranch,
            kubectlPort = kubernetesConnectionPort,
        )
    }
}
