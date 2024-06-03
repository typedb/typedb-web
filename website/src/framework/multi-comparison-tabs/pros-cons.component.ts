import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ProCon } from "typedb-web-schema";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-pros-cons",
    templateUrl: "pros-cons.component.html",
    styleUrls: ["pros-cons.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RichTextComponent, MatIconModule],
})
export class ProsConsComponent {
    @Input() prosAndCons!: ProCon[];
}
