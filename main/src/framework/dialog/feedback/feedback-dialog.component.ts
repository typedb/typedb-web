import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { map, Observable, Subject, tap } from "rxjs";
import { ParagraphWithHighlights } from "typedb-web-schema";
import { emailPattern, emailPatternErrorText } from "typedb-web-common/lib";

import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AnalyticsService } from "../../../service/analytics.service";
import { FormService } from "../../../service/form.service";
import { PopupNotificationService } from "../../../service/popup-notification.service";
import { FormActionsComponent, FormComponent, FormInputComponent, FormOption, FormTextareaComponent, FormToggleGroupComponent, patternValidator, requiredValidator } from "../../form";
import { FormDialogComponent } from "../form-dialog.component";

@Component({
    selector: "td-feedback-dialog",
    templateUrl: "./feedback-dialog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormDialogComponent, AsyncPipe, FormToggleGroupComponent, FormTextareaComponent, FormsModule,
        ReactiveFormsModule, FormComponent, FormActionsComponent, FormInputComponent
    ]
})
export class FeedbackDialogComponent {
    description$: Observable<ParagraphWithHighlights | null>;
    formId!: string;
    readonly isSubmitting$ = new Subject<boolean>();
    readonly form = this.formBuilder.group({
        overall_rating_typedb: [null as number | null, []],
        overall_rating_page: [null as number | null, []],
        feedback_text: ["", []],
        email: ["", [patternValidator(emailPattern, emailPatternErrorText), requiredValidator]],
    });
    readonly ratingOptions: FormOption<number>[] = [1, 2, 3, 4, 5].map(x => ({ value: x, viewValue: x.toString() }));

    constructor(
        private analyticsService: AnalyticsService,
        private dialogRef: MatDialogRef<FeedbackDialogComponent>,
        private popupNotificationService: PopupNotificationService,
        private formService: FormService, private formBuilder: FormBuilder
    ) {
        this.description$ = formService.forms.pipe(
            tap((forms) => { this.formId = forms.feedback; }),
            map((forms) =>
                forms.feedbackDescription ? ParagraphWithHighlights.fromSanity(forms.feedbackDescription) : null,
            ),
        );
    }

    onSubmit() {
        this.isSubmitting$.next(true);
        this.formService.submit(this.formId, Object.assign({}, this.form.getRawValue() as { email: string }, { feedback_page_url: window.location.href.split("?")[0] })).subscribe({
            next: () => {
                this.dialogRef.close();
                this.analyticsService.google.reportAdConversion("sendFeedback");
                this.popupNotificationService.success("Your feedback has been submitted. Thank you!");
            },
            error: () => {
                this.isSubmitting$.next(false);
                this.popupNotificationService.error("There was an error submitting feedback - please try again");
            },
        });
    }
}
