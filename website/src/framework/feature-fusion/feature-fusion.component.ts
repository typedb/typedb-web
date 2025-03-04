import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { KeyPoint } from "typedb-web-schema";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-feature-fusion",
    templateUrl: "./feature-fusion.component.html",
    styleUrls: ["./feature-fusion.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RichTextComponent],
})
export class FeatureFusionComponent {
    @Input() features!: KeyPoint[];
    @HostBinding("class") classes = "section card-appearance";
}
