import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ParagraphWithHighlightsComponent } from "../text/text-with-highlights.component";
import { OrganisationLogosComponent } from "./organisation-logos.component";
import { SocialValidationSection } from "typedb-web-schema";

@Component({
    selector: "td-social-validation-section",
    templateUrl: "./social-validation-section.component.html",
    styleUrls: ["./social-validation-section.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ ParagraphWithHighlightsComponent, OrganisationLogosComponent]
})
export class SocialValidationSectionComponent {
    @Input({ required: true }) data!: SocialValidationSection;
}
