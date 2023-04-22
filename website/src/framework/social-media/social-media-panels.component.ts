import { Component, Input } from "@angular/core";
import { SocialMediaLink } from "../../model/social-media-link";

@Component({
    selector: "td-social-media-panels",
    templateUrl: "social-media-panels.component.html",
    styleUrls: ["./social-media-panels.component.scss"],
})
export class SocialMediaPanelsComponent {
    @Input() socialMediaLinks!: SocialMediaLink[];
}
