package grakn.web

class FileController(basedir: java.nio.file.Path) : Controller() {

    private val basedir: java.nio.file.Path

    init {
        this.basedir = basedir
    }

    fun serve(file: String, defaultFile: String?): Result {
        val path: java.nio.file.Path = basedir.resolve(if (!file.isEmpty()) file else defaultFile)
        return if (path.toFile().exists()) {
            ok(path)
        } else {
            ok(basedir.resolve(defaultFile))
        }
    }
}
