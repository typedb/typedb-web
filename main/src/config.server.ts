import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideServerRendering, withRoutes } from "@angular/ssr";
import { appConfig } from "./config";
import { serverRoutesPromise } from "./routes.server";

export async function getServerConfig() {
    const routes = await serverRoutesPromise;
    
    const serverConfigOverrides: ApplicationConfig = {
        providers: [
            provideServerRendering(withRoutes(routes)),
            provideClientHydration(withEventReplay())
        ]
    };

    return mergeApplicationConfig(appConfig, serverConfigOverrides);
}
