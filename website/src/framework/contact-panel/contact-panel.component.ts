import { AsyncPipe } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { BehaviorSubject, Observable } from "rxjs";

import { FormService } from "src/service/form.service";
import { PopupNotificationService } from "src/service/popup-notification.service";

@Component({
    selector: "td-contact-panel",
    templateUrl: "contact-panel.component.html",
    styleUrls: ["contact-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatProgressBarModule, AsyncPipe],
})
export class ContactPanelComponent implements AfterViewInit {
    @HostBinding("class") readonly className = "section card";

    readonly formHolderId = "hubspot-form-holder-contact-section";
    readonly isSubmitting$: Observable<boolean>;
    private readonly isSubmittingSubject = new BehaviorSubject(false);

    constructor(
        private formService: FormService,
        private popupNotificationService: PopupNotificationService,
    ) {
        this.isSubmitting$ = this.isSubmittingSubject.asObservable();
    }

    ngAfterViewInit(): void {
        this.formService.embedHubspotForm("contact", this.formHolderId, {
            onLoadingChange: (val) => {
                this.isSubmittingSubject.next(val);
            },
            onSuccess: () => this.popupNotificationService.success("Your message has been sent!"),
        });
    }
}
