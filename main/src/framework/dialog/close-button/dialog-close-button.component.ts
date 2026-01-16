import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogClose } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "td-dialog-close-button",
    templateUrl: "./dialog-close-button.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [MatButtonModule, MatDialogClose, MatIconModule]
})
export class DialogCloseButtonComponent {}
