import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { combineLatest, map, Observable, of, shareReplay, switchMap } from "rxjs";
import { LegalDocument } from "typedb-web-schema";

import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";

@Component({
    selector: "td-legal-document",
    templateUrl: "./legal-document.component.html",
    styleUrls: ["./legal-document.component.scss"],
})
export class LegalDocumentComponent implements OnInit {
    document$!: Observable<LegalDocument | null>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private content: ContentService,
        private metaTags: MetaTagsService,
        private title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.document$ = combineLatest([this.activatedRoute.data, this.activatedRoute.paramMap]).pipe(
            map(([routeData, params]) => ({ slug: params.get("slug") })),
            switchMap(({ slug }) => (slug ? this.content.getLegalDocumentBySlug(slug) : of(null))),
            shareReplay(),
        );
        this.document$.subscribe(
            (doc) => {
                if (doc) {
                    this.title.setTitle(doc.pageTitle());
                    this.metaTags.register(doc.metaTags);
                    this._analytics.hubspot.trackPageView();
                    Prism.highlightAll();
                    document.querySelectorAll("article a[rel*='noreferrer']").forEach((el) => {
                        el.setAttribute("rel", "noopener");
                    });
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
            },
            (_err) => {
                this.router.navigate(["404"], { skipLocationChange: true });
            },
        );
    }
}
