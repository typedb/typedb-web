import { AsyncPipe, Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { of, tap } from "rxjs";
import { FeaturesPage, featuresPageSchemaName, Link, SanityDataset, SanityFeaturesPage } from "typedb-web-schema";
import { BackToTopButtonComponent } from "../../framework/back-to-top/back-to-top-button.component";
import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { IllustrationSectionComponent } from "../../framework/section/illustration/illustration-section.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";
import { FeaturesNavbarComponent, FeaturesNavbarItem } from "./features-navbar.component";

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    styleUrls: ["./features-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FeatureGridComponent, ConclusionPanelComponent, AsyncPipe, SectionCoreComponent, IllustrationSectionComponent,
        FeaturesNavbarComponent, BackToTopButtonComponent,
    ],
})
export class FeaturesPageComponent extends PageComponentBase<FeaturesPage> {
    navbarItems: FeaturesNavbarItem[] = [];
    location = inject(Location);

    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityFeaturesPage>(featuresPageSchemaName);
        return of(page ? new FeaturesPage(page, data) : null).pipe(
            tap((page) => {
                if (page) {
                    this.navbarItems = page.featureSections.map((section) => ({
                        text: section.title.toPlainText(),
                        href: `${location.pathname}#${section.sectionId}`,
                    }));
                }
            })
        );
    }
}
