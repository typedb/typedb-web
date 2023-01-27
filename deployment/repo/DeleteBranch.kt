package com.vaticle.typedb.web.deployment.repo

import picocli.CommandLine
import picocli.CommandLine.Option
import java.nio.file.Files
import java.util.concurrent.Callable
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    exitProcess(CommandLine(DeleteBranch()).execute(*args))
}

class DeleteBranch : Callable<Int> {
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
        ]
    )
    private lateinit var deploymentBranch: String

    override fun call(): Int {
        val tempDeploymentDir = Files.createTempDirectory("deployment").toAbsolutePath()
        val repo = DeploymentRepo(tempDeploymentDir, deploymentBranch)

        repo.clone(GithubTokenFactory.readFromEnvironment(), deploymentRepo)
        return repo.deleteRemoteBranch()
    }
}
