import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Brochure } from "typedb-web-schema";
import { ButtonComponent } from "../button/button.component";

import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-brochures",
    templateUrl: "brochures.component.html",
    styleUrls: ["brochures.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RichTextComponent, LinkDirective, ButtonComponent, MatIconModule],
})
export class BrochuresComponent {
    @Input() brochures!: Brochure[];
    @HostBinding("class") clazz = "section";
}
