package grakn.web_main.server;

import play.Application;
import play.ApplicationLoader;
import play.BuiltInComponentsFromContext;
import play.core.server.ProdServerStart;
import play.filters.components.NoHttpFiltersComponents;
import play.routing.Router;
import router.Routes;
import java.nio.file.Paths;
import java.util.Optional;

import static grakn.web_main.server.ServerProperties.parseCommandLine;
import static grakn.web_main.server.ServerProperties.parseProperties;

public class Server {

    public static void main(String[] args) {
        Optional<RunOptions> options = parseCommandLine(parseProperties(), args);
        if (options.isEmpty()) System.exit(0);
        configurePlayFramework(options.get());
        ProdServerStart.main(new String[] {});
    }

    private static void configurePlayFramework(RunOptions options) {
        System.setProperty("http.port", "disabled");
        System.setProperty("https.port", String.valueOf(options.localPort()));
        System.setProperty("play.server.https.keyStore.path", Paths.get(options.keystoreFile()).toAbsolutePath().toString());
        System.setProperty("play.server.https.keyStore.password", options.keystorePassword());
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
            String pagesRoot = System.getenv("PAGES_ROOT");
            if (pagesRoot == null) pagesRoot = ".";
            FileController pages = new FileController(Paths.get(pagesRoot).toAbsolutePath());
            return new Routes(scalaHttpErrorHandler(), pages).asJava();
        }
    }
}
