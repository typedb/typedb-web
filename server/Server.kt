package grakn.web

fun main() {
    println("Hello")
}

internal class PlayApplicationLoader : ApplicationLoader {
    fun load(context: Context?): Application {
        return PlayComponent(context).application()
    }
}

internal class PlayComponent(context: ApplicationLoader.Context?) : BuiltInComponentsFromContext(context), NoHttpFiltersComponents {
    fun router(): Router {
        val pages = FileController(Paths.get("."))
        return Routes(scalaHttpErrorHandler(), pages).asJava()
    }
}
