import { ComponentType } from "@angular/cdk/portal";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { ContactDialogComponent } from "../framework/dialog/contact/contact-dialog.component";
import { FeedbackDialogComponent } from "../framework/dialog/feedback/feedback-dialog.component";
import { NewsletterDialogComponent } from "../framework/dialog/newsletter/newsletter-dialog.component";
import { PricingDialogComponent } from "../framework/dialog/pricing/pricing-dialog.component";

type DialogType = "newsletter" | "feedback" | "contact" | "pricing";

@Injectable({
    providedIn: "root",
})
export class DialogService {
    current?: MatDialogRef<unknown>;
    private readonly router = inject(Router);
    private readonly dialog = inject(MatDialog);
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);
    private hashListenerInitialised = false;

    initHashListener() {
        if (this.hashListenerInitialised || !isPlatformBrowser(this.platformId)) return;
        this.hashListenerInitialised = true;

        this.checkAndOpenDialogFromHash();

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.checkAndOpenDialogFromHash();
        });
    }

    private checkAndOpenDialogFromHash() {
        const hash = this.document.location?.hash?.slice(1) as DialogType | undefined;
        if (!hash) return;

        const dialogOpeners: Record<DialogType, () => void> = {
            newsletter: () => this.openNewsletterDialog(),
            feedback: () => this.openFeedbackDialog(),
            contact: () => this.openContactDialog(),
            pricing: () => this.openPricingDialog(),
        };

        const opener = dialogOpeners[hash];
        if (opener) {
            opener();
            this.clearHash();
        }
    }

    private clearHash() {
        const location = this.document.location;
        if (location) {
            history.replaceState(null, "", location.pathname + location.search);
        }
    }

    private open<T>(component: ComponentType<T>, config?: MatDialogConfig<unknown> | undefined) {
        this.closeCurrent();
        this.current = this.dialog.open(component, config);
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
