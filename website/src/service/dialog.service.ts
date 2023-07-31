import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import {
    MatLegacyDialog as MatDialog,
    MatLegacyDialogConfig as MatDialogConfig,
    MatLegacyDialogRef as MatDialogRef,
} from "@angular/material/legacy-dialog";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import {
    CloudWaitlistDialogComponent,
    ContactDialogComponent,
    NewsletterDialogComponent,
} from "../framework/form/dialog.component";

@Injectable({
    providedIn: "root",
})
export class DialogService {
    current?: MatDialogRef<any>;

    constructor(private _router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
        this._router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                const searchParams = new URLSearchParams(window.location.search);
                const dialogParam = searchParams.get("dialog");
                switch (dialogParam) {
                    case "cloud-waitlist":
                        this.openCloudWaitlistFormDialog();
                        break;
                    case "contact":
                        this.openContactDialog();
                        break;
                    case "newsletter":
                        this.openNewsletterDialog();
                        break;
                    default:
                        this.closeCurrent();
                }
            }
        });
    }

    open<T>(component: ComponentType<T>, config?: MatDialogConfig<any> | undefined) {
        this.closeCurrent();
        const newDialog = this.dialog.open(component, config);
        newDialog.afterClosed().subscribe(() => {
            this._router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: { dialog: undefined },
                queryParamsHandling: "merge",
            });
        });
        this.current = newDialog;
    }

    closeCurrent() {
        this.current?.close();
        this.current = undefined;
    }

    openCloudWaitlistFormDialog() {
        this.open(CloudWaitlistDialogComponent, { width: "560px", maxWidth: "100vw", autoFocus: "input" });
    }

    openNewsletterDialog() {
        this.open(NewsletterDialogComponent, { width: "560px", maxWidth: "100vw", autoFocus: "input" });
    }

    openContactDialog() {
        this.open(ContactDialogComponent, { width: "1088px", height: "568px", maxWidth: "100vw", autoFocus: "input" });
    }
}
