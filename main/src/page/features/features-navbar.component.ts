
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import { Link } from "typedb-web-schema";

import { LinkDirective } from "../../framework/link/link.directive";
import { ScrollPaneComponent } from "../../framework/scroll-pane/scroll-pane.component";
import { SmoothScrollDirective } from "../../framework/smooth-scroll/smooth-scroll.directive";

@Component({
    selector: "td-features-navbar, [td-features-navbar]",
    templateUrl: "./features-navbar.component.html",
    styleUrls: ["./features-navbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ScrollPaneComponent, LinkDirective, SmoothScrollDirective]
})
export class FeaturesNavbarComponent {
    @Input({ required: true }) items!: FeaturesNavbarItem[];
    @HostBinding("class") clazz = "section";
}

export type FeaturesNavbarItem = { text: string; slug?: string; href: string };
