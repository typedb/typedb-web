import { provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { PlainTextPipe } from "./framework/text/plain-text.pipe";

import { routes } from "./routes";

export const appConfig: ApplicationConfig = {
    providers: [
        PlainTextPipe,
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: "enabled" })),
        provideHttpClient(withFetch()),
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "outline" } },
    ]
};
