package grakn.web_main.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Resources {

    private static final Logger LOG = LoggerFactory.getLogger(Resources.class);

    private final Path resourcesDir;

    public Resources(String resourcesDir) {
        if (resourcesDir != null) {
            this.resourcesDir = Path.of(resourcesDir);
        } else {
            LOG.warn("'--resources' was not set at the command line. The default resource path, '{}', will be used.", defaultResourcesDir());
            this.resourcesDir = defaultResourcesDir();
        }
    }

    public File getPropertiesFile() {
        return resourcesDir.resolve("conf/web-main.properties").toFile();
    }

    private static Path defaultResourcesDir() {
        return Paths.get(System.getProperty("user.dir"));
    }
}
