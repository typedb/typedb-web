import { Component, Input } from "@angular/core";
import { TechnicolorBlock, TechnicolorBlockChain } from "typedb-web-schema";

@Component({
    selector: "td-technicolor-block-chain",
    templateUrl: "technicolor-block-chain.component.html",
    styleUrls: ["./technicolor-block-chain.component.scss"],
})
export class TechnicolorBlockChainComponent {
    @Input() content!: TechnicolorBlockChain;

    get firstBlock(): TechnicolorBlock {
        return this.content.firstBlock;
    }

    get blocks(): TechnicolorBlock[] {
        return this.content.blocks;
    }
}
