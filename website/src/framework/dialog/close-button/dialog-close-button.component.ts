import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogClose } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "td-dialog-close-button",
    templateUrl: "./dialog-close-button.component.html",
    styleUrls: ["./dialog-close-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButtonModule, MatDialogClose, MatIconModule],
})
export class DialogCloseButtonComponent {}
