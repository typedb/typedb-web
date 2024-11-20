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
import "posthog-js/dist/recorder";
import "posthog-js/dist/surveys";
import "posthog-js/dist/exception-autocapture";
import "posthog-js/dist/tracing-headers";
import "posthog-js/dist/web-vitals";
import "posthog-js/dist/dead-clicks-autocapture";
import posthog from "posthog-js/dist/module.no-external";
import Intercom from "@intercom/messenger-js-sdk";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

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
    const posthogProjectApiKey = environment.env === "production" ? "phc_w6b3dE1UxM9LKE2FLbDP9yiHFEXegbtxv1feHm0yigA" : "phc_kee7J4vlLnef61l6krVU8Fg5B6tYIgSEVOyW7yxwLSk";
    posthog.init(
        posthogProjectApiKey,
        {
            api_host: "https://typedb.com/ingest",
            ui_host: "https://us.posthog.com",
            person_profiles: "always",
            capture_pageview: false,
            capture_pageleave: true,
        }
    );

    Intercom({ app_id: "zof896ic" });
}

const globalRippleConfig: RippleGlobalOptions = {
    disabled: true,
};

if (["production", "staging"].includes(environment.env)) {
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
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "outline" } },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
    .catch((err) => console.error(err));
