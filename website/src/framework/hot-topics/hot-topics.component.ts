import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { ParagraphWithHighlights, ResourceLink } from "typedb-web-schema";
import { LinkDirective } from "../link/link.directive";
import { ScrollShadowComponent } from "../scroll-shadow/scroll-shadow.component";
import { RichTextComponent } from "../text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../text/text-with-highlights.component";

@Component({
    selector: "td-hot-topics",
    templateUrl: "hot-topics.component.html",
    styleUrls: ["hot-topics.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ScrollShadowComponent, HeadingWithHighlightsComponent, LinkDirective, RichTextComponent,
    ],
})
export class HotTopicsComponent {
    @Input() title!: ParagraphWithHighlights;
    @Input() hotTopics!: ResourceLink[];

    @HostBinding("class") clazz = "section section-margin";
}
