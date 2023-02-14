package com.vaticle.typedb.web.deployment.repo

abstract class GithubToken {
    abstract fun getUrl(repoId: String): String
    abstract fun toEnvMap(): Map<String, String>
}

class ClassicGithubToken(private val token: String): GithubToken() {
    companion object {
        const val tokenVar = "REPO_GITHUB_TOKEN"
    }
    override fun getUrl(repoId: String) =
        "https://$token@github.com/$repoId.git"

    override fun toEnvMap(): Map<String, String> =
        mapOf(tokenVar to token)
}

class FineGrainedGithubToken(private val token: String): GithubToken() {
    companion object {
        const val tokenVar = "REPO_WEB_DEPLOYMENT_FINE_GRAINED_TOKEN"
    }

    override fun getUrl(repoId: String) =
        "https://oauth2:$token@github.com/$repoId.git"

    override fun toEnvMap(): Map<String, String> =
        mapOf(tokenVar to token)
}

class GithubTokenFactory {
    companion object {
        fun readFromEnvironment(): GithubToken {
            val fineGrainedToken: String? = System.getenv(FineGrainedGithubToken.tokenVar)
            if (fineGrainedToken != null)
                return FineGrainedGithubToken(fineGrainedToken)

            val classicToken: String? = System.getenv(ClassicGithubToken.tokenVar)
            if (classicToken != null)
                return ClassicGithubToken(classicToken)

            throw RuntimeException(
                """
            Required either the environment variable ${FineGrainedGithubToken.tokenVar}
            or the environment variable ${ClassicGithubToken.tokenVar}
            to be present.
        """.trimIndent()
            )
        }
    }
}
