import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { map, Observable, Subject, tap } from "rxjs";
import { ParagraphWithHighlights } from "typedb-web-schema";
import { emailPattern, emailPatternErrorText, namePattern, namePatternErrorText } from "typedb-web-common/lib";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AnalyticsService } from "../../../service/analytics.service";
import { FormService } from "../../../service/form.service";
import { PopupNotificationService } from "../../../service/popup-notification.service";
import { FormActionsComponent, FormComponent, FormInputComponent, patternValidator, requiredValidator } from "../../form";
import { FormDialogComponent } from "../form-dialog.component";

@Component({
    selector: "td-newsletter-dialog",
    templateUrl: "./newsletter-dialog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormDialogComponent, AsyncPipe, FormsModule, ReactiveFormsModule, FormInputComponent, FormComponent, FormActionsComponent],
})
export class NewsletterDialogComponent {
    description$: Observable<ParagraphWithHighlights | null>;
    formId!: string;
    readonly isSubmitting$ = new Subject<boolean>;
    readonly form = this.formBuilder.nonNullable.group({
        first_name: ["", [patternValidator(namePattern, namePatternErrorText), requiredValidator]],
        last_name: ["", [patternValidator(namePattern, namePatternErrorText), requiredValidator]],
        email: ["", [patternValidator(emailPattern, emailPatternErrorText), requiredValidator]],
    });

    constructor(
        private dialogRef: MatDialogRef<NewsletterDialogComponent>,
        private _popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
        private formService: FormService, private formBuilder: FormBuilder
    ) {
        this.description$ = formService.forms.pipe(
            tap((forms) => { this.formId = forms.newsletter; }),
            map((forms) =>
                forms.newsletterDescription ? ParagraphWithHighlights.fromSanity(forms.newsletterDescription) : null,
            ),
        );
    }

    onSubmit() {
        this.isSubmitting$.next(true);
        this.formService.submit(this.formId, this.form.getRawValue()).subscribe({
            next: () => {
                this.dialogRef.close();
                this.analyticsService.google.reportAdConversion("subscribeToNewsletter");
                this._popupNotificationService.success("Your email is now subscribed to our newsletter!");
            },
            error: () => {
                this.isSubmitting$.next(false);
                this._popupNotificationService.error("There was an error subscribing to the newsletter - please try again");
            }
        });
    }
}
