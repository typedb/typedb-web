import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { KeyPoint } from "typedb-web-schema";
import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-feature-fusion",
    templateUrl: "./feature-fusion.component.html",
    styleUrls: ["./feature-fusion.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RichTextComponent, LinkDirective],
})
export class FeatureFusionComponent {
    @Input() features!: KeyPoint[];
    @HostBinding("class") classes: Record<string, boolean> = {
        "section": true,
        "card-appearance": true
    };
}
