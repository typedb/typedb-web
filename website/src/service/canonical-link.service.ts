import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

import { BehaviorSubject, distinct, filter, map, skip } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CanonicalLinkService {
    private href$ = new BehaviorSubject<string | null>(null);

    constructor(@Inject(DOCUMENT) doc: Document) {
        const linkEl = document.createElement("link");
        linkEl.rel = "canonical";

        this.href$.pipe(filter((v): v is string => !!v)).subscribe((href) => {
            linkEl.href = href;
        });

        this.href$
            .pipe(
                map((v) => !!v),
                distinct(),
                skip(1),
            )
            .subscribe((v) => (v ? doc.head.appendChild(linkEl) : doc.head.removeChild(linkEl)));
    }

    removeCanonical(): void {
        this.href$.next(null);
    }

    setCanonical(val: string) {
        this.href$.next(val);
    }
}
