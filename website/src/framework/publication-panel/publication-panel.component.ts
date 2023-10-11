import { Component, HostBinding, Input } from "@angular/core";

import {
    Illustration,
    PublicationContentRow,
    PublicationContentRowItem,
    PublicationPanelItem,
    RichText,
} from "typedb-web-schema";

@Component({
    selector: "td-publication-panel",
    templateUrl: "./publication-panel.component.html",
    styleUrls: ["./publication-panel.component.scss"],
})
export class PublicationPanelComponent {
    @Input() items!: PublicationPanelItem[];

    @HostBinding("class.section") private hasSectionClass = true;
    @HostBinding("class.card-appearance") private hasCardAppearanceClass = true;

    isContentRow(item: PublicationPanelItem): item is PublicationContentRow {
        return item instanceof PublicationContentRow;
    }

    isRichText(item: PublicationContentRowItem): item is RichText {
        return item instanceof RichText;
    }

    isIllustration(item: PublicationContentRowItem): item is Illustration {
        return item && !this.isRichText(item);
    }
}
