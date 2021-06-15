package com.vaticle.web.main.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import picocli.CommandLine;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

public class CommandLineOptions {

    private static final Logger LOG = LoggerFactory.getLogger(CommandLineOptions.class);

    @CommandLine.Option(descriptionKey = "resources",
            names = {"--resources"},
            description = "Resource directory root")
    private String resourcesDir;

    @CommandLine.Option(descriptionKey = "pages",
            names = {"--pages"},
            description = "Pages directory root")
    private String pagesDir;

    public Path resourcesDir() {
        if (resourcesDir != null) {
            return Path.of(resourcesDir);
        } else {
            LOG.warn("'--resources' was not set at the command line. The default resource path, '{}', will be used.", defaultResourcesDir());
            return defaultResourcesDir();
        }
    }

    public Path pagesDir() {
        if (pagesDir != null) {
            return Path.of(pagesDir);
        } else {
            LOG.warn("'--pages' was not set at the command line. The default page path, '{}', will be used.", defaultPagesDir());
            return defaultPagesDir();
        }
    }

    private static Path defaultResourcesDir() {
        return Paths.get(System.getProperty("user.dir")).resolve("resources");
    }

    private static Path defaultPagesDir() {
        return Paths.get(System.getProperty("user.dir")).resolve("web/pages");
    }

    public static Optional<CommandLineOptions> parse(String[] args) {
        CommandLineOptions commandLineOptions = new CommandLineOptions();
        CommandLine commandLine = new CommandLine(commandLineOptions);

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
