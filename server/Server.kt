package grakn.web

import play.api.Application
import play.api.ApplicationLoader
import play.api.BuiltInComponentsFromContext
import play.api.NoHttpFiltersComponents
import play.api.routing.Router
import java.nio.file.Paths

fun main() {
    println("Hello")
}

internal class PlayApplicationLoader : ApplicationLoader {
    override fun load(context: ApplicationLoader.Context?): Application {
        return PlayComponent(context).application()
    }
}

internal class PlayComponent(context: ApplicationLoader.Context?) : BuiltInComponentsFromContext(context), NoHttpFiltersComponents {
    override fun router(): Router {
        val pages = FileController(Paths.get("."))
        return Routes(scalaHttpErrorHandler(), pages).asJava()
    }
}
