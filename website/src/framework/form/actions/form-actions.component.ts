/*
 * This unpublished material is proprietary to Vaticle.
 * All rights reserved. The methods and
 * techniques described herein are considered trade secrets
 * and/or confidential. Reproduction or distribution, in whole
 * or in part, is forbidden except by express written permission
 * of Vaticle.
 */

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonComponent } from "../../button/button.component";
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
    selector: "td-form-actions",
    templateUrl: "form-actions.component.html",
    standalone: true,
    imports: [ButtonComponent, SpinnerComponent]
})
export class FormActionsComponent {
    @Input() submitText: string = "Submit";
    @Input() submitDisabled?: boolean | null;
    @Output() submitClick = new EventEmitter<void>();
    @Input() cancellable: boolean = false;
    @Input() cancelText: string = "Cancel";
    @Output() cancel = new EventEmitter<void>();
    @Input({ required: true }) isSubmitting?: boolean | null;
    @Input({ required: true }) buttonIdPrefix!: string;

    get cancelEnabled(): boolean {
        return !this.isSubmitting;
    }

    get submitEnabled(): boolean {
        return !this.isSubmitting && !this.submitDisabled;
    }

    onCancel() {
        if (this.cancelEnabled) this.cancel.emit();
    }

    onSubmit() {
        if (this.submitEnabled) this.submitClick.emit();
    }
}
