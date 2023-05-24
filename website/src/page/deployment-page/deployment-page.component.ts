import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeploymentPage, deploymentPageSchemaName, SanityDeploymentPage, TechnicolorBlock } from "typedb-web-schema";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-deployment-page",
    templateUrl: "./deployment-page.component.html",
    styleUrls: ["./deployment-page.component.scss"]
})
export class DeploymentPageComponent implements OnInit {
    page?: DeploymentPage;

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityDeploymentPage = data.getDocumentByID(deploymentPageSchemaName) as SanityDeploymentPage;
            if (sanityDeploymentPage) {
                this.page = new DeploymentPage(sanityDeploymentPage, data);
            }
        });
    }
}

@Component({
    selector: "td-deployment-page-technicolor-block",
    template: "<td-technicolor-block [block]='block' [index]='index' [size]='size' [noLeadingLine]='index === 0' [noBackgroundImage]='index === 0'></td-technicolor-block>",
})
export class DeploymentPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;

    get size(): TechnicolorBlockComponent["size"] {
        return this.index === 0 ? "large" : "medium";
    }
}
