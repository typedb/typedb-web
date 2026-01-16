import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { of } from "rxjs";
import { SanityDataset, SanityStartupProgramPage, StartupProgramPage, startupProgramPageSchemaName } from "typedb-web-schema";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-startup-program-page",
    templateUrl: "./startup-program-page.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SectionCoreComponent, LinkPanelsComponent, AsyncPipe],
})
export class StartupProgramPageComponent extends PageComponentBase<StartupProgramPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityStartupProgramPage>(startupProgramPageSchemaName);
        return of(page ? new StartupProgramPage(page, data) : null);
    }
}
