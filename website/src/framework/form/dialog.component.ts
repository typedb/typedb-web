import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormService } from "../../service/form.service";
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
    constructor(private dialogRef: MatDialogRef<CloudWaitlistDialogComponent>) {
    }

    onSubmit(data: NameEmailForm) {
        alert(`Thanks, ${data.firstName} ${data.lastName}! You haven't actually been added to the waitlist, but we appreciate you anyway.`);
    }
}

@Component({
    selector: "td-newsletter-dialog",
    template: "<td-name-email-dialog titleProp='Subscribe to TypeDB newsletter' submitButtonText='Subscribe' (submit)='onSubmit($event)'></td-name-email-dialog>",
})
export class NewsletterDialogComponent {
    constructor(private dialogRef: MatDialogRef<NewsletterDialogComponent>) {
    }

    onSubmit(data: NameEmailForm) {
        alert(`Thanks, ${data.firstName} ${data.lastName}! But you're not actually getting any newsletters anytime soon.`);
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

    constructor(private dialogRef: MatDialogRef<ContactDialogComponent>, private _formService: FormService) {
        this._formService.embedHubspotForm("contact", "hubspot-form-holder-contact");
    }

    onSubmit() {
        if (!this.formEl.nativeElement.reportValidity()) return;

        alert(`Thanks, ${this.form.companyName} employee, for putting in the effort to fill out this form! Your responses have been sent to the bit bucket.`);
    }
}

interface ContactForm extends NameEmailForm {
    companyName: string;
    jobFunction: string;
    topics: { [topic in ContactFormTopic]: boolean };
    body: string;
}
