
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "td-tag-chips",
    template: `@for (tag of tags; track tag) {<aside>{{ tag }}</aside>} `,
    styleUrls: ["./tag-chips.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class TagChipsComponent {
    @Input() tags!: string[];
}
