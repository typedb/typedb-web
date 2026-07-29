import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Output, EventEmitter, Input, ViewEncapsulation } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { Subject } from "rxjs";

import { FormService } from "src/service/form.service";
import { PopupNotificationService } from "src/service/popup-notification.service";
import { AnalyticsService } from "../../service/analytics.service";
import { FormActionsComponent, FormComponent, FormInputComponent, FormTextareaComponent, patternValidator, requiredValidator } from "../form";
import { FormBuilder } from "@angular/forms";
import { emailPattern, emailPatternErrorText } from "typedb-web-common/lib";

@Component({
    selector: "td-contact-form",
    templateUrl: "contact-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatProgressBarModule, AsyncPipe, FormActionsComponent, FormComponent, FormInputComponent, FormTextareaComponent,
    ]
})
export class ContactFormComponent {
    @Input() showPersonalDataNotice = false;
    @Output() readonly submitDone = new EventEmitter();

    formId!: string;
    readonly isSubmitting$ = new Subject<boolean>();

    // field names double as the Customer.io form field names - see FormService.submit
    readonly form = this.formBuilder.nonNullable.group({
        name: ["", [requiredValidator]],
        email: ["", [patternValidator(emailPattern, emailPatternErrorText), requiredValidator]],
        company: ["", [requiredValidator]],
        country: ["", []],
        contact_request_body: ["", [requiredValidator]],
    });

    constructor(
        private formService: FormService, private formBuilder: FormBuilder,
        private popupNotificationService: PopupNotificationService,
        private analyticsService: AnalyticsService,
    ) {
        formService.forms.subscribe({
            next: (forms) => {
                this.formId = forms.contact;
            }
        });
    }

    onSubmit() {
        this.isSubmitting$.next(true);
        this.formService.submit(this.formId, Object.assign({}, this.form.getRawValue() as { email: string }, { contact_page_url: window.location.href.split("?")[0] })).subscribe({
            next: () => {
                this.isSubmitting$.next(false);
                this.analyticsService.google.reportAdConversion("getInTouch");
                this.popupNotificationService.success("Your message has been sent!");
                this.submitDone.emit();
            },
            error: () => {
                this.isSubmitting$.next(false);
                this.popupNotificationService.error("There was an error submitting the form - please try again");
            },
        });
    }
}
