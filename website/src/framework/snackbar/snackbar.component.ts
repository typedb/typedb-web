import { ChangeDetectionStrategy, Component, HostBinding, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";

export interface SnackbarData {
    message: string;
    level?: "ok" | "error";
}

@Component({
    selector: "td-snackbar",
    templateUrl: "snackbar.component.html",
    styleUrls: ["./snackbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatIconModule, MatButtonModule],
})
export class SnackbarComponent {
    readonly message: string;
    @HostBinding("class") readonly level: "ok" | "error";

    constructor(
        private matSnackBarRef: MatSnackBarRef<SnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) data: SnackbarData,
    ) {
        this.message = data.message;
        this.level = data.level || "ok";
    }

    close(): void {
        this.matSnackBarRef.dismiss();
    }
}
