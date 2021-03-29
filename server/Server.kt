package grakn.web

import play.Application
import play.ApplicationLoader
import play.BuiltInComponentsFromContext
import play.core.server.ProdServerStart
import play.filters.components.NoHttpFiltersComponents
import play.routing.Router
import router.Routes
import java.nio.file.Paths

fun main() {
    configurePlayFramework(PlayApplicationLoader::class.java)
    ProdServerStart.main(arrayOf())
}

fun configurePlayFramework(applicationLoader: Class<*>) {
    System.setProperty("http.port", "8080")
    System.setProperty("play.application.loader", applicationLoader.name)
    System.setProperty("play.http.secret.key", "grakn-web-main")
    System.setProperty("play.server.provider", "play.core.server.AkkaHttpServerProvider")
}

class PlayApplicationLoader : ApplicationLoader {
    override fun load(context: ApplicationLoader.Context?): Application {
        return PlayComponent(context).application()
    }
}

class PlayComponent(context: ApplicationLoader.Context?) : BuiltInComponentsFromContext(context), NoHttpFiltersComponents {
    override fun router(): Router {
        val pages = FileController(Paths.get(".").resolve(System.getenv("SERVER_ROOT") ?: ""))
        return Routes(scalaHttpErrorHandler(), pages).asJava()
    }
}
