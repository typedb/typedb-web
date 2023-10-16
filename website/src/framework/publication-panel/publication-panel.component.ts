import { Component, Input } from "@angular/core";

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
    host: { class: "section card-appearance" },
})
export class PublicationPanelComponent {
    @Input() items!: PublicationPanelItem[];

    isContentRow(item: PublicationPanelItem): item is PublicationContentRow {
        return item instanceof PublicationContentRow;
    }

    isPortableText(item: PublicationContentRowItem): item is PortableText {
        return "slice" in item;
    }

    isIllustration(item: PublicationContentRowItem): item is Illustration {
        return item && !this.isPortableText(item);
    }
}
