import { ApplicationConfig, importProvidersFrom, mergeApplicationConfig } from "@angular/core";
import { NgcCookieConsentConfig, NgcCookieConsentModule } from "ngx-cookieconsent";
import { appConfig } from "./config";

const cookieConsentConfig: NgcCookieConsentConfig = {
    enabled: true,
    cookie: {
        domain: window.location.hostname,
    },
    theme: "block",
    content: {
        href: "/legal/privacy-policy",
    },
    type: "info",
};

export async function getBrowserConfig() {
    const browserConfigOverrides: ApplicationConfig = {
        providers: [
            importProvidersFrom(NgcCookieConsentModule.forRoot(cookieConsentConfig)),
        ]
    };

    return mergeApplicationConfig(appConfig, browserConfigOverrides);
}
