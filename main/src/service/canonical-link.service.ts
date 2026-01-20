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
    private prevLinkEl: HTMLLinkElement;
    private nextLinkEl: HTMLLinkElement;

    constructor(@Inject(DOCUMENT) private doc: Document, private meta: Meta, router: Router) {
        const linkEl = doc.createElement("link");
        linkEl.rel = "canonical";
        doc.head.appendChild(linkEl);

        // Create prev/next link elements for pagination
        this.prevLinkEl = doc.createElement("link");
        this.prevLinkEl.rel = "prev";
        this.nextLinkEl = doc.createElement("link");
        this.nextLinkEl.rel = "next";

        // Set default canonical on navigation
        router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map((e) => `${SITE_URL}${e.url.split(/[#?]/)[0]}`),
        ).subscribe((url) => {
            this.href$.next(url);
            this.override$.next(null);
            this.clearPaginationLinks();
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

    /** Set pagination links (rel="prev" and rel="next") for SEO */
    setPaginationLinks(prevUrl: string | null, nextUrl: string | null): void {
        this.clearPaginationLinks();

        if (prevUrl) {
            this.prevLinkEl.href = `${SITE_URL}${prevUrl}`;
            this.doc.head.appendChild(this.prevLinkEl);
        }

        if (nextUrl) {
            this.nextLinkEl.href = `${SITE_URL}${nextUrl}`;
            this.doc.head.appendChild(this.nextLinkEl);
        }
    }

    private clearPaginationLinks(): void {
        this.prevLinkEl.remove();
        this.nextLinkEl.remove();
    }
}
