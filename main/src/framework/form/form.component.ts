import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { AbstractControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { filter, Subject, Subscription } from "rxjs";

@Component({
    selector: "td-form",
    templateUrl: "form.component.html",
    imports: [ReactiveFormsModule]
})
export class FormComponent<CONTROLS extends { [K in keyof CONTROLS]: AbstractControl<any, any>; }> implements OnInit, OnDestroy {
    @Input({ required: true }) formGroup!: FormGroup<CONTROLS>;
    @Input({ required: true }) isSubmitting$!: Subject<boolean>;
    @Output() doSubmit = new EventEmitter<void>();
    private submittingSub!: Subscription;

    ngOnInit() {
        this.submittingSub = this.isSubmitting$.pipe(filter(x => !x)).subscribe(() => {
            this.formGroup.enable({ emitEvent: false });
        });
    }

    ngOnDestroy() {
        this.submittingSub.unsubscribe();
    }

    get value() {
        return this.formGroup.value;
    }

    submit() {
        if (!this.formGroup.valid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        this.isSubmitting$.next(true);
        this.formGroup.disable({ emitEvent: false });
        this.doSubmit.emit();
    }
}
