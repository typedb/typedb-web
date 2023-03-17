package com.vaticle.typedb.web.deployment.argocd

import com.vaticle.bazel.distribution.common.Logging.LogLevel
import com.vaticle.bazel.distribution.common.Logging.Logger
import com.vaticle.bazel.distribution.common.shell.Shell
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.Base64

class ArgoCD(
    private val cluster: String,
    private val gkeNamespace: String,
    private val mainAppName: String,
    private val deploymentAppName: String,
    private val gcpProject: String,
    private val clusterRegion: String,
    ) {
    private val shell = Shell(Logger(LogLevel.DEBUG))

    fun deploy(
        deploymentManifestTemplate: Path,
        gcpCredentials: String,
        deploymentRepo: String,
        deploymentBranch: String,
        kubectlPort: Int
    ): String {
        val clusterConnection = connectToCluster(gcpCredentials, kubectlPort)
        try {
            val deploymentManifest = writeDeploymentManifest(deploymentManifestTemplate, deploymentRepo, deploymentBranch)
            println("ArgoCD lauching deployment app:")
            println(deploymentManifest.toFile().readText())
            shell.execute(listOf("argocd", "app", "create", deploymentAppName, "--file", deploymentManifest.toString(), "--upsert"))

            listOf(
                deploymentAppName,
                "external-secrets-operator",
                "cluster-secret-store",
                "argo-rollouts",
                mainAppName
            ).forEach { waitForSync(it) }

            return deployedURLs(gkeNamespace)
        }
        finally {
            clusterConnection.destroy()
        }
    }

    fun teardown(gcpCredentials: String, kubectlPort: Int) {
        val clusterConnection = connectToCluster(gcpCredentials, kubectlPort)
        try {
            shell.execute(listOf("argocd", "app", "delete", mainAppName))
            shell.execute(listOf("argocd", "app", "delete", deploymentAppName))
            shell.execute(listOf("kubectl", "delete", "namespace", gkeNamespace))
        }
        finally {
            clusterConnection.destroy()
        }
    }

    private fun connectToCluster(gcpCredentials: String, kubectlPort: Int): Process {
        val credentialsFile = writeGoogleCredentials(gcpCredentials)
        gcloudLogin(cluster, credentialsFile)
        val connection = spawnArgoCDConnection(kubectlPort)
        argoCDLogin(kubectlPort)

        return connection
    }

    private fun writeGoogleCredentials(credentials: String): Path {
        val outputFolder = Files.createTempDirectory("google-credentials").toAbsolutePath()
        val outputFile = Paths.get(outputFolder.toString(), "credentials.json")
        Files.write(outputFile, credentials.split("\n"))
        return outputFile
    }

    private fun gcloudLogin(cluster: String, gsaCredFile: Path) {
        shell.execute(listOf("gcloud", "auth", "activate-service-account", "--key-file=$gsaCredFile"))
        shell.execute(listOf("gcloud", "config", "set", "project", gcpProject))
        val gcloudLoginAttempt = shell.execute(listOf(
            "gcloud", "container", "clusters", "get-credentials", cluster, "--region", clusterRegion, "--project", gcpProject
        )).outputString()

        if (gcloudLoginAttempt.lowercase().contains("cluster $cluster is not running"))
            throw RuntimeException("The cluster $cluster is not running.")
    }

    private fun spawnArgoCDConnection(kubectlPort: Int): Process {
        if (isKubectlPortForwarding(kubectlPort))
            throw RuntimeException("""
                Kubectl server is already port forwarding to port $kubectlPort. 
                Please kill this port-forwarding, so that a managed port-forwarding can be started. 
            """)

        if (isPortInUse(kubectlPort))
            throw RuntimeException("""
                Could not create a managed connection to Kubernetes on port $kubectlPort. 
                Port $kubectlPort is already in use.
            """.trimIndent())

        val portForwarding = ProcessBuilder(
            listOf("kubectl", "port-forward", "svc/argocd-server", "-n", "argocd", "$kubectlPort:443"))
        .start()
        Thread.sleep(30_000)

        for (i in 1 .. 10) {
            if (isKubectlPortForwarding(kubectlPort)) {
                println("kubectl server successfully forwarded to port $kubectlPort.")
                return portForwarding
            }
            Thread.sleep(5_000)
        }

        throw RuntimeException("Could not forward kubectl server to port $kubectlPort.")

    }

    private fun argoCDLogin(kubectlPort: Int) {
        val byteStreamPassword = shell.execute(
            listOf(
                "kubectl", "-n", "argocd", "get", "secret", "argocd-initial-admin-secret",
                "-o", "jsonpath={.data.password}"
            ),
            outputIsSensitive = true
        )
            .outputString()
            .split("\n").last()
        val passwordBytes = Base64.getDecoder().decode(byteStreamPassword)
        val password = String(passwordBytes, StandardCharsets.UTF_8)

        shell.execute(
            listOf("argocd", "login", "localhost:$kubectlPort", "--insecure", "--username", "admin", "--password", password),
            throwOnError = false,
            outputIsSensitive = true
        )
        println("Logged in to ArgoCD.")

        shell.execute(listOf("argocd", "cluster", "add", "gke_${gcpProject}_${clusterRegion}_$cluster"))
        shell.execute(listOf("kubectl", "config", "set-context", "--current", "--namespace=argocd"))
    }

    private fun writeDeploymentManifest(deploymentTemplate: Path, repo: String, branch: String): Path {
        val templateYaml = deploymentTemplate.toFile().readText()
        val templateValues = mapOf(
                "deployment-name" to deploymentAppName,
                "repo" to repo,
                "branch" to branch,
                "gke-namespace" to gkeNamespace
        )
        var renderedYaml = templateYaml
        templateValues.forEach { (key, value) ->
            renderedYaml = renderedYaml.replace("\${$key}", value)
        }

        val outputFolder = Files.createTempDirectory("config").toAbsolutePath()
        val outputFile = Paths.get(outputFolder.toString(), deploymentTemplate.toFile().name)
        Files.write(outputFile, renderedYaml.split("\n"))
        return outputFile
    }

    private fun waitForSync(app: String, waitSeconds: Int = 20, attempts: Int = 45) {
        val nonHealthyStates = listOf("progressing", "degraded", "suspended")

        for (i in 1 .. attempts) {
            val syncResult = shell.execute(listOf("argocd", "app", "sync", app, "--prune"), outputIsSensitive = true)
                .outputString()
            if (nonHealthyStates.all { !syncResult.lowercase().contains(it) })
                break

            println("Waiting for $app to finish launching (waited ${i * waitSeconds}s)")
            Thread.sleep((waitSeconds * 1000).toLong())
        }
        println("$app has finished deploying")
    }

    private fun deployedURLs(gkeNamespace: String): String {
        val services = shell.execute(listOf("kubectl", "get", "services", "-n", gkeNamespace))
            .output.string.split("\n")

        val ipAddressPattern = Regex("^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}\$")

        val newProductionIP = services.singleOrNull { it.contains("server-production") }
            ?.split(Regex("\\s+"))
            ?.getOrNull(3)
            ?.takeIf { ipAddressPattern.matches(it) }
            ?.let { "typedb website (production): http://$it" }

        val newStagingIP = services.singleOrNull { it.contains("server-staging") }
            ?.split(Regex("\\s+"))
            ?.getOrNull(3)
            ?.takeIf { ipAddressPattern.matches(it) }
            ?.let { "typedb website (staging): http://$it" }

        return "$newProductionIP\n$newStagingIP"
    }

    private fun isPortInUse(port: Int): Boolean =
        shell.execute(listOf("lsof", "-i", ":$port"), throwOnError = false, outputIsSensitive = true)
            .outputString()
            .isNotBlank()

    private fun isKubectlPortForwarding(port: Int): Boolean =
        shell.execute(listOf("lsof", "-i", ":$port"), throwOnError = false, outputIsSensitive = true)
            .outputString()
            .contains("kubectl")
}
