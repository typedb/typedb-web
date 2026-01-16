
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { sanitiseHtmlID } from "typedb-web-common/lib";

import { SocialMediaLink } from "typedb-web-schema";

import { LinkDirective } from "../link/link.directive";

@Component({
    selector: "td-social-media-panels",
    templateUrl: "social-media-panels.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [LinkDirective, MatIconModule]
})
export class SocialMediaPanelsComponent {
    @Input() socialMediaLinks!: SocialMediaLink[];
    @Input({ required: true }) sectionId!: string;
    @HostBinding("class.section") hasSectionClass = true;
    @HostBinding("class.narrow-section") hasNarrowSectionClass = true;

    linkId(link: SocialMediaLink): string {
        return sanitiseHtmlID(`${this.sectionId}_${link.text}`)
    }
}
