import { Inject, Injectable, DOCUMENT } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, distinctUntilChanged, filter, map } from "rxjs";

const SITE_URL = "https://typedb.com";

@Injectable({
    providedIn: "root",
})
export class CanonicalLinkService {
    private href$ = new BehaviorSubject<string | null>(null);
    private override$ = new BehaviorSubject<string | null>(null);

    constructor(@Inject(DOCUMENT) doc: Document, private meta: Meta, router: Router) {
        const linkEl = doc.createElement("link");
        linkEl.rel = "canonical";
        doc.head.appendChild(linkEl);

        // Set default canonical on navigation
        router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map((e) => `${SITE_URL}${e.url.split(/[#?]/)[0]}`),
        ).subscribe((url) => {
            this.href$.next(url);
            this.override$.next(null);
        });

        // Effective canonical = override if set, otherwise default
        this.href$.pipe(
            map(() => this.override$.value || this.href$.value),
            filter((v): v is string => !!v),
            distinctUntilChanged(),
        ).subscribe((href) => {
            linkEl.href = href;
            this.meta.updateTag({ property: "og:url", content: href });
        });

        this.override$.pipe(
            filter((v): v is string => !!v),
        ).subscribe((href) => {
            linkEl.href = href;
            this.meta.updateTag({ property: "og:url", content: href });
        });
    }

    /** Override the default canonical URL for this page */
    setCanonical(val: string): void {
        this.override$.next(val);
    }
}
