import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "td-aspect-ratio",
    templateUrl: "./aspect-ratio.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NgClass]
})
export class AspectRatioComponent {
    @Input() ratio: "1:1" | "16:9" | "3:2" | "17:22" = "1:1";

    get containerClass() {
        const ratioClass = {
            "1:1": "ar-ratio-1-1",
            "16:9": "ar-ratio-16-9",
            "3:2": "ar-ratio-3-2",
            "17:22": "ar-ratio-17-22",
        }[this.ratio];

        return {
            "ar-container": true,
            [ratioClass]: true,
        };
    }
}
