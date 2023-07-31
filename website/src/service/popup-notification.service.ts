import { Injectable } from "@angular/core";
import {
    MatLegacySnackBar as MatSnackBar,
    MatLegacySnackBarConfig as MatSnackBarConfig,
} from "@angular/material/legacy-snack-bar";

@Injectable({
    providedIn: "root",
})
export class PopupNotificationService {
    constructor(private _snackbar: MatSnackBar) {}

    private open(message: string, config: MatSnackBarConfig<any> = {}) {
        return this._snackbar.open(message, "X", config);
    }

    success(message: string, config: MatSnackBarConfig<any> = { duration: 4000, panelClass: "sb-success" }) {
        // TODO: close duration is ignored for some reason
        this.open(message, config);
    }
}
