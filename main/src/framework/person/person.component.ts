import { NgOptimizedImage, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { Person } from "typedb-web-schema";

@Component({
    selector: "td-avatar",
    templateUrl: "./avatar.component.html",

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [MatIconModule, NgOptimizedImage]
})
export class AvatarComponent {
    @Input() person!: Person;

    getPersonImage(): string {
        return this.person.headshotURL;
    }
}

@Component({
    selector: "td-person-info",
    templateUrl: "./person-info.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NgTemplateOutlet, AvatarComponent]
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
    selector: "td-person-card",
    templateUrl: "./person-card.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [PersonInfoComponent, NgOptimizedImage]
})
export class PersonCardComponent {
    @Input() person!: Person;

    getLogoUrl(): string {
        return this.person.organisation.logoURL;
    }
}
