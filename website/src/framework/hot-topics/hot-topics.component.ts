import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewChild } from "@angular/core";
import { ParagraphWithHighlights, ResourceLink } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";
import { LinkDirective } from "../link/link.directive";
import { ScrollPaneComponent } from "../scroll-pane/scroll-pane.component";
import { RichTextComponent } from "../text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../text/text-with-highlights.component";

@Component({
    selector: 'td-hot-topics',
    templateUrl: 'hot-topics.component.html',
    styleUrls: ['hot-topics.component.scss'],
    standalone: true,
    imports: [
        ScrollPaneComponent, HeadingWithHighlightsComponent, LinkDirective, RichTextComponent,
    ],
})
export class HotTopicsComponent {
    @Input() title!: ParagraphWithHighlights;
    @Input() resources!: ResourceLink[];
    @Input() appearance: "news" | "resources" = "news";
    cardWidth = 384;

    constructor(media: MediaQueryService) {
        media.isMobile$.subscribe(isMobile => {
            this.cardWidth = isMobile ? 304 : 384;
        });
    }

    @HostBinding('class')
    get clazz() {
        return `section section-margin ${this.appearance}`;
    }
}
