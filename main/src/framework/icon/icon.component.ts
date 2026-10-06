import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

export type IconName =
    | "check" | "chevron-left" | "chevron-right" | "copy" | "envelope"
    // Referenced by name from Sanity content (linkPanel.iconName) - keep in sync with the dataset
    | "sitemap" | "maximize" | "file-shield"
    // Home page redesign icons, drawn on the mockup's 44px (problems) and 40px (agents) grids and fitted to 24px
    | "structure-drift" | "many-sided-relation" | "guardrails-warning" | "mcp" | "vector" | "embedded";

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
                @case ("structure-drift") {
                    <svg:g transform="matrix(0.8 0 0 0.8 -5.6 -5.6)">
                        <svg:circle cx="14" cy="15" r="3.5" />
                        <svg:circle cx="30" cy="15" r="3.5" stroke-dasharray="2 2" />
                        <svg:circle cx="22" cy="30" r="3.5" />
                        <svg:path d="M17 17.5l3 9M27 17.5l-3 9" stroke-dasharray="2 2" />
                    </svg:g>
                }
                @case ("many-sided-relation") {
                    <svg:g transform="matrix(0.8 0 0 0.8 -5.6 -5.6)">
                        <svg:circle cx="12" cy="14" r="3.5" />
                        <svg:circle cx="32" cy="14" r="3.5" />
                        <svg:circle cx="22" cy="32" r="3.5" />
                        <svg:rect x="18.5" y="18.5" width="7" height="7" rx="1.5" />
                        <svg:path d="M15 15.5l3.6 3.4M29 15.5l-3.6 3.4M22 25.5v3" />
                    </svg:g>
                }
                @case ("guardrails-warning") {
                    <svg:g transform="matrix(0.8 0 0 0.8 -5.6 -5.6)">
                        <svg:path d="M22 11l11 20H11z" />
                        <svg:path d="M22 18v6" />
                        <svg:circle cx="22" cy="27.5" r="1" fill="currentColor" />
                    </svg:g>
                }
                @case ("mcp") {
                    <svg:g transform="matrix(1.09 0 0 1.09 -9.8 -9.8)">
                        <svg:path d="M14 20h12M20 14v12" />
                        <svg:circle cx="20" cy="20" r="8.5" />
                    </svg:g>
                }
                @case ("vector") {
                    <svg:g transform="matrix(1.09 0 0 1.09 -9.8 -9.8)">
                        <svg:path d="M11 28L28 11M28 11h-7M28 11v7" />
                        <svg:circle cx="13" cy="15" r="1.6" fill="currentColor" stroke="none" />
                        <svg:circle cx="24" cy="27" r="1.6" fill="currentColor" stroke="none" />
                        <svg:circle cx="17" cy="23" r="1.6" fill="currentColor" stroke="none" />
                    </svg:g>
                }
                @case ("embedded") {
                    <svg:g transform="matrix(1.09 0 0 1.09 -9.8 -9.8)">
                        <svg:rect x="11" y="11" width="18" height="18" rx="4" />
                        <svg:rect x="16" y="16" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
                    </svg:g>
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
