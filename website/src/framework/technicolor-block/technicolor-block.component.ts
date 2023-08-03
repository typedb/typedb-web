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
    @Input() size: "medium" | "large" = "medium";
    @Input() contentWidth: "narrow" | "wide" = "wide";
    @Input() noLeadingLine?: boolean;
    @Input() noTrailingLine?: boolean;
    @Input() noBody?: boolean;
    @Input() longUpperChain?: boolean;

    get graphicLineColorClass(): string {
        switch (this.index % 3) {
            case 0:
                return "tb-graphic-line-green";
            case 1:
                return "tb-graphic-line-pink";
            case 2:
                return "tb-graphic-line-yellow";
            default:
                throw "Unreachable code";
        }
    }

    get graphicIconBgColorClass(): string {
        switch (this.index % 3) {
            case 0:
                return "tb-graphic-icon-bg-green";
            case 1:
                return "tb-graphic-icon-bg-pink";
            case 2:
                return "tb-graphic-icon-bg-yellow";
            default:
                throw "Unreachable code";
        }
    }

    get themeColorHex(): string {
        switch (this.index % 3) {
            case 0:
                return "#02DAC9"; // TODO: parametrise
            case 1:
                return "#FF87DC";
            case 2:
                return "#FFE49E";
            default:
                throw "Unreachable code";
        }
    }

    get titleClass(): string {
        switch (this.size) {
            case "large":
                return "text-56-64 text-48-60-tablet text-34-48-mobile";
            case "medium":
                return "text-40-54 text-34-48-tablet text-22-33-mobile";
        }
    }

    get bodyClass(): string {
        switch (this.size) {
            case "large":
                return "tb-text-l text-32-44 text-24-37-tablet text-16-24-mobile";
            case "medium":
                return "tb-text-m text-24-32 text-20-32-tablet text-14-21-mobile";
        }
    }
}
