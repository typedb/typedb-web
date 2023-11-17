import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { ParagraphWithHighlights } from "typedb-web-schema";

import { AnalyticsService } from "../../service/analytics.service";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";

@Component({
    selector: "td-name-email-dialog",
    templateUrl: "name-email-dialog.component.html",
    styleUrls: ["./name-email-dialog.component.scss"],
})
export class NameEmailDialogComponent {
    @Input() isSubmitting!: boolean;
    @Input() titleProp!: string;
    @Input() descriptionProp?: ParagraphWithHighlights;
}

@Component({
    selector: "td-cloud-waitlist-dialog",
    template: `<td-name-email-dialog
        [isSubmitting]="isSubmitting"
        titleProp="Join TypeDB Cloud Waitlist"
        [descriptionProp]="descriptionProp"
    />`,
})
export class CloudWaitlistDialogComponent {
    isSubmitting = false;
    descriptionProp?: ParagraphWithHighlights;

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
            this.descriptionProp = ParagraphWithHighlights.fromSanity(forms.typeDBCloudWaitlistDescription);
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
    template: `<td-name-email-dialog
        [isSubmitting]="isSubmitting"
        titleProp="Subscribe to Newsletter"
        [descriptionProp]="descriptionProp"
    />`,
})
export class NewsletterDialogComponent {
    isSubmitting = false;
    descriptionProp?: ParagraphWithHighlights;

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
            this.descriptionProp = ParagraphWithHighlights.fromSanity(forms.newsletterDescription);
        });
    }

    private onSubmit() {
        this.dialogRef.close();
        this.analyticsService.google.reportAdConversion("subscribeToNewsletter");
        this._popupNotificationService.success("Your email is now subscribed to our newsletter!");
    }
}

@Component({
    selector: "td-contact-dialog",
    templateUrl: "contact-dialog.component.html",
    styleUrls: ["./contact-dialog.component.scss"],
})
export class ContactDialogComponent {
    allTopics = [
        "Products & Services",
        "Support",
        "Consulting",
        "Sales",
        "Training",
        "Careers",
        "PR & Analyst Relations",
    ] as const;
    isSubmitting = false;
    descriptionProp?: ParagraphWithHighlights;

    constructor(
        private dialogRef: MatDialogRef<ContactDialogComponent>,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
    ) {
        this._formService.embedHubspotForm("contact", "hubspot-form-holder-contact", {
            onLoadingChange: (val) => {
                this.isSubmitting = val;
            },
            onSuccess: () => this.onSubmit(),
        });
        this._formService.forms.subscribe((forms) => {
            this.descriptionProp = ParagraphWithHighlights.fromSanity(forms.contactDescription);
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
