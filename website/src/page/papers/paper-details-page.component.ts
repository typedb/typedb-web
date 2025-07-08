import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { BehaviorSubject, filter, map, Observable } from "rxjs";
import { ParagraphWithHighlights, SanityDataset, SanityPaper, Paper, paperSchemaName, LinkButton, Link, ActionButton } from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";
import { ActionsComponent } from "../../framework/actions/actions.component";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { FurtherLearningComponent } from "../../framework/further-learning/further-learning.component";
import { LinkDirective } from "../../framework/link/link.directive";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { PopupNotificationService } from "../../service/popup-notification.service";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-paper-details-page",
    templateUrl: "./paper-details-page.component.html",
    styleUrls: ["./paper-details-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, LinkDirective, HeadingWithHighlightsComponent, AspectRatioComponent,
        MatProgressBarModule, RichTextComponent, FurtherLearningComponent, AsyncPipe, ActionsComponent
    ],
})
export class PaperDetailsPageComponent extends PageComponentBase<Paper> {
    readonly allPapersHeading = new ParagraphWithHighlights({
        spans: [
            { text: "TypeDB ", highlight: false },
            { text: "Papers", highlight: true },
        ],
    });
    readonly isSubmitting$: Observable<boolean>;
    private readonly _isSubmitting$ = new BehaviorSubject(false);
    private readonly subscribeButton = new LinkButton({
        style: "secondary",
        text: "Subscribe to updates",
        link: Link.fromAddress("?dialog=newsletter"),
        comingSoon: false,
    });
    private readonly downloadButton$ = this.page$.pipe(
        filter(paper => !!paper),
        map(paper => paper!),
        map(paper => new ActionButton({
            style: "primary",
            text: "Download paper",
            onClick: () => this.download(paper),
            comingSoon: false,
        })),
    );
    readonly actions$ = this.downloadButton$.pipe(map(downloadButton => [this.subscribeButton, downloadButton]));

    constructor(
        private plainTextPipe: PlainTextPipe,
        private popupNotificationService: PopupNotificationService, activatedRoute: ActivatedRoute,
        private analytics: AnalyticsService, router: Router, title: Title,
        metaTags: MetaTagsService, contentService: ContentService,
    ) {
        super(activatedRoute, router, title, metaTags, contentService);
        this.isSubmitting$ = this._isSubmitting$.asObservable();
    }

    protected override getPage(data: SanityDataset) {
        const papers = data.getDocumentsByType<SanityPaper>(paperSchemaName);
        return this.activatedRoute.paramMap.pipe(
            map((params) => {
                const page = papers.find((x) => x.slug.current === params.get("slug"));
                return page ? Paper.fromSanity(page, data) : null;
            }),
        );
    }

    protected override onPageReady(page: Paper): void {
        super.onPageReady(page);
        this.title.setTitle(`TypeDB Paper: ${this.plainTextPipe.transform(page.title)}`);
    }

    protected override onPageNotFound(): void {
        this.router.navigate(["papers"], { replaceUrl: true });
    }

    private download(paper: Paper) {
        this.analytics.google.reportAdConversion("downloadPaper");

        this.popupNotificationService.success("Your file will be downloaded shortly.");
        fetch(paper.fileURL)
            .then((resp) => resp.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = paper.fileName || "";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
    }
}
