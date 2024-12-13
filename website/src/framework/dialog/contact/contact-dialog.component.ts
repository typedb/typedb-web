import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogRef } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContactPanelComponent } from "../../contact-panel/contact-panel.component";
import { FormActionsComponent, FormComponent, FormInputComponent, FormTextareaComponent } from "../../form";
import { FormDialogComponent } from "../form-dialog.component";

@Component({
    selector: "td-contact-dialog",
    templateUrl: "./contact-dialog.component.html",
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
