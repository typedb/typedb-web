package grakn.web


import play.Application
import play.ApplicationLoader
import play.BuiltInComponentsFromContext
import play.filters.components.NoHttpFiltersComponents
import play.routing.Router
import router.Routes
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
