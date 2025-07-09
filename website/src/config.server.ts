import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideServerRendering, withRoutes } from "@angular/ssr";
import { appConfig } from "./config";
import { serverRoutes } from "./routes.server";

const serverConfigOverrides: ApplicationConfig = {
    providers: [
        provideClientHydration(withEventReplay()),
        provideServerRendering(withRoutes(serverRoutes))
    ]
};

export const serverConfig = mergeApplicationConfig(appConfig, serverConfigOverrides);
