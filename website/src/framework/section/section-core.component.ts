import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { Organisation, SectionBase } from "typedb-web-schema";
import { ActionsComponent } from "../actions/actions.component";
import { RichTextComponent } from "../text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../text/text-with-highlights.component";

@Component({
    selector: "td-section-core",
    templateUrl: "section-core.component.html",
    styleUrls: ["./section-core.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [HeadingWithHighlightsComponent, RichTextComponent, ActionsComponent],
})
export class SectionCoreComponent {
    @Input() section!: SectionBase;
    @Input() level: "h1" | "h2" | "h3" = "h2";
    @Input() noBody?: boolean;
    @Input() organisationLogos?: Organisation[];
    @Input() noSectionClass?: boolean;
    themeColorHex = "#02DAC9";

    @HostBinding("class")
    get clazz(): string {
        return this.noSectionClass ? this.levelClass : `section ${this.levelClass}`;
    }

    private get levelClass(): string {
        return `tb-level-${this.level}`;
    }
}
