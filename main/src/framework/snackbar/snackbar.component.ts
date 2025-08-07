import { ChangeDetectionStrategy, Component, HostBinding, inject } from "@angular/core";
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
    imports: [MatIconModule, MatButtonModule]
})
export class SnackbarComponent {
    private readonly data = inject<SnackbarData>(MAT_SNACK_BAR_DATA);
    readonly message = this.data.message;
    @HostBinding("class") readonly level: "ok" | "error" = this.data.level || "ok";

    constructor(private matSnackBarRef: MatSnackBarRef<SnackbarComponent>) {}

    close(): void {
        this.matSnackBarRef.dismiss();
    }
}
