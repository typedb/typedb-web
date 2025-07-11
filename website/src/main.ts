import "zone.js";
import { bootstrapApplication } from '@angular/platform-browser';
import { RootComponent } from "./root.component";
import { appConfig } from './config';

bootstrapApplication(RootComponent, appConfig)
    .catch((err) => console.error(err));


// import { ApplicationConfig, enableProdMode, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from "@angular/core";
//
// // import "prismjs";
// // import "typedb-web-common/lib/prism";
//
// // import { environment } from "./environment/environment";
// // import { PlainTextPipe } from "./framework/text/plain-text.pipe";
//
// import { RootComponent } from "./root.component";
// // import { NgcCookieConsentModule, NgcCookieConsentConfig } from "ngx-cookieconsent";
// import { withInterceptorsFromDi, provideHttpClient } from "@angular/common/http";
// // import { FormsModule } from "@angular/forms";
// import { BrowserModule, bootstrapApplication, provideClientHydration, withEventReplay } from "@angular/platform-browser";
// // import { provideAnimations } from "@angular/platform-browser/animations";
// // import { CommonModule } from "@angular/common";
// // import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from "@angular/material/core";
// // import "posthog-js/dist/recorder";
// // import "posthog-js/dist/surveys";
// // import "posthog-js/dist/exception-autocapture";
// // import "posthog-js/dist/tracing-headers";
// // import "posthog-js/dist/web-vitals";
// // import "posthog-js/dist/dead-clicks-autocapture";
// // import posthog from "posthog-js/dist/module.no-external";
// // import Intercom from "@intercom/messenger-js-sdk";
// // import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
// import { routes, RoutingModule } from "./routing.module";
// import { provideRouter } from "@angular/router";
//
// // throw new Error(`no`);
//
// // const cookieConfig: NgcCookieConsentConfig = {
// //     enabled: true,
// //     cookie: {
// //         domain: window.location.hostname,
// //     },
// //     theme: "block",
// //     content: {
// //         href: "/legal/privacy-policy",
// //     },
// //     type: "info",
// // };
//
// // const posthogProjectApiKey = environment.env === "production" ? "phc_w6b3dE1UxM9LKE2FLbDP9yiHFEXegbtxv1feHm0yigA" : "phc_kee7J4vlLnef61l6krVU8Fg5B6tYIgSEVOyW7yxwLSk";
// // posthog.init(
// //     posthogProjectApiKey,
// //     {
// //         api_host: "https://typedb.com/ph",
// //         ui_host: "https://us.posthog.com",
// //         person_profiles: "always",
// //         capture_pageview: false,
// //         capture_pageleave: true,
// //     }
// // );
//
// // Intercom({ app_id: "zof896ic" });
//
// // const globalRippleConfig: RippleGlobalOptions = {
// //     disabled: true,
// // };
// //
// // if (["production", "staging"].includes(environment.env)) {
// //     enableProdMode();
// // }
//
// // export const appConfig: ApplicationConfig = {
// //     providers: [
// //         importProvidersFrom(
// //             // BrowserModule,
// //             // CommonModule,
// //             // FormsModule,
// //             // NgcCookieConsentModule.forRoot(cookieConfig),
// //             RoutingModule,
// //         ),
// //         // PlainTextPipe,
// //         // { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
// //         // { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "outline" } },
// //         // provideAnimations(),
// //         provideHttpClient(withInterceptorsFromDi()),
// //         // provideClientHydration(),
// //     ]
// // };
//
// export const appConfig: ApplicationConfig = {
//     providers: [
//         provideBrowserGlobalErrorListeners(),
//         provideZoneChangeDetection({ eventCoalescing: true }),
//         provideRouter(routes), provideClientHydration(withEventReplay())
//     ]
// };
//
// // throw new Error("main.ts bootstrap application");
// bootstrapApplication(RootComponent, appConfig).catch((err) => console.error(err));
