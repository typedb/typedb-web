import { Component, Input, OnInit } from "@angular/core";
import { HomePage, HomePageIntroSection, HomePageSection } from "typedb-web-schema";
import { HomePageIntroTechnicolorBlock, TechnicolorBlock } from "../../model/technicolor-block";

@Component({
    selector: "td-home-page-block",
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index\" [numberOfBlocks]=\"numberOfBlocks\" class=\"hp-intro-block\"></td-technicolor-block>",
})
export class HomePageBlockComponent implements OnInit {
    @Input() section!: HomePageSection;
    @Input() page!: HomePage;

    block!: TechnicolorBlock;

    ngOnInit() {
        if (this.section instanceof HomePageIntroSection) {
            this.block = new HomePageIntroTechnicolorBlock(this.section.title, this.section.body);
        } else {
            this.block = new TechnicolorBlock(this.section.title, this.section.body);
        }
    }

    get index() {
        return this.page!.displayedSections.indexOf(this.section!);
    }

    get numberOfBlocks() {
        return this.page!.displayedSections.length;
    }
}
