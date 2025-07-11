import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormOption } from "../select/form-select.component";

@Component({
    selector: "td-form-toggle-group",
    templateUrl: "./form-toggle-group.component.html",
    styleUrls: ["./form-toggle-group.component.scss"],
    imports: [MatFormFieldModule, MatButtonToggleModule, FormsModule, ReactiveFormsModule]
})
export class FormToggleGroupComponent<VALUE, FORM extends { [K in keyof FORM & string]: AbstractControl; } & { [key: string]: AbstractControl }> implements OnInit {
    @Input({ required: true }) form!: FormGroup<FORM>;
    @Input({ required: true }) field!: string;
    @Input({ required: true }) options: FormOption<VALUE>[] = [];
    @Input() disabled?: boolean;

    formControl!: FormControl;

    constructor() {
    }

    ngOnInit() {
        this.formControl = this.form.controls[this.field] as FormControl;
    }
}
