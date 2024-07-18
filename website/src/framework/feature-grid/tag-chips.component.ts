
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "td-tag-chips",
    templateUrl: "./tag-chips.component.html",
    styleUrls: ["./tag-chips.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class TagChipsComponent {
    @Input() tags!: string[];
}
