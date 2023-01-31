package com.vaticle.web.main.server;

import play.mvc.Controller;
import play.mvc.Result;

import java.nio.file.Path;
import java.nio.file.Paths;

public class FileController extends Controller {
    private Path basedir;
    private String robotsTxt;

    public FileController(Path basedir, String robotsTxt) {
        this.basedir = basedir;
        this.robotsTxt = robotsTxt;
    }

    public Result serve(String file, String defaultFile) {
        Path path = basedir.resolve(file);
        if (path.toFile().isFile()) {
            return ok(path);
        } else if (path.resolve(defaultFile).toFile().isFile()) {
            return ok(path.resolve(defaultFile));
        } else if (Paths.get(path.toString() + ".html").toFile().isFile()) {
            return ok(Paths.get(path.toString() + ".html"));
        } else {
            return ok(basedir.resolve(defaultFile));
        }
    }

    public Result robotsTxt() {
        return ok(robotsTxt);
    }
}
