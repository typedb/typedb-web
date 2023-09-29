import { Component, Input } from "@angular/core";

@Component({
    selector: "td-tag-chips",
    template: '<aside *ngFor="let tag of tags">{{ tag }}</aside>\n',
    styleUrls: ["./tag-chips.component.scss"],
})
export class TagChipsComponent {
    @Input() tags!: string[];
}
