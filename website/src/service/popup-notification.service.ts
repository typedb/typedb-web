import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { SnackbarComponent, SnackbarData } from "src/framework/snackbar/snackbar.component";

@Injectable({
    providedIn: "root",
})
export class PopupNotificationService {
    constructor(private snackbar: MatSnackBar) {}

    success(message: string) {
        this.snackbar.openFromComponent<SnackbarComponent, SnackbarData>(SnackbarComponent, {
            data: { message },
            duration: 4000,
        });
    }

    error(message: string) {
        this.snackbar.openFromComponent<SnackbarComponent, SnackbarData>(SnackbarComponent, {
            data: { message },
            duration: 10000,
        });
    }
}
