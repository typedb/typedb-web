import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

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
}

@Component({
    selector: "td-cloud-waitlist-dialog",
    template: `<td-name-email-dialog [isSubmitting]="isSubmitting" titleProp="Join TypeDB Cloud Waitlist" />`,
})
export class CloudWaitlistDialogComponent {
    isSubmitting = false;

    constructor(
        private dialogRef: MatDialogRef<CloudWaitlistDialogComponent>,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
    ) {
        this._formService.embedHubspotForm("typeDBCloudWaitlist", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.isSubmitting = val;
            },
            onSuccess: () => this.onSubmit(),
        });
    }

    private onSubmit() {
        this.dialogRef.close();
        this._popupNotificationService.success("You're now on the TypeDB Cloud waitlist!");
    }
}

@Component({
    selector: "td-newsletter-dialog",
    template: `<td-name-email-dialog [isSubmitting]="isSubmitting" titleProp="Subscribe to Newsletter" />`,
})
export class NewsletterDialogComponent {
    isSubmitting = false;

    constructor(
        private dialogRef: MatDialogRef<NewsletterDialogComponent>,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
    ) {
        this._formService.embedHubspotForm("newsletter", "popup-hubspot-form-holder", {
            onLoadingChange: (val) => {
                this.isSubmitting = val;
            },
            onSuccess: () => this.onSubmit(),
        });
    }

    private onSubmit() {
        this.dialogRef.close();
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

    constructor(
        private dialogRef: MatDialogRef<ContactDialogComponent>,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
    ) {
        this._formService.embedHubspotForm("contact", "hubspot-form-holder-contact", {
            onLoadingChange: (val) => {
                this.isSubmitting = val;
            },
            onSuccess: () => this.onSubmit(),
        });
    }

    private onSubmit() {
        this.dialogRef.close();
        this._popupNotificationService.success("Your message has been sent!");
    }
}

@Component({
    selector: "td-dialog-close-button",
    templateUrl: "dialog-close-button.component.html",
    styleUrls: ["./dialog-close-button.component.scss"],
})
export class DialogCloseButtonComponent {}
