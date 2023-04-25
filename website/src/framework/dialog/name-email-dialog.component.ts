import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "td-name-email-dialog",
    templateUrl: "name-email-dialog.component.html",
    styleUrls: ["./name-email-dialog.component.scss"],
})
export class NameEmailDialogComponent {
    @Input() titleProp!: string;
    @Output() onSubmit = new EventEmitter();

    constructor(private dialogRef: MatDialogRef<NameEmailDialogComponent>) {
    }
}

@Component({
    selector: "td-cloud-waitlist-dialog",
    template: "<td-name-email-dialog titleProp='Be an early adopter' (onSubmit)='onSubmit()'></td-name-email-dialog>",
})
export class CloudWaitlistDialogComponent {
    constructor(private dialogRef: MatDialogRef<CloudWaitlistDialogComponent>) {
    }

    onSubmit() {
        alert("Thanks! You haven't actually been added to the waitlist, but we appreciate you anyway.");
    }
}
