
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { sanitiseHtmlID } from "typedb-web-common/lib";

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

    // Color palette for tags
    private readonly tagColors = [
        { bg: '#1a182a', text: '#02dac9' },      // green
        { bg: '#1a182a', text: '#7ba0ff' },      // blue
        { bg: '#1a182a', text: '#ffe49e' },      // yellow
        { bg: '#1a182a', text: '#ffa187' },      // prism-orange
        { bg: '#1a182a', text: '#55eae2' },      // prism-cyan
        { bg: '#1a182a', text: '#ffc980' },      // prism-yellow-orange
        { bg: '#1a182a', text: '#ff7b72' },      // prism-red
    ];

    chipId(tag: string): string {
        return sanitiseHtmlID(`${this.sectionId}_${tag}`);
    }

    getTagColor(tag: string): { bg: string; text: string } {
        // Simple hash function to generate consistent index from tag name
        let hash = 0;
        for (let i = 0; i < tag.length; i++) {
            hash = ((hash << 5) - hash) + tag.charCodeAt(i);
            hash = hash & hash; // Convert to 32bit integer
        }
        const index = Math.abs(hash) % this.tagColors.length;
        return this.tagColors[index];
    }
}
