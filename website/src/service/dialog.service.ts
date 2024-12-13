import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ContactDialogComponent } from "../framework/dialog/contact/contact-dialog.component";
import { FeedbackDialogComponent } from "../framework/dialog/feedback/feedback-dialog.component";
import { NewsletterDialogComponent } from "../framework/dialog/newsletter/newsletter-dialog.component";
import { PricingDialogComponent } from "../framework/dialog/pricing/pricing-dialog.component";

@Injectable({
    providedIn: "root",
})
export class DialogService {
    current?: MatDialogRef<unknown>;

    constructor(
        private _router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
    ) {
        this._router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                const searchParams = new URLSearchParams(window.location.search);
                const dialogParam = searchParams.get("dialog");
                switch (dialogParam) {
                    case "contact":
                        this.openContactDialog();
                        break;
                    case "newsletter":
                        this.openNewsletterDialog();
                        break;
                    case "feedback":
                        this.openFeedbackDialog();
                        break;
                    case "pricing":
                        this.openPricingDialog();
                        break;
                    default:
                        this.closeCurrent();
                }
            }
        });
    }

    open<T>(component: ComponentType<T>, config?: MatDialogConfig<unknown> | undefined) {
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

    openNewsletterDialog() {
        this.open(NewsletterDialogComponent, { width: "560px", maxWidth: "100vw", autoFocus: "input" });
    }

    openFeedbackDialog() {
        this.open(FeedbackDialogComponent, { width: "560px", maxWidth: "100vw", autoFocus: "input" });
    }

    openContactDialog() {
        this.open(ContactDialogComponent, {
            width: "1088px", maxWidth: "100vw", maxHeight: "100vh", autoFocus: "input",
        });
    }

    openPricingDialog() {
        this.open(PricingDialogComponent, { width: "880px", maxWidth: "100vw", maxHeight: "100vh" });
    }
}
