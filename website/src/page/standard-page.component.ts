import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { Observable, shareReplay, switchMap } from "rxjs";
import { MetaTags, SanityDataset } from "typedb-web-schema";

import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { MetaTagsService } from "src/service/meta-tags.service";

@Component({ template: `` })
export abstract class StandardPageComponent<T extends { metaTags: MetaTags }> implements OnInit {
    readonly page$: Observable<T | null>;

    protected abstract getPage(contentData: SanityDataset): Observable<T | null>;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected analytics: AnalyticsService,
        protected router: Router,
        protected title: Title,
        private idleMonitor: IdleMonitorService,
        private metaTags: MetaTagsService,
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

    protected onPageReady(page: T): void {
        this.metaTags.register(page.metaTags);
        this.analytics.hubspot.trackPageView();
        setTimeout(() => {
            this.idleMonitor.fireManualMyAppReadyEvent();
        }, 20000);
    }
}
