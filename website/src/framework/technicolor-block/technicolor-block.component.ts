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

    backgroundImageURLForIndex(idx: number): string | undefined {
        if (idx === 0) return undefined;
        switch (idx % 6) {
            case 1: return "/assets/images/nebula-secondary.jpg";
            case 2: return "/assets/images/nebula-secondary.jpg";
            case 3: return "/assets/images/nebula-secondary.jpg";
            case 4: return "/assets/images/nebula-secondary.jpg";
            case 5: return "/assets/images/nebula-secondary.jpg";
            case 0: return "/assets/images/nebula-secondary.jpg";
            default: throw "Unreachable code";
        }
    }
}
