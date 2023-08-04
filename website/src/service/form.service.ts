import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { FormID, formsSchemaName, SanityHubspotForms } from "typedb-web-schema";
import { ContentService } from "./content.service";
import { HUBSPOT_PORTAL_ID, HUBSPOT_REGION } from "./analytics.service";

declare global {
    interface Window {
        hbspt: any;
    }
}

@Injectable({
    providedIn: "root",
})
export class FormService {
    forms = new ReplaySubject<SanityHubspotForms>();

    constructor(private _contentService: ContentService) {
        this._contentService.data.subscribe((data) => {
            this.forms.next(data.getDocumentByID(formsSchemaName) as SanityHubspotForms);
        });
    }

    embedHubspotForm(form: FormID | string, placeholderElementID: string, onSubmit?: (formEl: HTMLFormElement) => any) {
        this.forms.subscribe((data) => {
            const hubspotFormID = data[form] || form;
            window.hbspt.forms.create({
                region: HUBSPOT_REGION,
                portalId: HUBSPOT_PORTAL_ID,
                formId: hubspotFormID,
            });
            let retries = 0;
            const formElementPoller = setInterval(() => {
                const formEl = document.getElementById(`hsForm_${hubspotFormID}`) as HTMLFormElement | null;
                const formContainerEl = formEl?.parentElement;
                if (formEl && formContainerEl?.id.startsWith("hbspt-form")) {
                    clearInterval(formElementPoller);
                    const placeholderEl = document.getElementById(placeholderElementID)!;
                    placeholderEl.innerHTML = "";
                    placeholderEl.appendChild(formContainerEl);
                    if (onSubmit) {
                        this.attachOnSubmitAction(formEl, onSubmit);
                    }
                } else if (retries > 30) {
                    clearInterval(formElementPoller);
                    throw "Retry limit exceeded attempting to embed HubSpot form!";
                }
                retries++;
            }, 50);
        });
    }

    attachOnSubmitAction(formEl: HTMLFormElement, action: (formEl: HTMLFormElement) => any) {
        formEl.addEventListener("submit", () => {
            action(formEl);
        });
    }
}
