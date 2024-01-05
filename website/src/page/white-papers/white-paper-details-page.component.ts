import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { BehaviorSubject, map, Observable } from "rxjs";
import {
    ParagraphWithHighlights,
    SanityDataset,
    SanityWhitePaper,
    WhitePaper,
    whitePaperSchemaName,
} from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { FurtherLearningComponent } from "../../framework/further-learning/further-learning.component";
import { LinkDirective } from "../../framework/link/link.directive";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-white-paper-details-page",
    templateUrl: "./white-paper-details-page.component.html",
    styleUrls: ["./white-paper-details-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent,
        NgIf,
        LinkDirective,
        HeadingWithHighlightsComponent,
        AspectRatioComponent,
        MatProgressBarModule,
        RichTextComponent,
        FurtherLearningComponent,
        AsyncPipe,
    ],
})
export class WhitePaperDetailsPageComponent extends PageComponentBase<WhitePaper> {
    readonly allWhitePapersHeading = new ParagraphWithHighlights({
        spans: [
            { text: "TypeDB ", highlight: false },
            { text: "White Papers", highlight: true },
        ],
    });
    readonly isSubmitting$: Observable<boolean>;
    private readonly isSubmittingSubject = new BehaviorSubject(false);

    constructor(
        private formService: FormService,
        private plainTextPipe: PlainTextPipe,
        private popupNotificationService: PopupNotificationService,
        activatedRoute: ActivatedRoute,
        analytics: AnalyticsService,
        router: Router,
        title: Title,
        idleMonitor: IdleMonitorService,
        metaTags: MetaTagsService,
        contentService: ContentService,
    ) {
        super(activatedRoute, analytics, router, title, idleMonitor, metaTags, contentService);
        this.isSubmitting$ = this.isSubmittingSubject.asObservable();
    }

    protected override getPage(data: SanityDataset) {
        const whitePapers = data.getDocumentsByType<SanityWhitePaper>(whitePaperSchemaName);
        return this.activatedRoute.paramMap.pipe(
            map((params) => {
                const page = whitePapers.find((x) => x.slug.current === params.get("slug"));
                return page ? WhitePaper.fromSanity(page, data) : null;
            }),
        );
    }

    protected override onPageReady(page: WhitePaper): void {
        super.onPageReady(page);

        this.title.setTitle(`TypeDB White Paper: ${this.plainTextPipe.transform(page.title)}`);

        this.formService.embedHubspotForm(page.hubspotFormID, "hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.isSubmittingSubject.next(val);
            },
            onSuccess: () => this.onSubmit(page),
        });
    }

    protected override onPageNotFound(): void {
        this.router.navigate(["white-papers"], { replaceUrl: true });
    }

    private onSubmit(whitePaper: WhitePaper) {
        this.analytics.google.reportAdConversion("downloadWhitePaper");

        this.popupNotificationService.success("Your file will be downloaded shortly.");
        fetch(whitePaper.fileURL)
            .then((resp) => resp.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                // the filename you want
                a.download = whitePaper.fileName || "";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
    }
}
