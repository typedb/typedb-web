import { IMAGE_LOADER } from "@angular/common";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { PlainTextPipe } from "./framework/text/plain-text.pipe";
import { sanityImageLoader } from "./service/sanity-image-loader";

import { routes } from "./routes.browser";

export const appConfig: ApplicationConfig = {
    providers: [
        PlainTextPipe,
        { provide: IMAGE_LOADER, useValue: sanityImageLoader },
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(
            routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'disabled',
                // Root component scrolls to anchors itself, smoothly and respecting scroll-margin; the router's
                // own anchor scrolling would jump there first, so the two together read as a jump then a bounce
                anchorScrolling: 'disabled'
            })
        ),
        provideHttpClient(withFetch()),
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "outline" } },
    ]
};
