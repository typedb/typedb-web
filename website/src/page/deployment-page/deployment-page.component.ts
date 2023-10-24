import { Component, DestroyRef, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { DeploymentPage, deploymentPageSchemaName, SanityDeploymentPage, TechnicolorBlock } from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-deployment-page",
    templateUrl: "./deployment-page.component.html",
})
export class DeploymentPageComponent implements OnInit {
    page?: DeploymentPage;

    constructor(
        private router: Router,
        private contentService: ContentService,
        private destroyRef: DestroyRef,
        private metaTags: MetaTagsService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityDeploymentPage = data.getDocumentByID(deploymentPageSchemaName) as SanityDeploymentPage;
            if (sanityDeploymentPage) {
                this.page = new DeploymentPage(sanityDeploymentPage, data);
                this._title.setTitle(`TypeDB | ${this.page.title}`);
                const { unregister } = this.metaTags.register(this.page.metaTags);
                this.destroyRef.onDestroy(unregister);
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
        });
    }
}

@Component({
    selector: "td-deployment-page-technicolor-block",
    template:
        "<td-technicolor-block [block]='block' [index]='index' [level]='level' [noLeadingLine]='index === 0'></td-technicolor-block>",
})
export class DeploymentPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;

    get level(): TechnicolorBlockComponent["level"] {
        return this.index === 0 ? "h1" : "h2";
    }
}
