import { Injectable } from "@angular/core";
import { Observable, map, shareReplay } from "rxjs";
import { FormID, formsSchemaName, SanityHubspotForms } from "typedb-web-schema";
import { ContentService } from "./content.service";
import { HUBSPOT_PORTAL_ID, HUBSPOT_REGION } from "./analytics.service";
import { isScullyRunning } from "@scullyio/ng-lib";

@Injectable({
    providedIn: "root",
})
export class FormService {
    private readonly forms: Observable<SanityHubspotForms>;

    constructor(contentService: ContentService) {
        this.forms = contentService.data.pipe(
            map((data) => data.getDocumentByID(formsSchemaName) as SanityHubspotForms),
            shareReplay(1),
        );
    }

    loadHubspotFormsScriptTag() {
        if (isScullyRunning()) return;

        const scriptEl = document.createElement("script");
        scriptEl.src = "//js.hsforms.net/forms/embed/v2.js";
        document.head.appendChild(scriptEl);
    }

    embedHubspotForm(
        form: FormID | string,
        placeholderElementID: string,
        onSubmit?: (formEl: HTMLFormElement) => void,
        onSuccess?: (formEl: HTMLFormElement) => void,
    ) {
        this.forms.subscribe((data) => {
            const hubspotFormID = data[form as FormID] || form;
            window.hbspt.forms.create({
                region: HUBSPOT_REGION,
                portalId: HUBSPOT_PORTAL_ID,
                formId: hubspotFormID,
                target: `#${placeholderElementID}`,
                onBeforeFormSubmit: onSubmit,
                onFormSubmitted: onSuccess,
            });
        });
    }
}
