import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { FormID, formsSchemaName, SanityHubspotForms } from "typedb-web-schema";
import { ContentService } from "./content.service";

declare global {
    interface Window {
        hbspt: any;
    }
}

const HUBSPOT_PORTAL_ID = "4332244";
const HUBSPOT_REGION = "na1";

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

    embedHubspotForm(form: FormID, placeholderElementID: string) {
        this.forms.subscribe((data) => {
            const hubspotFormID = data[form];
            window.hbspt.forms.create({
                region: HUBSPOT_REGION,
                portalId: HUBSPOT_PORTAL_ID,
                formId: hubspotFormID,
            });
            let retries = 0;
            const formElementPoller = setInterval(() => {
                const formEl = document.getElementById(`hsForm_${hubspotFormID}`);
                if (formEl) {
                    clearInterval(formElementPoller);
                    document.getElementById(placeholderElementID)!.appendChild(formEl);
                } else if (retries > 30) {
                    clearInterval(formElementPoller);
                    throw "Retry limit exceeded attempting to embed HubSpot form!";
                }
                retries++;
            }, 50);
        });
    }
}
