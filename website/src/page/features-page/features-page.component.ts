import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FeaturesPage, FeaturesPageCoreSection, featuresPageSchemaName, IntroPage, IntroPageCoreSection, SanityFeaturesPage } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    styleUrls: ["./features-page.component.scss"]
})
export class FeaturesPageComponent implements OnInit {
    page?: FeaturesPage;

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityFeaturesPage = data.getDocumentByID(featuresPageSchemaName) as SanityFeaturesPage;
            if (sanityFeaturesPage) {
                this.page = new FeaturesPage(sanityFeaturesPage, data);
            } else {
                this.page = undefined;
            }
        });
    }
}

@Component({
    selector: "td-features-page-technicolor-block",
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index + 1\" [noLeadingLine]='index === 0'></td-technicolor-block>",
})
export class FeaturesPageTechnicolorBlockComponent implements OnInit {
    @Input() section!: FeaturesPageCoreSection;
    @Input() index!: number;

    block!: TechnicolorBlock;

    ngOnInit() {
        this.block = new TechnicolorBlock(this.section);
    }
}
