import { NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { SocialMediaLink } from "typedb-web-schema";

import { LinkDirective } from "../link/link.directive";

@Component({
    selector: "td-social-media-panels",
    templateUrl: "social-media-panels.component.html",
    styleUrls: ["./social-media-panels.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, LinkDirective, MatIconModule],
})
export class SocialMediaPanelsComponent {
    @Input() socialMediaLinks!: SocialMediaLink[];
}
