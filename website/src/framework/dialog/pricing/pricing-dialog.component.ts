import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { first } from "rxjs";
import { MediaQueryService } from "../../../service/media-query.service";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { DialogCloseButtonComponent } from "../close-button/dialog-close-button.component";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgClass } from "@angular/common";

type ProviderID = "gcp" | "aws" | "azure";

@Pipe({
    name: "provider",
    standalone: true,
})
export class ProviderPipe implements PipeTransform {
    transform(value: ProviderID) {
        switch (value) {
            case "azure": return "Azure";
            case "aws": return "AWS";
            case "gcp": return "GCP";
        }
    }
}

@Component({
    selector: "td-pricing-dialog",
    templateUrl: "./pricing-dialog.component.html",
    styleUrls: ["./pricing-dialog.component.scss"],
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, DialogCloseButtonComponent, ProviderPipe, MatSelectModule, FormsModule, SpinnerComponent, MatTooltipModule, NgClass],
})
export class PricingDialogComponent implements OnInit {
    providerId: ProviderID = "gcp";
    providerIds: ProviderID[] = ["gcp", "aws", "azure"];
    loading = true;

    constructor(public dialogRef: MatDialogRef<PricingDialogComponent>, private mediaQuery: MediaQueryService) {}

    ngOnInit() {
        setTimeout(() => {
            this.loading = false;
        }, 250 + Math.random() * 100);
    }

    providerCardClasses(value: ProviderID): { [clazz: string]: boolean } {
        return {
            "card-selected": this.providerId === value,
            [`provider-card-${value}`]: true,
        };
    }

    providerImageUrl(provider: ProviderID): string {
        return `/assets/logo/${provider}.svg`;
    }

    updateProviderId(value: ProviderID) {
        this.providerId = value;
        this.mediaQuery.isMobile$.pipe(first()).subscribe((isMobile) => {
            if (isMobile) {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 250 + Math.random() * 100);
            }
        });
    }
}
