import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

import { map, Observable, Subject, tap } from "rxjs";
import { emailPattern, emailPatternErrorText } from "typedb-web-common/lib";
import { ParagraphWithHighlights } from "typedb-web-schema";
import { FormService } from "../../../service/form.service";
import { PopupNotificationService } from "../../../service/popup-notification.service";
import { FormActionsComponent, FormComponent, FormInputComponent, patternValidator, requiredValidator } from "../../form";
import { FormDialogComponent } from "../form-dialog.component";

@Component({
    selector: "td-event-signup-dialog",
    templateUrl: "./event-signup-dialog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [FormDialogComponent, AsyncPipe, FormsModule, ReactiveFormsModule, FormInputComponent, FormComponent, FormActionsComponent]
})
export class EventSignupDialogComponent {
    readonly title$: Observable<string>;
    readonly description$: Observable<ParagraphWithHighlights | null>;
    formId!: string;
    readonly isSubmitting$ = new Subject<boolean>;
    readonly form = this.formBuilder.nonNullable.group({
        name: ["", [requiredValidator]],
        email: ["", [patternValidator(emailPattern, emailPatternErrorText), requiredValidator]],
    });

    constructor(
        private dialogRef: MatDialogRef<EventSignupDialogComponent>,
        private popupNotificationService: PopupNotificationService,
        private formService: FormService, private formBuilder: FormBuilder
    ) {
        this.title$ = formService.forms.pipe(
            tap((forms) => { this.formId = forms.eventSignup; }),
            map((forms) => forms.eventSignupTitle || "Register for the event"),
        );
        this.description$ = formService.forms.pipe(
            map((forms) =>
                forms.eventSignupDescription ? ParagraphWithHighlights.fromSanity(forms.eventSignupDescription) : null,
            ),
        );
    }

    onSubmit() {
        this.isSubmitting$.next(true);
        const { name, email } = this.form.getRawValue();
        // Customer.io emails greet people by first_name
        const [first_name, ...rest] = name.trim().split(/\s+/);
        this.formService.submit(this.formId, { name: name.trim(), first_name, last_name: rest.join(" "), email }).subscribe({
            next: () => {
                this.dialogRef.close();
                this.popupNotificationService.success("You're registered! Check your inbox for a confirmation email.");
            },
            error: () => {
                this.isSubmitting$.next(false);
                this.popupNotificationService.error("There was an error submitting your registration - please try again");
            }
        });
    }
}
