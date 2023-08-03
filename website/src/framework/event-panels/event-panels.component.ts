import { Component, Input } from "@angular/core";
import { ImageBuilder } from "src/service/image-builder.service";
import { Event } from "typedb-web-schema";

@Component({
    selector: "td-event-panels",
    templateUrl: "event-panels.component.html",
    styleUrls: ["event-panels.component.scss"],
})
export class EventPanelsComponent {
    @Input() events!: Event[];

    constructor(private imageBuilder: ImageBuilder) {}

    getEventImageUrl(event: Event) {
        return this.imageBuilder.image(event.imageURL).width(360).url();
    }
}
