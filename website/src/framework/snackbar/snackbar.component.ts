import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";

export interface SnackbarData {
    message: string;
}

@Component({
    selector: "td-snackbar",
    templateUrl: "snackbar.component.html",
    styleUrls: ["./snackbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
    message: string;

    constructor(
        private matSnackBarRef: MatSnackBarRef<SnackbarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) data: SnackbarData,
    ) {
        this.message = data.message;
    }

    close(): void {
        this.matSnackBarRef.dismiss();
    }
}
