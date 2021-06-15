package com.vaticle.web.main.server;

import java.io.File;
import java.nio.file.Path;

public class Resources {

    private final Path resourcesDir;
    private final Path propertyFile;

    public Resources(Path resourcesDir, Path propertyFile) {
        this.resourcesDir = resourcesDir;
        this.propertyFile = propertyFile;
    }

    public File getPropertiesFile() {
        return resourcesDir.resolve(propertyFile).toFile();
    }
}
