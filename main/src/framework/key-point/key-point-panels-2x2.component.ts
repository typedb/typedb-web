import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { SectionCore } from "typedb-web-schema";
import { SectionCoreComponent } from "../section/section-core.component";

@Component({
    selector: "td-key-point-panels-2x2",
    templateUrl: "key-point-panels-2x2.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SectionCoreComponent]
})
export class KeyPointPanels2x2Component {
    @Input() keyPoints!: SectionCore[];
}
