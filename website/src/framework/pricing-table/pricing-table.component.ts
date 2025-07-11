import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { PricingPanel } from "typedb-web-schema";
import { ButtonComponent } from "../button/button.component";
import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-pricing-table",
    templateUrl: "./pricing-table.component.html",
    styleUrls: ["./pricing-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RichTextComponent, ButtonComponent, LinkDirective]
})
export class PricingTableComponent {
    @Input() caption?: string;
    @Input() panels!: PricingPanel[];
    @Input({ required: true }) sectionId!: string;
    @HostBinding("class") clazz = "section";

    linkId(panel: PricingPanel): string {
        return sanitiseHtmlID(`${this.sectionId}_${panel.title}_${panel.button.text}`);
    }
}
