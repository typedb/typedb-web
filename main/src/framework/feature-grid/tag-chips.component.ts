import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

interface TagColor {
    bg: string;
    text: string;
}

const CHIP_BACKGROUND = "#1a182a";

/**
 * Tags are meant to be visually distinct from one another, which a hash alone can't guarantee.
 * Every tag currently in use is assigned a colour explicitly here; anything else falls back to
 * hashing over FALLBACK_COLORS, which is disjoint from this map so a new tag can't collide with
 * an established one. Add new tags here rather than relying on the fallback.
 */
const TAG_COLORS: Record<string, string> = {
    // Editions - these render side by side, so they need clearly separated hues
    "Community Edition": "#c099f3", // prism-purple
    "Cloud": "#02dac9",             // green
    "Enterprise": "#ffc980",        // prism-yellow-orange (gold)

    // Roadmap status
    "Planned": "#ff87dc",           // pink
    "In development": "#ffa187",    // prism-orange
};

const FALLBACK_COLORS = [
    "#7ba0ff", // blue
    "#55eae2", // prism-cyan
    "#4dc97c", // prism-green
    "#c69ec3", // prism-grey
];

@Component({
    selector: "td-tag-chips",
    templateUrl: "./tag-chips.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: []
})
export class TagChipsComponent {
    @Input() tags!: string[];

    getTagColor(tag: string): TagColor {
        return { bg: CHIP_BACKGROUND, text: TAG_COLORS[tag] ?? this.fallbackColor(tag) };
    }

    /** Consistent per-tag colour for tags with no explicit assignment. */
    private fallbackColor(tag: string): string {
        let hash = 0;
        for (let i = 0; i < tag.length; i++) {
            hash = ((hash << 5) - hash) + tag.charCodeAt(i);
            hash = hash & hash; // Convert to 32bit integer
        }
        return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
    }
}
