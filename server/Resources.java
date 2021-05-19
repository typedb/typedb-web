package com.vaticle.web.main.server;

import java.io.File;
import java.nio.file.Path;

public class Resources {

    private final Path resourcesDir;

    public Resources(Path resourcesDir) {
        this.resourcesDir = resourcesDir;
    }

    public File getPropertiesFile() {
        return resourcesDir.resolve("conf/web-main.properties").toFile();
    }
}
