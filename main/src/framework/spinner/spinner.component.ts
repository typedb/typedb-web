import { Component, Input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: "tp-spinner",
    template: `<mat-spinner [diameter]="size"/>`,
    styleUrls: ["./spinner.component.scss"],
    imports: [MatProgressSpinnerModule]
})
export class SpinnerComponent {
    @Input() size = 32;
}
