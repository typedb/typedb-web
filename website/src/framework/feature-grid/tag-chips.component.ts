
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-tag-chips",
    templateUrl: "./tag-chips.component.html",
    styleUrls: ["./tag-chips.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class TagChipsComponent {
    @Input() tags!: string[];
    @Input({ required: true }) sectionId!: string;

    chipId(tag: string): string {
        return sanitiseHtmlID(`${this.sectionId}_${tag}`);
    }
}
