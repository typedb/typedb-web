import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "td-tag-chips",
    template: `<aside *ngFor="let tag of tags">{{ tag }}</aside> `,
    styleUrls: ["./tag-chips.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagChipsComponent {
    @Input() tags!: string[];
}
