import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../environment/environment";

const USER_ID_KEY = "typedb-support-agent-user";
const CHATKIT_SCRIPT_URL = "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js";

/**
 * "Ask TypeDB AI": the OpenAI ChatKit widget backed by the support-agent edge function
 * (the same backend as the docs site, Studio and Cloud). Only what the user types into the widget is sent.
 */
@Injectable({
    providedIn: "root",
})
export class SupportAgentService {
    readonly open$ = new BehaviorSubject(false);
    readonly apiUrl = environment.supportAgentUrl;
    private sessionUserId?: string;

    toggle() {
        this.open$.next(!this.open$.value);
    }

    close() {
        this.open$.next(false);
    }

    /** The ChatKit domain key is served by the backend so the site needs no build-time config. */
    async fetchDomainKey(): Promise<string> {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error(`Support agent config request failed (${response.status})`);
        const { domainKey } = await response.json();
        if (typeof domainKey !== "string" || !domainKey) throw new Error("Support agent config is missing the domain key");
        return domainKey;
    }

    /** Loads chatkit.js on demand and resolves once the <openai-chatkit> element is defined. */
    loadChatKit(): Promise<void> {
        if (customElements.get("openai-chatkit")) return Promise.resolve();
        if (!document.querySelector(`script[src="${CHATKIT_SCRIPT_URL}"]`)) {
            const script = document.createElement("script");
            script.src = CHATKIT_SCRIPT_URL;
            script.async = true;
            document.head.appendChild(script);
        }
        return customElements.whenDefined("openai-chatkit").then(() => undefined);
    }

    /** Fetch used by ChatKit for backend calls; tags requests with the anonymous visitor id. */
    readonly apiFetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const headers = new Headers(init?.headers);
        headers.set("x-support-agent-user", this.userId());
        return fetch(input, { ...init, headers });
    };

    // Anonymous per-browser id so the backend can scope thread history; shared with the docs site
    // (same storage key) so threads carry over between typedb.com and typedb.com/docs. Falls back to a
    // per-session id when storage is unavailable.
    private userId(): string {
        try {
            let id = localStorage.getItem(USER_ID_KEY);
            if (!id) {
                id = crypto.randomUUID().replace(/-/g, "");
                localStorage.setItem(USER_ID_KEY, id);
            }
            return id;
        } catch {
            this.sessionUserId ??= crypto.randomUUID().replace(/-/g, "");
            return this.sessionUserId;
        }
    }
}
