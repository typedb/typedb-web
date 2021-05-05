package grakn.web_main.server;

import picocli.CommandLine;

public class RunOptions {

    @CommandLine.Option(descriptionKey = "local.port",
            names = {"--local_port"},
            defaultValue = ServerDefaults.DEFAULT_LOCAL_PORT + "",
            description = "Port number of server")
    private Integer localPort;

    @CommandLine.Option(descriptionKey = "keystore.file",
            names = {"--keystore_file"},
            description = "Location of keystore file")
    private String keystoreFile;

    @CommandLine.Option(descriptionKey = "keystore.password",
            names = {"--keystore_password"},
            description = "Keystore password")
    private String keystorePassword;

    public int localPort() {
        return requireProperty("local.port", localPort);
    }

    public String keystoreFile() {
        return requireProperty("keystore.file", keystoreFile);
    }

    public String keystorePassword() {
        return requireProperty("keystore.password", keystorePassword);
    }

    public static <VALUE> VALUE requireProperty(String name, VALUE property) {
        if (property != null) return property;
        else throw new RuntimeException(String.format("'%s' is not set.", name));
    }
}
