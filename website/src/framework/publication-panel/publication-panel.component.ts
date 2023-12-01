import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import {
    Illustration,
    PortableText,
    PublicationContentRow,
    PublicationContentRowItem,
    PublicationPanelItem,
} from "typedb-web-schema";

@Component({
    selector: "td-publication-panel",
    templateUrl: "./publication-panel.component.html",
    styleUrls: ["./publication-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicationPanelComponent {
    @Input() items!: PublicationPanelItem[];

    @HostBinding("class.section") useSectionClass = true;
    @HostBinding("class.card-appearance") useCardAppearanceClass = true;

    isContentRow(item: PublicationPanelItem): item is PublicationContentRow {
        return item instanceof PublicationContentRow;
    }

    isPortableText(item: PublicationContentRowItem): item is PortableText {
        return item && "slice" in item;
    }

    isIllustration(item: PublicationContentRowItem): item is Illustration {
        return item && !this.isPortableText(item);
    }
}
