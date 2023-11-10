import { Component, HostBinding, Input } from "@angular/core";

import { Person } from "typedb-web-schema";

import { ImageBuilder } from "src/service/image-builder.service";

@Component({
    selector: "td-person-info",
    templateUrl: "./person-info.component.html",
    styleUrls: ["./person-info.component.scss"],
})
export class PersonInfoComponent {
    @Input() disableLink = false;
    @Input() person!: Person;
    @Input() variant: "event" | "article" | "articleDetails" = "event";

    @HostBinding("class") get variantClass(): string {
        const classMap: Record<typeof this.variant, string> = {
            event: "pi-event",
            article: "pi-article",
            articleDetails: "pi-article-details",
        };
        return classMap[this.variant];
    }

    get displayAsLink(): boolean {
        return !this.disableLink && !!this.person.linkedInURL;
    }

    constructor(private imageBuilder: ImageBuilder) {}

    getPersonImage(person: Person): string {
        return this.imageBuilder.image(person.headshotURL).width(88).url();
    }
}
