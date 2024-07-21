
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import { SectionBase } from "typedb-web-schema";

import { ActionsComponent } from "../actions/actions.component";
import { LinkDirective } from "../link/link.directive";
import { OrganisationLogosComponent } from "../organisation-logos/organisation-logos.component";
import { RichTextComponent } from "../text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../text/text-with-highlights.component";

@Component({
    selector: "td-section-core",
    templateUrl: "section-core.component.html",
    styleUrls: ["./section-core.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        LinkDirective, HeadingWithHighlightsComponent, RichTextComponent, ActionsComponent, OrganisationLogosComponent
    ],
})
export class SectionCoreComponent {
    @Input({ required: true }) section!: SectionBase;
    @Input() level: "h1" | "h2" = "h2";
    @Input() actionsPosition: "left" | "right" | "beforeContent" | "afterContent" = "right";

    @HostBinding("class")
    get clazz(): string {
        return `section tb-level-${this.level}`;
    }
}
