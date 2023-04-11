import { Component, Input } from "@angular/core";
import { TechnicolorBlock } from "../../model/technicolor-block";

@Component({
    selector: "td-technicolor-block",
    templateUrl: "technicolor-block.component.html",
    styleUrls: ["./technicolor-block.component.scss"],
})
export class TechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;
    @Input() numberOfBlocks!: number;

    get backgroundImageURL(): string | undefined {
        if (this.index === 0) return undefined;
        switch (this.index % 6) {
            case 1: return "/assets/img/nebula-secondary.jpg";
            case 2: return "/assets/img/nebula-secondary.jpg";
            case 3: return "/assets/img/nebula-secondary.jpg";
            case 4: return "/assets/img/nebula-secondary.jpg";
            case 5: return "/assets/img/nebula-secondary.jpg";
            case 0: return "/assets/img/nebula-secondary.jpg";
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
}
