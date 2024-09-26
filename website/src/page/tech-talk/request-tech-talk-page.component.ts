import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { of, Subject } from "rxjs";
import { RequestTechTalkPage, requestTechTalkPageSchemaName, SanityRequestTechTalkPage } from "typedb-web-schema";
import { SanityDataset } from "typedb-web-schema";

import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { FormService } from "src/service/form.service";
import { MetaTagsService } from "src/service/meta-tags.service";
import { PopupNotificationService } from "src/service/popup-notification.service";
import { FormActionsComponent, FormComponent, FormInputComponent, FormTextareaComponent, patternValidator, requiredValidator } from "../../framework/form";

import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import {
    HeadingWithHighlightsComponent,
    ParagraphWithHighlightsComponent,
} from "../../framework/text/text-with-highlights.component";
import { PageComponentBase } from "../page-component-base";
import { FormBuilder } from "@angular/forms";
import { emailPattern, emailPatternErrorText } from "typedb-web-common/lib";

@Component({
    selector: "td-request-tech-talk-page",
    templateUrl: "./request-tech-talk-page.component.html",
    styleUrls: ["./request-tech-talk-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, HeadingWithHighlightsComponent, MatProgressBarModule, ParagraphWithHighlightsComponent,
        RichTextComponent, AsyncPipe, FormActionsComponent, FormComponent, FormInputComponent, FormTextareaComponent
    ],
})
export class RequestTechTalkPageComponent extends PageComponentBase<RequestTechTalkPage> {
    formId!: string;
    readonly isSubmitting$ = new Subject<boolean>;
    readonly form = this.formBuilder.nonNullable.group({
        first_name: ["", []],
        last_name: ["", []],
        email: ["", [patternValidator(emailPattern, emailPatternErrorText), requiredValidator]],
        company: ["", []],
        tech_talk_request_detail: ["", []],
    });

    constructor(
        private forms: FormService, private popupNotificationService: PopupNotificationService,
        activatedRoute: ActivatedRoute, private analytics: AnalyticsService, router: Router, title: Title,
        idleMonitor: IdleMonitorService, metaTags: MetaTagsService, contentService: ContentService,
        private formBuilder: FormBuilder,
    ) {
        super(activatedRoute, router, title, idleMonitor, metaTags, contentService);
        this.page$.subscribe((page) => {
            if (page) {
                this.formId = page.cioFormID;
            }
        });
    }

    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityRequestTechTalkPage>(requestTechTalkPageSchemaName);
        return of(page ? new RequestTechTalkPage(page, data) : null);
    }

    protected override onPageReady(page: RequestTechTalkPage): void {
        super.onPageReady(page);
    }

    onSubmit() {
        this.forms.submit(this.formId, this.form.getRawValue() as { email: string }).subscribe({
            next: () => {
                this.isSubmitting$.next(false);
                this.analytics.google.reportAdConversion("requestTechTalk");
                this.popupNotificationService.success("Your request has been submitted!");
            },
            error: () => {
                this.isSubmitting$.next(false);
                this.popupNotificationService.error("There was an error submitting the form - please try again");
            },
        });
    }
}
