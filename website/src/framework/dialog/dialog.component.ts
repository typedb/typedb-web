import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

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

interface NameEmailForm {
    firstName: string;
    lastName: string;
    email: string;
}

@Component({
    selector: "td-cloud-waitlist-dialog",
    template: "<td-name-email-dialog titleProp='Be an early adopter' submitButtonText='Join the TypeDB Cloud Waitlist' (submit)='onSubmit($event)'></td-name-email-dialog>",
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
    template: "<td-name-email-dialog titleProp='TypeDB newsletter' submitButtonText='Subscribe to Our Newsletter' (submit)='onSubmit($event)'></td-name-email-dialog>",
})
export class NewsletterDialogComponent {
    constructor(private dialogRef: MatDialogRef<NewsletterDialogComponent>) {
    }

    onSubmit(data: NameEmailForm) {
        alert(`Thanks, ${data.firstName} ${data.lastName}! But you're not actually getting any newsletters anytime soon.`);
    }
}

@Component({
    selector: "td-contact-dialog",
    templateUrl: "contact-dialog.component.html",
    styleUrls: ["./contact-dialog.component.scss"]
})
export class ContactDialogComponent {
    @ViewChild("formEl") formEl!: ElementRef<HTMLFormElement>;
    form: ContactForm = { firstName: "", lastName: "", email: "", companyName: "" };

    constructor(private dialogRef: MatDialogRef<ContactDialogComponent>) {
    }

    onSubmit() {
        if (!this.formEl.nativeElement.reportValidity()) return;

        alert(`Thanks, ${this.form.companyName} employee, for putting in the effort to fill out this form! Your responses have been sent to the bit bucket.`);
    }
}

interface ContactForm extends NameEmailForm {
    companyName: string;
}
