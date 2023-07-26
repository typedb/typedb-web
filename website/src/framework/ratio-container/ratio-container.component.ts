import { Component, Input } from "@angular/core";

@Component({
    selector: "td-ratio-container",
    templateUrl: "./ratio-container.component.html",
    styleUrls: ["./ratio-container.component.scss"],
})
export class RatioContainerComponent {
    @Input() ratio: "1:1" | "16:9" | "3:2" | "A4" = "1:1";

    get containerClass() {
        const ratioClass = {
            "1:1": "rc-ratio-1-1",
            "16:9": "rc-ratio-16-9",
            "3:2": "rc-ratio-3-2",
            A4: "rc-ratio-a4",
        }[this.ratio];

        return {
            "rc-container": true,
            [ratioClass]: true,
        };
    }
}
