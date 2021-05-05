package grakn.web_main.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Properties;

import static java.lang.Boolean.parseBoolean;
import static java.lang.Integer.parseInt;

public class ServerProperties extends Properties {

    private static final Logger LOG = LoggerFactory.getLogger(ServerProperties.class);

    public int localPort() {
        return parseInt(getProperty("local.port", String.valueOf(ServerDefaults.DEFAULT_LOCAL_PORT)));
    }

    public boolean useHTTP() {
        return parseBoolean(getProperty("use.http", String.valueOf(ServerDefaults.DEFAULT_USE_HTTP)));
    }

    public String keystoreFile() {
        return requireProperty("keystore.file");
    }

    public String keystorePassword() {
        return requireProperty("keystore.password");
    }

    public String requireProperty(String key) {
        String value = this.getProperty(key);
        if (value != null) return value;
        else throw new RuntimeException(String.format("'%s' is not set.", key));
    }

    public static ServerProperties parse(File propertiesFile) {
        ServerProperties properties = new ServerProperties();
        boolean error = false;

        try {
            properties.load(new FileInputStream(propertiesFile));
            LOG.info("Loaded properties from {}", propertiesFile);
        } catch (IOException e) {
            throw new RuntimeException(String.format("Could not find/read properties file '%s'.", propertiesFile));
        }

        for (Map.Entry<Object, Object> entry : properties.entrySet()) {
            String val = (String) entry.getValue();
            if (val.startsWith("$")) {
                String envVarName = val.substring(1);
                if (System.getenv(envVarName) == null) {
                    LOG.error(String.format("Environment variable '%s' is not defined.", envVarName));
                    error = true;
                } else {
                    properties.put(entry.getKey(), System.getenv(envVarName));
                }
            }
        }

        if (error) throw new RuntimeException("Failed at parsing properties file.");
        else return properties;
    }
}
