package grakn.web

import play.mvc.Controller
import java.nio.file.Path

class FileController(private val basedir: Path) : Controller() {

    fun serve(file: String, defaultFile: String): play.mvc.Result {
        val path: Path = basedir.resolve(if (file.isNotEmpty()) file else defaultFile)
        return if (path.toFile().exists()) {
            ok(path)
        } else {
            ok(basedir.resolve(defaultFile))
        }
    }
}
