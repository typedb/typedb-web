import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { sanitiseHtmlID } from "typedb-web-common/lib";

import { FeatureGrid, Illustration, PortableText, PublicationContentRow, PublicationContentRowItem, PublicationPanelItem } from "typedb-web-schema";

import { FeatureGridComponent } from "../feature-grid/feature-grid.component";
import { IllustrationComponent } from "../illustration/illustration.component";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-publication-panel",
    templateUrl: "./publication-panel.component.html",
    styleUrls: ["./publication-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, FeatureGridComponent, RichTextComponent, IllustrationComponent]
})
export class PublicationPanelComponent {
    @Input() items!: PublicationPanelItem[];

    @HostBinding("class.section") useSectionClass = true;
    @HostBinding("class.card-appearance") useCardAppearanceClass = true;

    isContentRow(item: PublicationPanelItem): item is PublicationContentRow {
        return item instanceof PublicationContentRow;
    }

    isFeatureGrid(item: PublicationPanelItem): item is FeatureGrid {
        return item instanceof FeatureGrid;
    }

    isPortableText(item: PublicationContentRowItem): item is PortableText {
        return item && "slice" in item;
    }

    isIllustration(item: PublicationContentRowItem): item is Illustration {
        return item && !this.isPortableText(item);
    }

    featureGridId(item: FeatureGrid): string {
        return sanitiseHtmlID(item.name);
    }
}
