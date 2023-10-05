import { Component, DestroyRef, Input, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SanitySolutionPage, SolutionPage, solutionPageSchemaName } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { MetaTagsService } from "src/service/meta-tags.service";

@Component({
    selector: "td-solution-page",
    templateUrl: "./solution-page.component.html",
    styleUrls: ["./solution-page.component.scss"],
})
export class SolutionPageComponent implements OnInit {
    page?: SolutionPage;

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private destroyRef: DestroyRef,
        private metaTags: MetaTagsService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanitySolutionPages = data.getDocumentsByType(solutionPageSchemaName) as SanitySolutionPage[];
                const sanitySolutionPage = sanitySolutionPages.find((x) => x.route.current === params.get("route"));
                if (sanitySolutionPage) {
                    this.page = new SolutionPage(sanitySolutionPage, data);
                    this._title.setTitle(`${this.page.title} - TypeDB Solutions`);
                    this.metaTags.register(this.page.metaTags, this.destroyRef);
                    this._analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        this._idleMonitor.fireManualMyAppReadyEvent();
                    }, 15000);
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
            });
        });
    }
}

@Component({
    selector: "td-solution-page-technicolor-block",
    template:
        '<td-technicolor-block [block]="block" [index]="index + 1" [noLeadingLine]=\'index === 0\' [noTrailingLine]="noTrailingLine"></td-technicolor-block>',
})
export class SolutionPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: SolutionPage;

    get allBlocks(): TechnicolorBlock[] {
        return [
            this.page!.useCasesSection,
            this.page!.challengesSection,
            this.page!.solutionSection,
            this.page!.furtherReadingSection,
        ].filter((x) => !!x) as TechnicolorBlock[];
    }

    get index() {
        return this.allBlocks.indexOf(this.block!);
    }

    get noTrailingLine() {
        return this.index >= this.allBlocks.length - 1;
    }
}
