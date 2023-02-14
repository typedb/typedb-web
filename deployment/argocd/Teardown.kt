package com.vaticle.typedb.web.deployment.argocd

import picocli.CommandLine
import picocli.CommandLine.Option
import java.nio.file.Paths
import java.util.concurrent.Callable
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    exitProcess(CommandLine(Teardown()).execute(*args))
}

class Teardown : Callable<Int> {
    @Option(
        names = ["--gcp-service-account-credentials-file"],
        description = ["The file path to the JSON credentials for the GCP Service Account."],
    )
    private lateinit var gcpServiceAccountCredentialsFile: String

    @Option(
        names = ["--gke-cluster"],
        description = ["The name of the pre-existing GKE Cluster to deploy to."]
    )
    private lateinit var gkeCluster: String

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

    override fun call(): Int {
        val argoCD = ArgoCD(
            cluster = gkeCluster,
            gkeNamespace = gkeNamespace,
            mainAppName = argoCDAppName,
            deploymentAppName = deploymentAppName,
            gcpProject = gcpProject,
            clusterRegion = gkeClusterLocation,
        )

        val credentials = Paths.get(gcpServiceAccountCredentialsFile).toFile().readText()
        argoCD.teardown(credentials, kubernetesConnectionPort)
        return 0
    }
}
