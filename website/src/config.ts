import { provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PlainTextPipe } from "./framework/text/plain-text.pipe";

import { routes } from "./routes";

export const appConfig: ApplicationConfig = {
    providers: [
        PlainTextPipe,
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withFetch()),
    ]
};
