import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";
import { NameEmailForm } from "./form";

@Component({
    selector: "td-name-email-dialog",
    templateUrl: "name-email-dialog.component.html",
    styleUrls: ["./name-email-dialog.component.scss"],
})
export class NameEmailDialogComponent {
    @Input() titleProp!: string;
    @Input() submitButtonText = "Submit";
    @Output() submit = new EventEmitter<NameEmailForm>();
    @ViewChild("formEl") formEl!: ElementRef<HTMLFormElement>;
    form: NameEmailForm = { firstName: "", lastName: "", email: "" };

    constructor(private dialogRef: MatDialogRef<NameEmailDialogComponent>) {
    }

    onSubmit() {
        if (!this.formEl.nativeElement.reportValidity()) return;

        this.submit.emit(this.form);
    }
}

@Component({
    selector: "td-cloud-waitlist-dialog",
    template: "<td-name-email-dialog titleProp='Join TypeDB Cloud waitlist' submitButtonText='Register' (submit)='onSubmit($event)'></td-name-email-dialog>",
})
export class CloudWaitlistDialogComponent {
    constructor(private dialogRef: MatDialogRef<CloudWaitlistDialogComponent>, private _formService: FormService, private _popupNotificationService: PopupNotificationService) {
        this._formService.embedHubspotForm("typeDBCloudWaitlist", "popup-hubspot-form-holder");
    }

    onSubmit(data: NameEmailForm) {
        this.dialogRef.close();
        this._popupNotificationService.success("You're now on the TypeDB Cloud waitlist!");
    }
}

@Component({
    selector: "td-newsletter-dialog",
    template: "<td-name-email-dialog titleProp='Subscribe to TypeDB Newsletter' submitButtonText='Subscribe' (submit)='onSubmit()'></td-name-email-dialog>",
})
export class NewsletterDialogComponent {
    constructor(private dialogRef: MatDialogRef<NewsletterDialogComponent>, private _formService: FormService, private _popupNotificationService: PopupNotificationService) {
        this._formService.embedHubspotForm("newsletter", "popup-hubspot-form-holder");
    }

    onSubmit() {
        // TODO: maybe don't close immediately but show a loading indicator until it's submitted
        // TODO: we don't actually check the submission status; the 'submit' event is triggered regardless
        this.dialogRef.close();
        this._popupNotificationService.success("Your email is now subscribed to our newsletter!");
    }
}

const CONTACT_FORM_TOPICS = ["Products & Services", "Support", "Consulting", "Sales", "Training", "Careers", "PR & Analyst Relations"] as const;

type ContactFormTopic = typeof CONTACT_FORM_TOPICS[number];

@Component({
    selector: "td-contact-dialog",
    templateUrl: "contact-dialog.component.html",
    styleUrls: ["./contact-dialog.component.scss"]
})
export class ContactDialogComponent {
    @ViewChild("formEl") formEl!: ElementRef<HTMLFormElement>;
    allTopics = ["Products & Services", "Support", "Consulting", "Sales", "Training", "Careers", "PR & Analyst Relations"] as const;
    form: ContactForm = { firstName: "", lastName: "", email: "", companyName: "", jobFunction: "", topics: CONTACT_FORM_TOPICS.reduce((obj, x) => Object.assign(obj, {[x]: false}), {}) as any, body: "" };

    constructor(private dialogRef: MatDialogRef<ContactDialogComponent>, private _formService: FormService, private _popupNotificationService: PopupNotificationService) {
        this._formService.embedHubspotForm("contact", "hubspot-form-holder-contact");
    }

    onSubmit() {
        if (!this.formEl.nativeElement.reportValidity()) return;

        this.dialogRef.close();
        this._popupNotificationService.success("Your message has been sent!");
    }
}

interface ContactForm extends NameEmailForm {
    companyName: string;
    jobFunction: string;
    topics: { [topic in ContactFormTopic]: boolean };
    body: string;
}
