import { enableProdMode, importProvidersFrom } from "@angular/core";

import "typedb-web-common/lib/prism";

import { environment } from "./environment/environment";
import { PlainTextPipe } from "./framework/text/plain-text.pipe";

import { WebsiteComponent } from "./website.component";
import { WebsiteRoutingModule } from "./website-routing.module";
import { isScullyRunning, ScullyLibModule } from "@scullyio/ng-lib";
import { NgcCookieConsentModule, NgcCookieConsentConfig } from "ngx-cookieconsent";
import { withInterceptorsFromDi, provideHttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from "@angular/material/core";
import posthog from "posthog-js";

const cookieConfig: NgcCookieConsentConfig = {
    enabled: !isScullyRunning(),
    cookie: {
        domain: window.location.hostname,
    },
    theme: "block",
    content: {
        href: "/legal/privacy-policy",
    },
    type: "info",
};

if (!isScullyRunning()) {
    (window as any).posthog = posthog;
    const posthogProjectApiKey = environment.production ? "phc_w6b3dE1UxM9LKE2FLbDP9yiHFEXegbtxv1feHm0yigA" : "phc_kee7J4vlLnef61l6krVU8Fg5B6tYIgSEVOyW7yxwLSk";
    posthog.init(
        posthogProjectApiKey,
        {
            api_host: "https://us.i.posthog.com",
            person_profiles: "always",
            capture_pageview: false,
            capture_pageleave: true,
        }
    )
}

const globalRippleConfig: RippleGlobalOptions = {
    disabled: true,
};

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(WebsiteComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            CommonModule,
            FormsModule,
            NgcCookieConsentModule.forRoot(cookieConfig),
            ScullyLibModule.forRoot({ useTransferState: true, alwaysMonitor: false, manualIdle: true }),
            WebsiteRoutingModule,
        ),
        PlainTextPipe,
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
    .catch((err) => console.error(err));
