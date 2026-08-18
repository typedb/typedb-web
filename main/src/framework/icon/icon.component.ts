import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

export type IconName =
    | "check" | "chevron-left" | "chevron-right" | "copy" | "envelope"
    // Referenced by name from Sanity content (linkPanel.iconName) - keep in sync with the dataset
    | "sitemap" | "maximize" | "file-shield";

/**
 * Self-hosted inline SVG icons, replacing the Font Awesome kit (which render-blocked every page
 * to serve five glyphs). Sized via font-size (1em, like an icon font) and colored via
 * currentColor, so existing font-size/color styling on ancestors keeps working. Stroke width can
 * be tuned per usage with CSS (e.g. `td-icon svg { stroke-width: 1 }` for a lighter look).
 */
@Component({
    selector: "td-icon",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            @switch (icon) {
                @case ("check") {
                    <svg:polyline points="20 6 9 17 4 12" />
                }
                @case ("chevron-left") {
                    <svg:polyline points="15 18 9 12 15 6" />
                }
                @case ("chevron-right") {
                    <svg:polyline points="9 18 15 12 9 6" />
                }
                @case ("copy") {
                    <svg:rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <svg:path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                }
                @case ("envelope") {
                    <svg:rect x="2" y="4" width="20" height="16" rx="2" />
                    <svg:path d="m22 7-10 6L2 7" />
                }
                @case ("sitemap") {
                    <svg:rect x="9" y="2" width="6" height="5" rx="1" />
                    <svg:rect x="1.5" y="16.5" width="6" height="5" rx="1" />
                    <svg:rect x="9" y="16.5" width="6" height="5" rx="1" />
                    <svg:rect x="16.5" y="16.5" width="6" height="5" rx="1" />
                    <svg:path d="M12 7v3.5" />
                    <svg:path d="M4.5 16.5V13h15v3.5" />
                    <svg:path d="M12 10.5v6" />
                }
                @case ("maximize") {
                    <svg:path d="M8 3H5a2 2 0 0 0-2 2v3" />
                    <svg:path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                    <svg:path d="M3 16v3a2 2 0 0 0 2 2h3" />
                    <svg:path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                }
                @case ("file-shield") {
                    <svg:path d="M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v2" />
                    <svg:polyline points="14 2 14 8 20 8" />
                    <svg:path d="M18 12.5l4 1.5v2.8c0 2.6-2.7 4.2-4 4.7-1.3-.5-4-2.1-4-4.7V14z" />
                }
            }
        </svg>
    `,
    styles: `
        td-icon {
            display: inline-flex;
            vertical-align: -0.125em;

            svg {
                width: 1em;
                height: 1em;
                fill: none;
                stroke: currentColor;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
            }
        }
    `,
})
export class IconComponent {
    @Input({ required: true }) icon!: IconName;
}
