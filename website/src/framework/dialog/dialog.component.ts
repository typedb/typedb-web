import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { map, Observable, ReplaySubject, Subject } from "rxjs";
import { ActionButton, EventBase, ParagraphWithHighlights } from "typedb-web-schema";

import { AnalyticsService } from "../../service/analytics.service";
import { CalendarService } from "../../service/calendar.service";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";

@Component({
    selector: "td-dialog",
    templateUrl: "dialog.component.html",
    styleUrls: ["./dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
    @Input() isSubmitting: boolean | null = null;
    @Input() titleProp!: string;
    @Input() description: ParagraphWithHighlights | null = null;
    @Input() variant?: "contact" = undefined;

    @HostBinding("class") get clazz() {
        return this.variant ? "di-contact" : undefined;
    }
}

@Component({
    selector: "td-cloud-waitlist-dialog",
    template: ` <td-dialog
        [isSubmitting]="isSubmitting$ | async"
        titleProp="Join TypeDB Cloud Waitlist"
        [description]="description$ | async"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloudWaitlistDialogComponent {
    description$: Observable<ParagraphWithHighlights | null>;
    isSubmitting$: Observable<boolean>;
    private loadingChangeEvent: Subject<boolean> = new ReplaySubject(1);

    constructor(
        private analyticsService: AnalyticsService,
        private dialogRef: MatDialogRef<CloudWaitlistDialogComponent>,
        private popupNotificationService: PopupNotificationService,
        formService: FormService,
    ) {
        formService.embedHubspotForm("typeDBCloudWaitlist", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.loadingChangeEvent.next(val);
            },
            onSuccess: () => this.onSubmit(),
        });
        this.description$ = formService.forms.pipe(
            map((forms) =>
                forms.typeDBCloudWaitlistDescription
                    ? ParagraphWithHighlights.fromSanity(forms.typeDBCloudWaitlistDescription)
                    : null,
            ),
        );
        this.isSubmitting$ = this.loadingChangeEvent.asObservable();
    }

    private onSubmit() {
        this.dialogRef.close();
        this.analyticsService.google.reportAdConversion("joinCloudWaitlist");
        this.popupNotificationService.success("You're now on the TypeDB Cloud waitlist!");
    }
}

@Component({
    selector: "td-newsletter-dialog",
    template: `<td-dialog
        [isSubmitting]="isSubmitting$ | async"
        titleProp="Subscribe to Newsletter"
        [description]="description$ | async"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsletterDialogComponent {
    description$: Observable<ParagraphWithHighlights | null>;
    isSubmitting$: Observable<boolean>;
    private loadingChangeEvent: Subject<boolean> = new ReplaySubject(1);

    constructor(
        private dialogRef: MatDialogRef<NewsletterDialogComponent>,
        private _popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
        formService: FormService,
    ) {
        formService.embedHubspotForm("newsletter", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.loadingChangeEvent.next(val);
            },
            onSuccess: () => this.onSubmit(),
        });
        this.description$ = formService.forms.pipe(
            map((forms) =>
                forms.newsletterDescription ? ParagraphWithHighlights.fromSanity(forms.newsletterDescription) : null,
            ),
        );
        this.isSubmitting$ = this.loadingChangeEvent.asObservable();
    }

    private onSubmit() {
        this.dialogRef.close();
        this.analyticsService.google.reportAdConversion("subscribeToNewsletter");
        this._popupNotificationService.success("Your email is now subscribed to our newsletter!");
    }
}

@Component({
    selector: "td-feedback-dialog",
    template: `<td-dialog
        [isSubmitting]="isSubmitting$ | async"
        titleProp="Provide Feedback"
        [description]="description$ | async"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDialogComponent {
    description$: Observable<ParagraphWithHighlights | null>;
    isSubmitting$: Observable<boolean>;
    private loadingChangeEvent: Subject<boolean> = new ReplaySubject(1);

    constructor(
        private analyticsService: AnalyticsService,
        private dialogRef: MatDialogRef<FeedbackDialogComponent>,
        private popupNotificationService: PopupNotificationService,
        formService: FormService,
    ) {
        formService.embedHubspotForm("feedback", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.loadingChangeEvent.next(val);
            },
            onSuccess: () => this.onSubmit(),
        });
        this.description$ = formService.forms.pipe(
            map((forms) =>
                forms.feedbackDescription ? ParagraphWithHighlights.fromSanity(forms.feedbackDescription) : null,
            ),
        );
        this.isSubmitting$ = this.loadingChangeEvent.asObservable();
    }

    private onSubmit() {
        this.dialogRef.close();
        this.analyticsService.google.reportAdConversion("sendFeedback");
        this.popupNotificationService.success("Your feedback has been submitted. Thank you!");
    }
}

@Component({
    selector: "td-contact-dialog",
    template: `<td-dialog
        [isSubmitting]="isSubmitting$ | async"
        titleProp="Get in touch"
        [description]="description$ | async"
        variant="contact"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDialogComponent {
    description$: Observable<ParagraphWithHighlights | null>;
    isSubmitting$: Observable<boolean>;
    private loadingChangeEvent: Subject<boolean> = new ReplaySubject(1);

    constructor(
        private analyticsService: AnalyticsService,
        private dialogRef: MatDialogRef<ContactDialogComponent>,
        private popupNotificationService: PopupNotificationService,
        formService: FormService,
    ) {
        formService.embedHubspotForm("contact", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.loadingChangeEvent.next(val);
            },
            onSuccess: () => this.onSubmit(),
        });
        this.description$ = formService.forms.pipe(
            map((forms) =>
                forms.contactDescription ? ParagraphWithHighlights.fromSanity(forms.contactDescription) : null,
            ),
        );
        this.isSubmitting$ = this.loadingChangeEvent.asObservable();
    }

    private onSubmit() {
        this.dialogRef.close();
        this.analyticsService.google.reportAdConversion("getInTouch");
        this.popupNotificationService.success("Your message has been sent!");
    }
}

@Component({
    selector: "td-add-to-calendar-dialog",
    templateUrl: "add-to-calendar-dialog.component.html",
    styleUrls: ["add-to-calendar-dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
            {
                style: "secondary",
                text: "Google",
                comingSoon: false,
                onClick: () => {
                    this.isLoading = true;
                    this.calendarService.getGoogleCalendarLink(this.data.event).subscribe((resp) => {
                        window.open((resp as any)["redirectTo"], "_blank")!.focus();
                        this.dialogRef.close();
                    });
                },
            },
            {
                style: "secondary",
                text: "Apple / Outlook",
                comingSoon: false,
                onClick: () => {
                    this.isLoading = true;
                    this.calendarService.getICS(this.data.event).subscribe((blob) => {
                        const url = window.URL.createObjectURL(blob);
                        window.open(url);
                        this.dialogRef.close();
                    });
                },
            },
        ];
    }
}

@Component({
    selector: "td-dialog-close-button",
    templateUrl: "dialog-close-button.component.html",
    styleUrls: ["./dialog-close-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCloseButtonComponent {}
