package grakn.web.server;

import play.Application;
import play.ApplicationLoader;
import play.BuiltInComponentsFromContext;
import play.core.server.ProdServerStart;
import play.filters.components.NoHttpFiltersComponents;
import play.routing.Router;
import router.Routes;
import java.nio.file.Paths;

public class Server {

    public static void main(String[] args) {
        configurePlayFramework();
        ProdServerStart.main(new String[] {});
    }

    private static void configurePlayFramework() {
        System.setProperty("http.port", "disabled");
        System.setProperty("https.port", System.getenv("LOCAL_PORT"));
        System.setProperty("play.server.https.keyStore.path", Paths.get(System.getenv("KEYSTORE_FILE")).toAbsolutePath().toString());
        System.setProperty("play.server.https.keyStore.password", System.getenv("KEYSTORE_PASSWORD"));
        System.setProperty("play.http.secret.key", System.getenv("APPLICATION_SECRET"));
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
