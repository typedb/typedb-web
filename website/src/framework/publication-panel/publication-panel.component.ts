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
    host: { class: "section card-appearance" },
})
export class PublicationPanelComponent {
    @Input() items!: PublicationPanelItem[];

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
