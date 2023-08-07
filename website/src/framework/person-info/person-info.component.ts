import { Component, Input } from "@angular/core";
import { ImageBuilder } from "src/service/image-builder.service";
import { Person } from "typedb-web-schema";

@Component({
    selector: "td-person-info",
    templateUrl: "./person-info.component.html",
    styleUrls: ["./person-info.component.scss"],
})
export class PersonInfoComponent {
    @Input() person!: Person;

    constructor(private imageBuilder: ImageBuilder) {}

    getPersonImage(speaker: Person): string {
        return this.imageBuilder.image(speaker.headshotURL).width(88).url();
    }
}
