package grakn.web.server;

import play.mvc.Controller;
import play.mvc.Result;

import java.nio.file.Path;

public class FileController extends Controller {
    private Path basedir;

    public FileController(Path basedir) {
        this.basedir = basedir;
    }

    public Result serve(String file, String defaultFile) {
        Path path = basedir.resolve(!file.isEmpty() ? file : defaultFile);
        if (path.toFile().exists()) {
            return ok(path);
        }
        else {
            return ok(basedir.resolve(defaultFile));
        }
    }
}
