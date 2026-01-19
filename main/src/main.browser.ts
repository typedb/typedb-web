import "zone.js";
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from "./environment/environment";
import { RootComponent } from "./root.component";
import { appConfig } from './config';
import "posthog-js/dist/recorder";
import "posthog-js/dist/surveys";
import "posthog-js/dist/exception-autocapture";
import "posthog-js/dist/tracing-headers";
import "posthog-js/dist/web-vitals";
import "posthog-js/dist/dead-clicks-autocapture";
import posthog from "posthog-js/dist/module.no-external";

const posthogProjectApiKey = environment.env === "production" ? "phc_w6b3dE1UxM9LKE2FLbDP9yiHFEXegbtxv1feHm0yigA" : "phc_kee7J4vlLnef61l6krVU8Fg5B6tYIgSEVOyW7yxwLSk";
posthog.init(
    posthogProjectApiKey,
    {
        api_host: "https://typedb.com/ph",
        ui_host: "https://us.posthog.com",
        person_profiles: "always",
        // Production: auto-capture pageviews (each navigation is a full page load)
        // Development: manual capture via SPA navigation events
        capture_pageview: environment.env === "production",
        capture_pageleave: true,
        disable_session_recording: true,
    }
);

bootstrapApplication(RootComponent, appConfig)
    .catch((err) => console.error(err));

