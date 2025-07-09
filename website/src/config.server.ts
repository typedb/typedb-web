import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from "@angular/ssr";
import { appConfig } from "./config";
import { serverRoutes } from "./routes.server";

const serverConfigOverrides: ApplicationConfig = {
    providers: [
        provideServerRendering(withRoutes(serverRoutes))
    ]
};

export const serverConfig = mergeApplicationConfig(appConfig, serverConfigOverrides);
