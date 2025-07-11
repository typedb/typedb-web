import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from "@angular/ssr";
import { appConfig } from "./config";
import { serverRoutesPromise } from "./routes.server";

// Create a function that returns the server config as a promise
export async function getServerConfig() {
    const routes = await serverRoutesPromise;
    
    const serverConfigOverrides: ApplicationConfig = {
        providers: [
            provideServerRendering(withRoutes(routes))
        ]
    };

    return mergeApplicationConfig(appConfig, serverConfigOverrides);
}

// For backward compatibility, export a promise that resolves to the server config
export const serverConfigPromise = getServerConfig();
