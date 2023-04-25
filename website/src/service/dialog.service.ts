import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { CloudWaitlistDialogComponent } from "../framework/dialog/name-email-dialog.component";

@Injectable({
    providedIn: "root",
})
export class DialogService {
    current?: MatDialogRef<any>;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                const searchParams = new URLSearchParams(window.location.search);
                const dialogParam = searchParams.get("dialog");
                switch (dialogParam) {
                    case "cloud-waitlist":
                        this.openCloudWaitlistFormDialog();
                        break;
                    default:
                        this.current?.close();
                }
            }
        });
    }

    open<T>(component: ComponentType<T>, config?: MatDialogConfig<any> | undefined) {
        this.current?.close();
        const newDialog = this.dialog.open(component, config);
        newDialog.afterClosed().subscribe(() => {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: { dialog: undefined },
                queryParamsHandling: "merge",
            });
        });
        this.current = newDialog;
    }

    openCloudWaitlistFormDialog() {
        this.open(CloudWaitlistDialogComponent, { width: "560px" });
    }
}
