import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { KeyPoint } from "typedb-web-schema/lib/key-point";
import { SectionCoreComponent } from "../section/section-core.component";
import { TitleBodyActionsSectionComponent } from "../section/title-body-actions-section.component";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-key-point-panels-2x2",
    templateUrl: "key-point-panels-2x2.component.html",
    styleUrls: ["./key-point-panels-2x2.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RichTextComponent, SectionCoreComponent, TitleBodyActionsSectionComponent]
})
export class KeyPointPanels2x2Component {
    @Input() keyPoints!: KeyPoint[];
}
