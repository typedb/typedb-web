import { Component, Input } from "@angular/core";
import { TechnicolorBlock, TechnicolorBlockChain } from "../../model/technicolor-block-chain";

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
}
