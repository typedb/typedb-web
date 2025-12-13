import { Component, NgZone, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { Observable, shareReplay, switchMap, tap } from "rxjs";
import { MetaTags, SanityDataset } from "typedb-web-schema";
import { ContentService } from "../service/content.service";
import { MetaTagFallbacks, MetaTagsService } from "../service/meta-tags.service";

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
        protected zone: NgZone,
        contentService: ContentService,
    ) {
        this.page$ = contentService.data.pipe(
            switchMap((data) => this.getPage(data)),
            shareReplay(1),
        );
    }

    ngOnInit() {
        this.page$.subscribe((page) => {
            if (!page) {
                return this.onPageNotFound();
            }

            this.onPageReady(page);
        });
    }

    protected onPageNotFound(): void {
        this.router.navigate(["404"], { skipLocationChange: true });
    }

    protected getMetaTagFallbacks(_page: T): MetaTagFallbacks | undefined {
        return undefined;
    }

    protected onPageReady(page: T): void {
        this.metaTags.register(page.metaTags, this.getMetaTagFallbacks(page));
    }
}
