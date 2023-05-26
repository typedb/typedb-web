import { Component, Input } from "@angular/core";
import { TechnicolorBlock } from "typedb-web-schema";

@Component({
    selector: "td-technicolor-block",
    templateUrl: "technicolor-block.component.html",
    styleUrls: ["./technicolor-block.component.scss"],
})
export class TechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;
    @Input() size: "small" | "medium" | "large" = "small";
    @Input() contentWidth: "narrow" | "wide" = "wide";
    @Input() noLeadingLine?: boolean;
    @Input() noTrailingLine?: boolean;
    @Input() noBody?: boolean;

    get graphicLineColorClass(): string {
        switch (this.index % 3) {
            case 0: return "tb-graphic-line-green";
            case 1: return "tb-graphic-line-pink";
            case 2: return "tb-graphic-line-yellow";
            default: throw "Unreachable code";
        }
    }

    get graphicIconBgColorClass(): string {
        switch (this.index % 3) {
            case 0: return "tb-graphic-icon-bg-green";
            case 1: return "tb-graphic-icon-bg-pink";
            case 2: return "tb-graphic-icon-bg-yellow";
            default: throw "Unreachable code";
        }
    }

    get themeColorHex(): string {
        switch (this.index % 3) {
            case 0: return "#02DAC9"; // TODO: parametrise
            case 1: return "#FF87DC";
            case 2: return "#FFE49E";
            default: throw "Unreachable code";
        }
    }

    get titleClass(): string {
        switch (this.size) {
            case "large": return "text-xxl";
            case "medium": return "text-xl";
            case "small": return "text-l";
        }
    }

    get bodyClass(): string {
        switch (this.size) {
            case "large": return "text-margin-l text-l";
            case "medium": return "text-margin-l text-m";
            case "small": return "text-margin-l text-s";
        }
    }
}
