import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideClientHydration, withEventReplay, ɵSharedStylesHost } from "@angular/platform-browser";
import { provideServerRendering, withRoutes } from "@angular/ssr";
import { appConfig } from "./config";
import { serverRoutesPromise } from "./routes.server";

export class NoopStylesHost extends ɵSharedStylesHost {
    override addStyles(styles: string[]): void {
        // No-op
    }
}

export async function getServerConfig() {
    const routes = await serverRoutesPromise;
    
    const serverConfigOverrides: ApplicationConfig = {
        providers: [
            provideServerRendering(withRoutes(routes)),
            { provide: ɵSharedStylesHost, useClass: NoopStylesHost },
            provideClientHydration(withEventReplay())
        ]
    };

    return mergeApplicationConfig(appConfig, serverConfigOverrides);
}
