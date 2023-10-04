import { AfterViewInit, Component, HostBinding } from "@angular/core";

import { FormService } from "src/service/form.service";
import { PopupNotificationService } from "src/service/popup-notification.service";

@Component({
    selector: "td-contact-panel",
    templateUrl: "contact-panel.component.html",
    styleUrls: ["contact-panel.component.scss"],
})
export class ContactPanelComponent implements AfterViewInit {
    @HostBinding("class") readonly className = "section card";

    readonly formHolderId = "hubspot-form-holder-contact-section";
    isSubmitting = false;

    constructor(
        private formService: FormService,
        private popupNotificationService: PopupNotificationService,
    ) {}

    ngAfterViewInit(): void {
        this.formService.embedHubspotForm("contact", this.formHolderId, {
            onLoadingChange: (val) => {
                this.isSubmitting = val;
            },
            onSuccess: () => this.popupNotificationService.success("Your message has been sent!"),
        });
    }
}
