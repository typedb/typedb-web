import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeploymentPage, deploymentPageSchemaName, SanityDeploymentPage, TechnicolorBlock } from "typedb-web-schema";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";

@Component({
    selector: "td-deployment-page",
    templateUrl: "./deployment-page.component.html",
    styleUrls: ["./deployment-page.component.scss"],
})
export class DeploymentPageComponent implements OnInit {
    page?: DeploymentPage;

    constructor(
        private router: Router,
        private contentService: ContentService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityDeploymentPage = data.getDocumentByID(deploymentPageSchemaName) as SanityDeploymentPage;
            if (sanityDeploymentPage) {
                this.page = new DeploymentPage(sanityDeploymentPage, data);
                this._title.setTitle(`${this.page.title} - TypeDB`);
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 10000);
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
        });
    }
}

@Component({
    selector: "td-deployment-page-technicolor-block",
    template:
        "<td-technicolor-block [block]='block' [index]='index' [size]='size' [noLeadingLine]='index === 0'></td-technicolor-block>",
})
export class DeploymentPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;

    get size(): TechnicolorBlockComponent["size"] {
        return this.index === 0 ? "large" : "medium";
    }
}
