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
        configurePlayFramework(PlayApplicationLoader.class);
        ProdServerStart.main(new String[] {});
    }

    private static void configurePlayFramework(Class<?> applicationLoader) {
        System.setProperty("http.port", "8080");
        System.setProperty("play.application.loader", applicationLoader.getName());
        System.setProperty("play.http.secret.key", "grakn-web-main");
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
            String serverRoot = System.getenv("SERVER_ROOT");
            if (serverRoot == null) serverRoot = "server";
            FileController pages = new FileController(Paths.get(".").resolve(serverRoot).toAbsolutePath());
            return new Routes(scalaHttpErrorHandler(), pages).asJava();
        }
    }
}
