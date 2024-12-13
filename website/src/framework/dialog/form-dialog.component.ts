import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ParagraphWithHighlights } from "typedb-web-schema";
import { ParagraphWithHighlightsComponent } from "../text/text-with-highlights.component";
import { DialogCloseButtonComponent } from "./close-button/dialog-close-button.component";

@Component({
    selector: "td-form-dialog",
    templateUrl: "form-dialog.component.html",
    styleUrls: ["./form-dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatDialogTitle, DialogCloseButtonComponent, MatDialogContent, ParagraphWithHighlightsComponent,
        MatProgressBarModule
    ],
})
export class FormDialogComponent {
    @Input() isSubmitting: boolean | null = null;
    @Input() titleProp!: string;
    @Input() description: ParagraphWithHighlights | null = null;
    @Input() variant?: "contact" = undefined;

    @HostBinding("class") get clazz() {
        return this.variant ? "di-contact" : undefined;
    }
}
