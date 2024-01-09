import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { map, Observable, of, shareReplay, switchMap } from "rxjs";
import { LegalDocument } from "typedb-web-schema";

import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";

@Component({
    selector: "td-legal-document",
    templateUrl: "./legal-document.component.html",
    styleUrls: ["./legal-document.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PageBackgroundComponent, NgIf, HeadingWithHighlightsComponent, RichTextComponent, AsyncPipe],
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
        this.document$ = this.activatedRoute.paramMap.pipe(
            map((params) => ({ slug: params.get("slug") })),
            switchMap(({ slug }) => (slug ? this.content.getLegalDocumentBySlug(slug) : of(null))),
            shareReplay(),
        );
        this.document$.subscribe({
            next: (doc) => {
                if (doc) {
                    this.title.setTitle(doc.pageTitle());
                    this.metaTags.register(doc.metaTags);
                    this._analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        Prism.highlightAll();
                    }, 0);
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
            error: () => {
                this.router.navigate(["404"], { skipLocationChange: true });
            },
        });
    }
}
