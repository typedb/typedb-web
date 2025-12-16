import { AsyncPipe, Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { of, tap } from "rxjs";
import { sanitiseHtmlID } from "typedb-web-common/lib";
import { FeaturesPage, featuresPageSchemaName, Link, SanityDataset, SanityFeaturesPage } from "typedb-web-schema";
import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { SmoothScrollDirective } from "../../framework/smooth-scroll/smooth-scroll.directive";
import { PageComponentBase } from "../page-component-base";
import { FeaturesNavbarItem } from "./features-navbar.component";

export interface NestedNavbarItem extends FeaturesNavbarItem {
    children?: FeaturesNavbarItem[];
}

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    styleUrls: ["./features-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FeatureGridComponent, ConclusionPanelComponent, AsyncPipe, SectionCoreComponent,
        SmoothScrollDirective,
    ],
})
export class FeaturesPageComponent extends PageComponentBase<FeaturesPage> {
    navbarItems: NestedNavbarItem[] = [];
    location = inject(Location);

    sanitiseGridId(sectionId: string, gridName: string): string {
        const sanitizedGridName = sanitiseHtmlID(gridName);
        const sanitizedSectionId = sanitiseHtmlID(sectionId);

        // If the sanitized grid name starts with the sanitized section ID, don't duplicate it
        if (sanitizedGridName.startsWith(sanitizedSectionId + '-')) {
            return sanitizedGridName;
        }

        return `${sanitizedSectionId}-${sanitizedGridName}`;
    }

    scrollToTop(event: Event): void {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Remove hash from URL
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityFeaturesPage>(featuresPageSchemaName);
        return of(page ? new FeaturesPage(page, data) : null).pipe(
            tap((page) => {
                if (page) {
                    this.navbarItems = page.featureSections.map((section) => {
                        const children = section.featureGrids
                            .filter(grid => grid.title)
                            .map(grid => ({
                                text: grid.title!.toPlainText(),
                                href: `${this.location.path()}#${this.sanitiseGridId(section.sectionId, grid.name)}`,
                            }));

                        return {
                            text: section.title.toPlainText(),
                            href: `${this.location.path()}#${section.sectionId}`,
                            children: children.length > 0 ? children : undefined,
                        };
                    });
                }
            })
        );
    }
}
