import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: "tp-spinner",
    template: `<mat-spinner [diameter]="size"/>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [MatProgressSpinnerModule]
})
export class SpinnerComponent {
    @Input() size = 32;
}
