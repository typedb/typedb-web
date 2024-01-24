import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { BehaviorSubject, Observable, of } from "rxjs";
import { RequestTechTalkPage, requestTechTalkPageSchemaName, SanityRequestTechTalkPage } from "typedb-web-schema";
import { SanityDataset } from "typedb-web-schema";

import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { FormService } from "src/service/form.service";
import { MetaTagsService } from "src/service/meta-tags.service";
import { PopupNotificationService } from "src/service/popup-notification.service";

import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import {
    HeadingWithHighlightsComponent,
    ParagraphWithHighlightsComponent,
} from "../../framework/text/text-with-highlights.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-request-tech-talk-page",
    templateUrl: "./request-tech-talk-page.component.html",
    styleUrls: ["./request-tech-talk-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    PageBackgroundComponent,
    HeadingWithHighlightsComponent,
    MatProgressBarModule,
    ParagraphWithHighlightsComponent,
    RichTextComponent,
    AsyncPipe
],
})
export class RequestTechTalkPageComponent extends PageComponentBase<RequestTechTalkPage> {
    readonly isSubmitting$: Observable<boolean>;
    private readonly isSubmittingSubject = new BehaviorSubject(false);

    constructor(
        private formService: FormService,
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
        const page = data.getDocumentByID<SanityRequestTechTalkPage>(requestTechTalkPageSchemaName);
        return of(page ? new RequestTechTalkPage(page, data) : null);
    }

    protected override onPageReady(page: RequestTechTalkPage): void {
        super.onPageReady(page);

        this.formService.embedHubspotForm(page.hubspotFormID, "hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.isSubmittingSubject.next(val);
            },
            onSuccess: () => this.onSubmit(),
        });
    }

    private onSubmit() {
        this.analytics.google.reportAdConversion("requestTechTalk");
        this.popupNotificationService.success("Your request has been submitted!");
    }
}
