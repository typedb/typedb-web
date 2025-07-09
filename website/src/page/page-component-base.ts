import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { first, map, Observable, of, shareReplay, switchMap, tap } from "rxjs";
import { SANITY_QUERY_URL, SANITY_TOKEN } from "typedb-web-common/lib";
import { MetaTags, SanityDataset } from "typedb-web-schema";

import { ContentService } from "src/service/content.service";
import { MetaTagsService } from "src/service/meta-tags.service";
import { environment } from "../environment/environment";

@Component({
    template: ``,
    standalone: false
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class PageComponentBase<T extends { metaTags: MetaTags }> implements OnInit {
    readonly page$: Observable<T | null>;

    protected abstract getPage(contentData: SanityDataset): Observable<T | null>;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected title: Title,
        private metaTags: MetaTagsService,
        // contentService: ContentService,
        private http: HttpClient,
    ) {
        const query = "*[!(_type match 'system.**')]";
        this.page$ = this.http.get(
            SANITY_QUERY_URL,
            ["production", "staging", "local"].includes(environment.env)
                ? { params: { query, perspective: "published" } }
                : { params: { query, perspective: "previewDrafts" }, headers: { Authorization: `Bearer ${SANITY_TOKEN}` } },
        ).pipe(
            first(),
            map((res: any) => res.result.find((x: any) => x._id === "homePage")),
            tap((x: any) => console.log(x)),
        );
        // this.page$ = contentService.data.pipe(
        //     switchMap((data) => this.getPage(data)),
        //     shareReplay(1),
        // );
    }

    ngOnInit() {
        this.page$.subscribe((page) => {
            if (!page) {
                return this.onPageNotFound();
            }

            // this.onPageReady(page);
        });
    }

    protected onPageNotFound(): void {
        this.router.navigate(["404"], { skipLocationChange: true });
    }

    protected onPageReady(page: T): void {
        this.metaTags.register(page.metaTags);
    }
}
