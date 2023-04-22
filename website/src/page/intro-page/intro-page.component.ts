import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IntroPage, IntroPageCoreSection, introPageSchemaName, SanityIntroPage } from "typedb-web-schema";
import { TechnicolorBlock } from "../../model/technicolor-block";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-intro-page",
    templateUrl: "./intro-page.component.html",
    styleUrls: ["./intro-page.component.scss"]
})
export class IntroPageComponent implements OnInit {
    page?: IntroPage;

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityIntroPage = data.byId[introPageSchemaName] as SanityIntroPage;
            if (sanityIntroPage) {
                this.page = new IntroPage(sanityIntroPage, data);
            } else {
                this.page = undefined;
            }
        });
    }
}

@Component({
    selector: "td-intro-page-technicolor-block",
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index\" [noLeadingLine]='index === 0' [noBackgroundImage]='true' [greyLine]='true'></td-technicolor-block>",
})
export class IntroPageTechnicolorBlockComponent implements OnInit {
    @Input() section!: IntroPageCoreSection;
    @Input() index!: number;
    @Input() page!: IntroPage;

    block!: TechnicolorBlock;

    ngOnInit() {
        this.block = new TechnicolorBlock(this.section.title, this.section.body, this.section.iconURL);
    }
}
