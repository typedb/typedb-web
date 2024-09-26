import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Output, EventEmitter, Input } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { map, Observable, Subject, tap } from "rxjs";

import { FormService } from "src/service/form.service";
import { PopupNotificationService } from "src/service/popup-notification.service";
import { AnalyticsService } from "../../service/analytics.service";
import { FormActionsComponent, FormComponent, FormInputComponent, FormTextareaComponent, patternValidator, requiredValidator } from "../form";
import { ParagraphWithHighlights } from "typedb-web-schema";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { emailPattern, emailPatternErrorText, namePattern, namePatternErrorText } from "typedb-web-common/lib";
import { MatCheckboxModule } from "@angular/material/checkbox";

const contactRequestTopicFieldPrefix = `contact_request_topic_`;
const contactFormTopics = [
    { value: `${contactRequestTopicFieldPrefix}support`, viewValue: "Support" },
    { value: `${contactRequestTopicFieldPrefix}consulting`, viewValue: "Consulting" },
    { value: `${contactRequestTopicFieldPrefix}sales`, viewValue: "Sales" },
    { value: `${contactRequestTopicFieldPrefix}training`, viewValue: "Training" },
    { value: `${contactRequestTopicFieldPrefix}careers`, viewValue: "Careers" },
    { value: `${contactRequestTopicFieldPrefix}products_and_services`, viewValue: "Products and Services" },
    { value: `${contactRequestTopicFieldPrefix}pr_and_analysts`, viewValue: "PR and Analysts" },
] as const;

@Component({
    selector: "td-contact-panel",
    templateUrl: "contact-panel.component.html",
    styleUrls: ["contact-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatProgressBarModule, AsyncPipe, FormActionsComponent, FormComponent, FormInputComponent, FormTextareaComponent,
        MatCheckboxModule, FormsModule, ReactiveFormsModule
    ],
})
export class ContactPanelComponent {
    @Input() showPersonalDataNotice = false;
    @Output() readonly submitDone = new EventEmitter();

    description$: Observable<ParagraphWithHighlights | null>;
    formId!: string;
    readonly isSubmitting$ = new Subject<boolean>();

    readonly form = this.formBuilder.nonNullable.group({
        first_name: ["", [patternValidator(namePattern, namePatternErrorText), requiredValidator]],
        last_name: ["", [patternValidator(namePattern, namePatternErrorText), requiredValidator]],
        email: ["", [patternValidator(emailPattern, emailPatternErrorText), requiredValidator]],
        company: ["", []],
        job_function: ["", []],
        country: ["", []],
        contact_request_body: ["", []],
        ...Object.fromEntries(contactFormTopics.map(topic => ([topic.value, [false, []]]))),
    });

    constructor(
        private formService: FormService, private formBuilder: FormBuilder,
        private popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
    ) {
        this.description$ = formService.forms.pipe(
            tap((forms) => { this.formId = forms.contact; }),
            map((forms) =>
                forms.contactDescription ? ParagraphWithHighlights.fromSanity(forms.contactDescription) : null,
            ),
        );
    }

    onSubmit() {
        this.isSubmitting$.next(true);
        this.formService.submit(this.formId, this.form.getRawValue() as { email: string }).subscribe({
            next: () => {
                this.isSubmitting$.next(false);
                this.analyticsService.google.reportAdConversion("getInTouch");
                this.popupNotificationService.success("Your message has been sent!");
                this.submitDone.emit();
            },
            error: () => {
                this.isSubmitting$.next(false);
                this.popupNotificationService.error("There was an error submitting the form - please try again");
            },
        });
    }

    readonly topics = contactFormTopics;
}
