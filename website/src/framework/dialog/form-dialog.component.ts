import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
    MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { map, Observable, Subject, tap } from "rxjs";
import { ActionButton, EventBase, Link, LinkButton, ParagraphWithHighlights } from "typedb-web-schema";
import { emailPattern, emailPatternErrorText, namePattern, namePatternErrorText } from "typedb-web-common/lib";
import { ContactPanelComponent } from "../contact-panel/contact-panel.component";
import { FormActionsComponent, FormComponent, FormInputComponent, FormOption, FormTextareaComponent, FormToggleGroupComponent, patternValidator, requiredValidator } from "../form";

import { AnalyticsService } from "../../service/analytics.service";
import { CalendarService } from "../../service/calendar.service";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";
import { ActionsComponent } from "../actions/actions.component";
import { ParagraphWithHighlightsComponent } from "../text/text-with-highlights.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "td-dialog-close-button",
    templateUrl: "dialog-close-button.component.html",
    styleUrls: ["./dialog-close-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButtonModule, MatDialogClose, MatIconModule],
})
export class DialogCloseButtonComponent {}

@Component({
    selector: "td-form-dialog",
    templateUrl: "form-dialog.component.html",
    styleUrls: ["./form-dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatDialogTitle, DialogCloseButtonComponent, MatDialogContent, ParagraphWithHighlightsComponent,
        MatProgressBarModule
    ],
})
export class FormDialogComponent {
    @Input() isSubmitting: boolean | null = null;
    @Input() titleProp!: string;
    @Input() description: ParagraphWithHighlights | null = null;
    @Input() variant?: "contact" = undefined;

    @HostBinding("class") get clazz() {
        return this.variant ? "di-contact" : undefined;
    }
}

@Component({
    selector: "td-newsletter-dialog",
    templateUrl: "./newsletter-dialog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormDialogComponent, AsyncPipe, FormsModule, ReactiveFormsModule, FormInputComponent, FormComponent, FormActionsComponent],
})
export class NewsletterDialogComponent {
    description$: Observable<ParagraphWithHighlights | null>;
    formId!: string;
    readonly isSubmitting$ = new Subject<boolean>;
    readonly form = this.formBuilder.nonNullable.group({
        first_name: ["", [patternValidator(namePattern, namePatternErrorText), requiredValidator]],
        last_name: ["", [patternValidator(namePattern, namePatternErrorText), requiredValidator]],
        email: ["", [patternValidator(emailPattern, emailPatternErrorText), requiredValidator]],
    });

    constructor(
        private dialogRef: MatDialogRef<NewsletterDialogComponent>,
        private _popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
        private formService: FormService, private formBuilder: FormBuilder
    ) {
        this.description$ = formService.forms.pipe(
            tap((forms) => { this.formId = forms.newsletter; }),
            map((forms) =>
                forms.newsletterDescription ? ParagraphWithHighlights.fromSanity(forms.newsletterDescription) : null,
            ),
        );
    }

    onSubmit() {
        this.isSubmitting$.next(true);
        this.formService.submit(this.formId, this.form.getRawValue()).subscribe({
            next: () => {
                this.dialogRef.close();
                this.analyticsService.google.reportAdConversion("subscribeToNewsletter");
                this._popupNotificationService.success("Your email is now subscribed to our newsletter!");
            },
            error: () => {
                this.isSubmitting$.next(false);
                this._popupNotificationService.error("There was an error subscribing to the newsletter - please try again");
            }
        });
    }
}

@Component({
    selector: "td-feedback-dialog",
    templateUrl: "feedback-dialog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormDialogComponent, AsyncPipe, FormToggleGroupComponent, FormTextareaComponent, FormsModule,
        ReactiveFormsModule, FormComponent, FormActionsComponent, FormInputComponent
    ],
})
export class FeedbackDialogComponent {
    description$: Observable<ParagraphWithHighlights | null>;
    formId!: string;
    readonly isSubmitting$ = new Subject<boolean>();
    readonly form = this.formBuilder.group({
        overall_rating_typedb: [null as number | null, []],
        overall_rating_page: [null as number | null, []],
        feedback_text: ["", []],
        email: ["", [patternValidator(emailPattern, emailPatternErrorText), requiredValidator]],
    });
    readonly ratingOptions: FormOption<number>[] = [1, 2, 3, 4, 5].map(x => ({ value: x, viewValue: x.toString() }));

    constructor(
        private analyticsService: AnalyticsService,
        private dialogRef: MatDialogRef<FeedbackDialogComponent>,
        private popupNotificationService: PopupNotificationService,
        private formService: FormService, private formBuilder: FormBuilder
    ) {
        this.description$ = formService.forms.pipe(
            tap((forms) => { this.formId = forms.feedback; }),
            map((forms) =>
                forms.feedbackDescription ? ParagraphWithHighlights.fromSanity(forms.feedbackDescription) : null,
            ),
        );
    }

    onSubmit() {
        this.isSubmitting$.next(true);
        this.formService.submit(this.formId, Object.assign({}, this.form.getRawValue() as { email: string }, { feedback_page_url: window.location.href.split("?")[0] })).subscribe({
            next: () => {
                this.dialogRef.close();
                this.analyticsService.google.reportAdConversion("sendFeedback");
                this.popupNotificationService.success("Your feedback has been submitted. Thank you!");
            },
            error: () => {
                this.isSubmitting$.next(false);
                this.popupNotificationService.error("There was an error submitting feedback - please try again");
            },
        });
    }
}

@Component({
    selector: "td-contact-dialog",
    templateUrl: "contact-dialog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormDialogComponent, AsyncPipe, FormTextareaComponent, FormsModule, ReactiveFormsModule, FormComponent,
        FormActionsComponent, FormInputComponent, MatCheckboxModule, ContactPanelComponent,
    ],
})
export class ContactDialogComponent {
    constructor(public dialogRef: MatDialogRef<ContactDialogComponent>) {}
}

@Component({
    selector: "td-add-to-calendar-dialog",
    templateUrl: "add-to-calendar-dialog.component.html",
    styleUrls: ["add-to-calendar-dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatDialogTitle, DialogCloseButtonComponent, MatDialogContent, ActionsComponent, MatProgressBarModule],
})
export class AddToCalendarDialogComponent implements OnInit {
    actions!: ActionButton[];
    isLoading = false;

    constructor(
        private calendarService: CalendarService,
        @Inject(MAT_DIALOG_DATA) public data: { event: EventBase },
        private dialogRef: MatDialogRef<AddToCalendarDialogComponent>,
    ) {}

    ngOnInit() {
        this.actions = [
            new LinkButton({
                style: "secondary",
                text: "Google",
                comingSoon: false,
                link: new Link({
                    type: "external",
                    opensNewTab: true,
                    destination: this.calendarService.googleCalendarURL(this.data.event),
                }),
            }),
            new LinkButton({
                style: "secondary",
                text: "Apple / Outlook",
                comingSoon: false,
                download: { filename: `${this.data.event.slug}.ics` },
                link: new Link({
                    type: "external",
                    opensNewTab: true,
                    destination: this.calendarService.icsFileURL(this.data.event),
                }),
            }),
        ];
    }
}
