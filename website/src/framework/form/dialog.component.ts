import { Component, HostBinding, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { ParagraphWithHighlights } from "typedb-web-schema";

import { AnalyticsService } from "../../service/analytics.service";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";

@Component({
    selector: "td-dialog",
    templateUrl: "dialog.component.html",
    styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
    @Input() isSubmitting!: boolean;
    @Input() titleProp!: string;
    @Input() description?: ParagraphWithHighlights;
    @Input() variant?: "contact" = undefined;

    @HostBinding("class") get clazz() {
        return this.variant ? "di-contact" : undefined;
    }
}

@Component({
    selector: "td-cloud-waitlist-dialog",
    template: ` <td-dialog
        [isSubmitting]="isSubmitting"
        titleProp="Join TypeDB Cloud Waitlist"
        [description]="description"
    />`,
})
export class CloudWaitlistDialogComponent {
    isSubmitting = false;
    description?: ParagraphWithHighlights;

    constructor(
        private dialogRef: MatDialogRef<CloudWaitlistDialogComponent>,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
    ) {
        this._formService.embedHubspotForm("typeDBCloudWaitlist", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.isSubmitting = val;
            },
            onSuccess: () => this.onSubmit(),
        });
        this._formService.forms.subscribe((forms) => {
            this.description =
                forms.typeDBCloudWaitlistDescription &&
                ParagraphWithHighlights.fromSanity(forms.typeDBCloudWaitlistDescription);
        });
    }

    private onSubmit() {
        this.dialogRef.close();
        this.analyticsService.google.reportAdConversion("joinCloudWaitlist");
        this._popupNotificationService.success("You're now on the TypeDB Cloud waitlist!");
    }
}

@Component({
    selector: "td-newsletter-dialog",
    template: `<td-dialog
        [isSubmitting]="isSubmitting"
        titleProp="Subscribe to Newsletter"
        [description]="description"
    />`,
})
export class NewsletterDialogComponent {
    isSubmitting = false;
    description?: ParagraphWithHighlights;

    constructor(
        private dialogRef: MatDialogRef<NewsletterDialogComponent>,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
    ) {
        this._formService.embedHubspotForm("newsletter", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.isSubmitting = val;
            },
            onSuccess: () => this.onSubmit(),
        });
        this._formService.forms.subscribe((forms) => {
            this.description =
                forms.newsletterDescription && ParagraphWithHighlights.fromSanity(forms.newsletterDescription);
        });
    }

    private onSubmit() {
        this.dialogRef.close();
        this.analyticsService.google.reportAdConversion("subscribeToNewsletter");
        this._popupNotificationService.success("Your email is now subscribed to our newsletter!");
    }
}

@Component({
    selector: "td-feedback-dialog",
    template: `<td-dialog [isSubmitting]="isSubmitting" titleProp="Provide Feedback" [description]="description" />`,
})
export class FeedbackDialogComponent {
    isSubmitting = false;
    description?: ParagraphWithHighlights;

    constructor(
        private dialogRef: MatDialogRef<FeedbackDialogComponent>,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
    ) {
        this._formService.embedHubspotForm("feedback", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.isSubmitting = val;
            },
            onSuccess: () => this.onSubmit(),
        });
        this._formService.forms.subscribe((forms) => {
            this.description =
                forms.feedbackDescription && ParagraphWithHighlights.fromSanity(forms.feedbackDescription);
        });
    }

    private onSubmit() {
        this.dialogRef.close();
        this.analyticsService.google.reportAdConversion("sendFeedback");
        this._popupNotificationService.success("Your feedback has been submitted. Thank you!");
    }
}

@Component({
    selector: "td-contact-dialog",
    template: `<td-dialog [isSubmitting]="isSubmitting" titleProp="Get in touch" [description]="description" />`,
})
export class ContactDialogComponent {
    isSubmitting = false;
    description?: ParagraphWithHighlights;

    constructor(
        private dialogRef: MatDialogRef<ContactDialogComponent>,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
    ) {
        this._formService.embedHubspotForm("contact", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.isSubmitting = val;
            },
            onSuccess: () => this.onSubmit(),
        });
        this._formService.forms.subscribe((forms) => {
            this.description = forms.contactDescription && ParagraphWithHighlights.fromSanity(forms.contactDescription);
        });
    }

    private onSubmit() {
        this.dialogRef.close();
        this.analyticsService.google.reportAdConversion("getInTouch");
        this._popupNotificationService.success("Your message has been sent!");
    }
}

@Component({
    selector: "td-dialog-close-button",
    templateUrl: "dialog-close-button.component.html",
    styleUrls: ["./dialog-close-button.component.scss"],
})
export class DialogCloseButtonComponent {}
