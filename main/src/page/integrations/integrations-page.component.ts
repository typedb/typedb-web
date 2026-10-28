import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from "@angular/core";
import { of } from "rxjs";
import { IntegrationGroup, IntegrationsPage, integrationsPageSchemaName, SanityDataset, SanityIntegrationsPage } from "typedb-web-schema";
import { ClosingPanelSectionComponent } from "../../framework/closing-panel/closing-panel-section.component";
import { LinkDirective } from "../../framework/link/link.directive";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-integrations-page",
    templateUrl: "./integrations-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [AsyncPipe, ClosingPanelSectionComponent, LinkDirective, SectionCoreComponent],
})
export class IntegrationsPageComponent extends PageComponentBase<IntegrationsPage> {
    readonly query = signal("");

    filtered(groups: IntegrationGroup[]): IntegrationGroup[] {
        const needle = this.query().trim().toLowerCase();
        if (!needle) return groups;
        return groups.map((group) => ({
            ...group,
            integrations: group.integrations.filter((x) => `${x.name} ${x.description || ""}`.toLowerCase().includes(needle)),
        }));
    }

    hasResults(groups: IntegrationGroup[]) {
        return groups.some((x) => x.integrations.length);
    }

    // The page has a <base href>, so a bare "#id" link would leave the page
    scrollTo(event: Event, id: string) {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    protected override getPage(db: SanityDataset) {
        const page = db.getDocumentByID<SanityIntegrationsPage>(integrationsPageSchemaName);
        return of(page ? new IntegrationsPage(page, db) : null);
    }
}
