import { Component, Input } from "@angular/core";

@Component({
    selector: "td-aspect-ratio",
    templateUrl: "./aspect-ratio.component.html",
    styleUrls: ["./aspect-ratio.component.scss"],
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
