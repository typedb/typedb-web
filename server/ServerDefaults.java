package grakn.web_main.server;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ServerDefaults {
    public static final File PROPERTIES_FILE = getHomeDir().resolve("server/conf/web-main.properties").toFile();
    public static final File PROPERTIES_FILE_LOCAL = getHomeDir().resolve("server/conf/web-main-local.properties").toFile();

    public static final int DEFAULT_LOCAL_PORT = 8080;

    private static Path getHomeDir() {
        return Paths.get(System.getProperty("user.dir"));
    }
}
