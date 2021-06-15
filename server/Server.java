package com.vaticle.web.main.server;

import controllers.Default;
import com.vaticle.web.main.server.api.TypeDBController;
import play.Application;
import play.ApplicationLoader;
import play.BuiltInComponentsFromContext;
import play.core.server.ProdServerStart;
import play.filters.components.NoHttpFiltersComponents;
import play.routing.Router;
import router.Routes;

import java.nio.file.Paths;
import java.util.Optional;

public class Server {

    public static void main(String[] args) {
        Optional<CommandLineOptions> commandLineOptions = CommandLineOptions.parse(args);
        if (commandLineOptions.isEmpty()) System.exit(1);

        Resources resources = new Resources(commandLineOptions.get().resourcesDir(), Paths.get("conf", "web-main.properties"));
        System.setProperty("pages.root", commandLineOptions.get().pagesDir().toString());

        ServerProperties properties = ServerProperties.parse(resources.getPropertiesFile());
        configurePlayFramework(properties);

        ProdServerStart.main(new String[] {});
    }

    private static void configurePlayFramework(ServerProperties properties) {
        System.setProperty("environment", properties.environment());
        if (properties.environment().equals("local")) {
            System.setProperty("http.port", String.valueOf(properties.localPort()));
        } else {
            System.setProperty("https.port", String.valueOf(properties.localPort()));
            System.setProperty("play.server.https.keyStore.path", Paths.get(properties.keystoreFile()).toAbsolutePath().toString());
            System.setProperty("play.server.https.keyStore.password", properties.keystorePassword());
        }

        System.setProperty("play.http.secret.key", "t49XLcJXzfHk6ZoFh4Um");
        System.setProperty("play.application.loader", PlayApplicationLoader.class.getName());
        System.setProperty("play.server.provider", "play.core.server.AkkaHttpServerProvider");
    }

    public static class PlayApplicationLoader implements ApplicationLoader {

        @Override
        public Application load(Context context) {
            return new PlayComponent(context).application();
        }
    }

    static class PlayComponent extends BuiltInComponentsFromContext implements NoHttpFiltersComponents {

        public PlayComponent(ApplicationLoader.Context context) {
            super(context);
        }

        @Override
        public Router router() {
            TypeDBController typeDBController = new TypeDBController();

            Default defaultController = new Default();

            String pagesRoot = System.getProperty("pages.root");
            if (pagesRoot == null) pagesRoot = ".";
            FileController pages = new FileController(Paths.get(pagesRoot).toAbsolutePath());

            return new Routes(scalaHttpErrorHandler(), typeDBController, defaultController, pages).asJava();
        }
    }
}
