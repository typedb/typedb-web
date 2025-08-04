import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogRef } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContactPanelComponent } from "../../contact-panel/contact-panel.component";
import { FormDialogComponent } from "../form-dialog.component";

@Component({
    selector: "td-contact-dialog",
    templateUrl: "./contact-dialog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormDialogComponent, FormsModule, ReactiveFormsModule,
        MatCheckboxModule, ContactPanelComponent,
    ]
})
export class ContactDialogComponent {
    constructor(public dialogRef: MatDialogRef<ContactDialogComponent>) {}
}
