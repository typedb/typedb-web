package grakn.web_main.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import picocli.CommandLine;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

import static grakn.web_main.server.ServerDefaults.PROPERTIES_FILE;
import static grakn.web_main.server.ServerDefaults.PROPERTIES_FILE_LOCAL;

public class ServerProperties {

    private static final Logger LOG = LoggerFactory.getLogger(ServerProperties.class);

    public static Properties parseProperties() {
        Properties properties = new Properties();
        boolean error = false;

        try {
            properties.load(new FileInputStream(PROPERTIES_FILE));
            LOG.info("Loaded default properties from {}", PROPERTIES_FILE);
        } catch (IOException e) {
            try {
                properties.load(new FileInputStream(PROPERTIES_FILE_LOCAL));
                LOG.info("Loaded default properties from {}", PROPERTIES_FILE_LOCAL);
            } catch (IOException e2) {
                throw new RuntimeException(String.format("Could not find/read any default properties file (tried ['%s', '%s']).", PROPERTIES_FILE, PROPERTIES_FILE_LOCAL));
            }
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

    public static Optional<RunOptions> parseCommandLine(Properties properties, String[] args) {
        RunOptions serverOptions = new RunOptions();
        CommandLine commandLine = new CommandLine(serverOptions);
        commandLine.setDefaultValueProvider(new CommandLine.PropertiesDefaultProvider(properties));

        try {
            CommandLine.ParseResult parseResult = commandLine.parseArgs(args);
            if (commandLine.isUsageHelpRequested()) {
                commandLine.usage(commandLine.getOut());
                return Optional.empty();
            } else if (commandLine.isVersionHelpRequested()) {
                commandLine.printVersionHelp(commandLine.getOut());
                return Optional.empty();
            } else {
                assert parseResult.asCommandLineList().size() == 1;
                return Optional.of(parseResult.asCommandLineList().get(0).getCommand());
            }
        } catch (CommandLine.ParameterException ex) {
            commandLine.getErr().println(ex.getMessage());
            if (!CommandLine.UnmatchedArgumentException.printSuggestions(ex, commandLine.getErr())) {
                ex.getCommandLine().usage(commandLine.getErr());
            }
            return Optional.empty();
        }
    }
}
