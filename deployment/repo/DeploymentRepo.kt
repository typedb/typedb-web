package com.vaticle.typedb.web.deployment.repo

import com.vaticle.bazel.distribution.common.Logging
import com.vaticle.bazel.distribution.common.Logging.LogLevel
import com.vaticle.bazel.distribution.common.Logging.Logger
import com.vaticle.bazel.distribution.common.shell.Shell
import org.apache.commons.io.FileUtils
import java.io.FileFilter
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import kotlin.io.path.isDirectory

class DeploymentRepo(private val manifestRepo: Path, private val branch: String) {
    private val shell = Shell(Logger(LogLevel.DEBUG))
    private val gitEmail = "noreply@factory.vaticle.com"
    private val gitUserName = "Vaticle Factory"

    init {
        if (!manifestRepo.isDirectory())
            throw IllegalArgumentException("Passed a non-directory $manifestRepo as the output directory.")
    }

    fun clone(accessToken: GithubToken, deploymentRepoId: String) {
        if (!manifestRepo.toFile().listFiles().isNullOrEmpty()) {
            FileUtils.deleteDirectory(manifestRepo.toFile())
            FileUtils.forceMkdir(manifestRepo.toFile())
        }

        shell.execute(
            listOf("git", "clone", accessToken.getUrl(deploymentRepoId), "."),
            baseDir = manifestRepo,
            outputIsSensitive = true
        )
        shell.execute(listOf("git", "config", "user.email", gitEmail), baseDir = manifestRepo)
        shell.execute(listOf("git", "config", "user.name", "'$gitUserName'"), baseDir = manifestRepo)

        val branchExistsRemotely = shell.execute(
            listOf("git", "ls-remote", "--heads", "origin", branch),
            baseDir = manifestRepo,
        ).output.string.isNotBlank()

        if (branchExistsRemotely)
            shell.execute(listOf("git", "switch", branch), baseDir = manifestRepo)
        else {
            shell.execute(listOf("git", "checkout", "-b", branch), baseDir = manifestRepo)
            shell.execute(listOf("git", "push", "origin", branch), baseDir = manifestRepo)
        }
    }

    fun renderManifests(helmValues: HelmValues, helmPackage: Path) {
        overwrite(helmPackage, manifestRepo)

        val helmTemplates = Paths.get(helmPackage.toString(), "apps", "templates").toFile()
        helmTemplates.listFiles()?.forEach { helmTemplate ->
            if (helmTemplate.isFile) {
                val renderedManifest = Paths.get(
                    manifestRepo.toString(), "apps", "templates", helmTemplate.name
                )
                val outputYaml = renderTemplate(helmValues.asMap(), helmTemplate.readText())
                    .split("\n")
                println("Writing manifest ${renderedManifest.toFile().name}:")
                println(outputYaml.joinToString("\n"))
                Files.write(renderedManifest, outputYaml)
            }
        }
    }

    private fun overwrite(inputDir: Path, outputDir: Path) {
        val filesToCopy = FileFilter { !(it.isDirectory && it.name == ".git")  }
        outputDir.toFile().listFiles(filesToCopy)?.forEach { it.deleteRecursively() }
        FileUtils.copyDirectory(inputDir.toFile(), outputDir.toFile(), filesToCopy)
    }

    private fun renderTemplate(templateValues: Map<String, String>, template: String): String {
        var rendered = template
        templateValues.forEach { (key, value) ->
            rendered = rendered.replace("\${$key}", value)
        }
        return rendered
    }

    fun gitCommitAndPush() {
        val gitDiffSummary = shell.execute(listOf("git", "diff", "--shortstat"), baseDir = manifestRepo)
            .outputString()
            .trim()

        val changesMessage =
            if (gitDiffSummary.isBlank())
                "No changes made."
            else
                "Changes: $gitDiffSummary"

        shell.execute(listOf("git", "add", "."), baseDir = manifestRepo)
        shell.execute(
            listOf("git", "commit", "--allow-empty", "-m", "Manifests generated through script. $changesMessage"),
            baseDir = manifestRepo
        )

        val maxRetries = 3
        var retryCount = 0
        while (retryCount < maxRetries) {
            shell.execute(
                listOf("git", "pull", "origin", branch),
                baseDir = manifestRepo
            )
            val pushResult = shell.execute(
                listOf("git", "push", "-u", "origin", branch),
                baseDir = manifestRepo,
                throwOnError = false
            )
            if (pushResult.exitValue == 0) break
            else {
                // cover the edge case where someone else has already pushed
                retryCount++
                if (retryCount == maxRetries)
                    throw RuntimeException("Exceeded retry limit of [$maxRetries] attempting to push to Git. Aborting.")
            }
        }
    }

    fun deleteRemoteBranch(): Int {
        val isInGitRepo = shell.execute(
            listOf("git", "rev-parse", "--is-inside-work-tree"),
            baseDir = manifestRepo
        ).outputString().trim() == "true"

        if (!isInGitRepo)
            throw RuntimeException("""
                Could not delete the remote branch. 
                The base directory ${manifestRepo.toAbsolutePath()} is not a Git repository.
            """.trimIndent())

        return shell.execute(listOf("git", "push", "--delete", "origin", branch), baseDir = manifestRepo).exitValue
    }

}
