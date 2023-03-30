import { Component, Input } from "@angular/core";
import { TechnicolorBlock, TechnicolorBlockChain } from "typedb-web-schema";

@Component({
    selector: "td-technicolor-block-chain",
    templateUrl: "technicolor-block-chain.component.html",
    styleUrls: ["./technicolor-block-chain.component.scss"],
})
export class TechnicolorBlockChainComponent {
    @Input() content!: TechnicolorBlockChain;

    get blocks(): TechnicolorBlock[] {
        return this.content.blocks;
    }

    backgroundImageURLForIndex(idx: number): string {
        switch (idx % 6) {
            case 0: return "/assets/images/nebula-secondary.jpg";
            case 1: return "/assets/images/nebula-secondary.jpg";
            case 2: return "/assets/images/nebula-secondary.jpg";
            case 3: return "/assets/images/nebula-secondary.jpg";
            case 4: return "/assets/images/nebula-secondary.jpg";
            case 5: return "/assets/images/nebula-secondary.jpg";
            default: throw "Unreachable code";
        }
    }
}
