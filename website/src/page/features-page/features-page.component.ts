import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FeaturesPage, featuresPageSchemaName, SanityFeaturesPage } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    styleUrls: ["./features-page.component.scss"]
})
export class FeaturesPageComponent implements OnInit {
    page?: FeaturesPage;

    constructor(private router: Router, private contentService: ContentService, private _title: Title) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityFeaturesPage = data.getDocumentByID(featuresPageSchemaName) as SanityFeaturesPage;
            if (sanityFeaturesPage) {
                this.page = new FeaturesPage(sanityFeaturesPage, data);
                this._title.setTitle(`${this.page.title} - TypeDB`);
            } else {
                this.page = undefined;
            }
        });
    }
}

@Component({
    selector: "td-features-page-technicolor-block",
    template: "<td-technicolor-block [block]=\"section\" [index]=\"index + 1\" [noLeadingLine]='index === 0'></td-technicolor-block>",
})
export class FeaturesPageTechnicolorBlockComponent {
    @Input() section!: TechnicolorBlock;
    @Input() index!: number;
}
