package grakn.web_main.server;

import picocli.CommandLine;

import java.util.Optional;

public class CommandLineOptions {

    @CommandLine.Option(descriptionKey = "resources",
            names = {"--resources"},
            description = "Resource directory root")
    private String resourcesDir;

    public String resourcesDir() {
        return resourcesDir;
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
