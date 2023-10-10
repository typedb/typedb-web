import { Component, Input } from "@angular/core";

import { Person } from "typedb-web-schema";

import { ImageBuilder } from "src/service/image-builder.service";

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
