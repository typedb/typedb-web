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

    get avatarClass(): string {
        const classMap: Record<typeof this.variant, string> = {
            event: "av-event",
            article: "av-article",
            articleDetails: "av-article-details",
        };
        return classMap[this.variant];
    }

    get displayAsLink(): boolean {
        return !this.disableLink && !!this.person.linkedInURL;
    }
}

@Component({
    selector: "td-avatar",
    templateUrl: "./avatar.component.html",
    styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent {
    @Input() person!: Person;

    constructor(private imageBuilder: ImageBuilder) {}

    getPersonImage(): string {
        return this.imageBuilder.image(this.person.headshotURL).width(88).url();
    }
}

@Component({
    selector: "td-person-card",
    templateUrl: "./person-card.component.html",
    styleUrls: ["./person-card.component.scss"],
})
export class PersonCardComponent {
    @Input() person!: Person;

    constructor(private imageBuilder: ImageBuilder) {}

    getLogoUrl(): string {
        return this.imageBuilder.image(this.person.organisation.logoURL).height(64).url();
    }
}
